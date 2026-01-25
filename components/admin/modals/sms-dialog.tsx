"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useMemo } from "react"
import {
  SMS_TEMPLATES,
  getSmsTemplateById,
  replaceSmsVariables,
  getSmsCharacterCount,
  type SmsTemplate,
} from "@/lib/sms-templates"
import { MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react"

interface Lead {
  id: string
  full_name: string
  phone: string
  address?: string
  broker_name?: string
}

interface SmsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  leadToken?: string | null
  onSuccess?: () => void
}

export function SmsDialog({
  open,
  onOpenChange,
  lead,
  leadToken,
  onSuccess,
}: SmsDialogProps) {
  const selectedLead = lead
  const brokerName = lead?.broker_name || null
  const onSmsSent = onSuccess
  const [selectedTemplate, setSelectedTemplate] = useState<string>("reminder-finalization")
  const [customMessage, setCustomMessage] = useState<string>("")
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null)

  const finalizationUrl = leadToken
    ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://valeurmaisonrapide.com"}/finaliser?token=${leadToken}`
    : undefined

  // Get the template
  const template = useMemo(() => getSmsTemplateById(selectedTemplate), [selectedTemplate])

  // Generate the preview message
  const previewMessage = useMemo(() => {
    if (selectedTemplate === "custom") {
      return customMessage
    }

    if (!template) return ""

    return replaceSmsVariables(template.message, {
      leadName: selectedLead?.full_name || "",
      address: selectedLead?.address || "",
      finalizationUrl: finalizationUrl,
      brokerName: brokerName || "",
    })
  }, [template, selectedTemplate, customMessage, selectedLead, finalizationUrl, brokerName])

  // Character count
  const charInfo = useMemo(() => getSmsCharacterCount(previewMessage), [previewMessage])

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSendResult(null)
      setSelectedTemplate("reminder-finalization")
      setCustomMessage("")
    }
  }, [open])

  // Update custom message when switching to custom template
  useEffect(() => {
    if (selectedTemplate === "custom" && customMessage === "" && template) {
      // Pre-fill with the last template's message
    }
  }, [selectedTemplate])

  const handleSend = async () => {
    if (!selectedLead?.phone) return

    setIsSending(true)
    setSendResult(null)

    try {
      const response = await fetch("/api/admin/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          leadPhone: selectedLead.phone,
          leadName: selectedLead.full_name,
          templateId: selectedTemplate,
          customMessage: selectedTemplate === "custom" ? customMessage : previewMessage,
          variables: {
            address: selectedLead.address,
            finalizationUrl,
            brokerName,
          },
        }),
      })

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const text = await response.text()
        console.error("[v0] SMS API error:", response.status, text)
        setSendResult({ 
          success: false, 
          message: `Erreur serveur (${response.status}): ${text.substring(0, 100)}` 
        })
        return
      }

      const data = await response.json()

      if (data.ok) {
        setSendResult({ success: true, message: "SMS envoye avec succes!" })
        onSmsSent?.()
        // Close dialog after 2 seconds on success
        setTimeout(() => {
          onOpenChange(false)
        }, 2000)
      } else {
        setSendResult({ success: false, message: data.error || "Erreur lors de l'envoi" })
      }
    } catch (error: any) {
      console.error("[v0] SMS send error:", error)
      setSendResult({ success: false, message: error.message || "Erreur de connexion" })
    } finally {
      setIsSending(false)
    }
  }

  // Group templates by category
  const groupedTemplates = useMemo(() => {
    const groups: Record<string, SmsTemplate[]> = {
      reminder: [],
      confirmation: [],
      disqualification: [],
      followup: [],
      custom: [],
    }

    SMS_TEMPLATES.forEach((t) => {
      groups[t.category].push(t)
    })

    return groups
  }, [])

  const categoryLabels: Record<string, string> = {
    reminder: "Rappels",
    confirmation: "Confirmations",
    disqualification: "Disqualifications",
    followup: "Suivis",
    custom: "Personnalise",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Envoyer un SMS
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Destinataire</p>
            <p className="font-semibold">{selectedLead?.full_name}</p>
            <p className="text-sm text-gray-500">{selectedLead?.phone}</p>
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Modele de SMS</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(groupedTemplates).map(([category, templates]) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50">
                      {categoryLabels[category]}
                    </div>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Message Input */}
          {selectedTemplate === "custom" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Message personnalise</label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="min-h-[120px]"
              />
              <p className="text-xs text-gray-500">
                Variables disponibles: {"{{leadName}}"}, {"{{address}}"}, {"{{finalizationUrl}}"}, {"{{brokerName}}"}
              </p>
            </div>
          )}

          {/* Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Apercu du SMS</label>
              <div className="flex items-center gap-2">
                <Badge variant={charInfo.segments > 1 ? "secondary" : "outline"}>
                  {charInfo.count} caracteres
                </Badge>
                <Badge variant={charInfo.segments > 1 ? "secondary" : "outline"}>
                  {charInfo.segments} SMS
                </Badge>
                {charInfo.isUnicode && (
                  <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">
                    Unicode
                  </Badge>
                )}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-lg p-4 font-mono text-sm whitespace-pre-wrap min-h-[100px]">
              {previewMessage || <span className="text-gray-500">Aucun message</span>}
            </div>

            {charInfo.segments > 3 && (
              <div className="flex items-center gap-2 text-yellow-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Message long ({charInfo.segments} SMS). Considerez le raccourcir.</span>
              </div>
            )}

            {!finalizationUrl && selectedTemplate.includes("reminder") && (
              <div className="flex items-center gap-2 text-yellow-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Aucun token de finalisation disponible pour ce lead.</span>
              </div>
            )}
          </div>

          {/* Result Message */}
          {sendResult && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                sendResult.success
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {sendResult.success ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertTriangle className="h-5 w-5" />
              )}
              <span>{sendResult.message}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSending}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSending || !previewMessage.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSending ? "Envoi en cours..." : "Envoyer le SMS"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
