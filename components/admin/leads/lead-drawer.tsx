"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Home, Calendar, Building2, Ruler, Wrench, Sparkles, Target, FileClock, DollarSign, MessageSquare } from "lucide-react"
import { useState } from "react"

interface Broker {
  id: string
  full_name: string
  is_active: boolean
}

interface Lead {
  id: string
  lead_number: string
  full_name: string
  email: string
  phone: string
  address: string
  city: string | null
  property_type: string
  intention?: string
  status: string
  assigned_to: string | null
  created_at: string
  is_finalized?: boolean
  sale_reason?: string
  potential_sale_desire?: string
  ideal_sale_deadline?: string
  approximate_market_value?: string
  bedrooms_count?: number
  bathrooms_count?: number
  basement_info?: string
  floors_count?: number
  construction_year?: number
  approximate_area?: string
  garage?: string
  recent_renovations?: string
  property_highlights?: string
}

interface LeadDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  brokers: Broker[]
  handleAssignLead: (leadId: string, brokerId: string | null) => void
  onDisqualify: (lead: Lead) => void
  onOpenEcm: (lead: Lead) => void
  onOpenSms?: (lead: Lead) => void
  getStatusColor: (status: string) => string
  onDelete: (lead: Lead) => void
}

export function LeadDrawer({
  open,
  onOpenChange,
  lead,
  brokers,
  handleAssignLead,
  onDisqualify,
  onOpenEcm,
  onOpenSms,
  getStatusColor,
  onDelete,
}: LeadDrawerProps) {
  const [selectedBroker, setSelectedBroker] = useState<string | "none">("")
  const [activeTab, setActiveTab] = useState("resume")

  if (!lead) return null

  const assignedBroker = brokers.find((b) => b.id === lead.assigned_to)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto px-3">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-xl">Détails du Lead</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="resume" className="data-[state=active]:bg-white">
              Résumé
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-white">
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="pb-4 border-b">
                <h3 className="text-xl font-bold text-gray-900">{lead.full_name}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">#{lead.lead_number}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${getStatusColor(lead.status)} px-3 py-1`}>{lead.status}</Badge>
                {lead.is_finalized && (
                  <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50 px-3 py-1">
                    Finalisé
                  </Badge>
                )}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-gray-900">{lead.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Téléphone</p>
                    <p className="text-sm font-medium text-gray-900">{lead.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <MapPin className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Adresse</p>
                    <p className="text-sm font-medium text-gray-900">{lead.address}</p>
                    {lead.city && <p className="text-xs text-gray-500 mt-0.5">{lead.city}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <Home className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Type de propriété</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{lead.property_type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <Target className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Intention</p>
                    <p className="text-sm font-medium text-gray-900">{lead.intention ? lead.intention : "Non spécifiée"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Date de création</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(lead.created_at).toLocaleDateString("fr-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {(lead.sale_reason || lead.potential_sale_desire || lead.ideal_sale_deadline || lead.approximate_market_value) && (
                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-semibold text-gray-900 text-sm">Projet de vente</h4>

                  {lead.sale_reason && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Target className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Raison de vente</p>
                        <p className="text-sm font-medium text-gray-900">{lead.sale_reason}</p>
                      </div>
                    </div>
                  )}

                  {lead.potential_sale_desire && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Target className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Désir de vente</p>
                        <p className="text-sm font-medium text-gray-900">{lead.potential_sale_desire}</p>
                      </div>
                    </div>
                  )}

                  {lead.ideal_sale_deadline && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <FileClock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Délai idéal</p>
                        <p className="text-sm font-medium text-gray-900">{lead.ideal_sale_deadline}</p>
                      </div>
                    </div>
                  )}

                  {lead.approximate_market_value && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Valeur approximative</p>
                        <p className="text-sm font-medium text-gray-900">{lead.approximate_market_value}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {lead.is_finalized && (
                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-semibold text-gray-900 text-sm">Informations sur la propriété</h4>

                  {lead.bedrooms_count && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Home className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Chambres</p>
                        <p className="text-sm font-medium text-gray-900">{lead.bedrooms_count}</p>
                      </div>
                    </div>
                  )}

                  {lead.bathrooms_count && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Home className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Salles de bain</p>
                        <p className="text-sm font-medium text-gray-900">{lead.bathrooms_count}</p>
                      </div>
                    </div>
                  )}

                  {lead.floors_count && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Building2 className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Nombre d'étages</p>
                        <p className="text-sm font-medium text-gray-900">{lead.floors_count}</p>
                      </div>
                    </div>
                  )}

                  {lead.basement_info && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Home className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Sous-sol</p>
                        <p className="text-sm font-medium text-gray-900">{lead.basement_info}</p>
                      </div>
                    </div>
                  )}

                  {lead.construction_year && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Building2 className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Année de construction</p>
                        <p className="text-sm font-medium text-gray-900">{lead.construction_year}</p>
                      </div>
                    </div>
                  )}

                  {lead.approximate_area && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Ruler className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Superficie approximative</p>
                        <p className="text-sm font-medium text-gray-900">{lead.approximate_area}</p>
                      </div>
                    </div>
                  )}

                  {lead.garage && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Home className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Garage</p>
                        <p className="text-sm font-medium text-gray-900">{lead.garage}</p>
                      </div>
                    </div>
                  )}

                  {lead.recent_renovations && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Wrench className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Rénovations récentes</p>
                        <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          {lead.recent_renovations}
                        </p>
                      </div>
                    </div>
                  )}

                  {lead.property_highlights && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 bg-gray-100 rounded-lg">
                        <Sparkles className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-0.5">Atouts de la propriété</p>
                        <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          {lead.property_highlights}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {assignedBroker && (
                <div className="pt-4 border-t mt-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">ASSIGNÉ À</p>
                    <p className="text-sm font-semibold text-blue-900">{assignedBroker.full_name}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold text-blue-900 mb-1">Évaluation comparative (ECM)</h4>
                <p className="text-sm text-blue-600 mb-4">Créer une évaluation comparative de marché pour ce lead</p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    onOpenEcm(lead)
                    onOpenChange(false)
                  }}
                >
                  Ouvrir l'ECM
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-1">Assigner le lead</h4>
                <p className="text-sm text-gray-500 mb-4">Choisir un courtier pour ce lead</p>
                <div className="flex flex-col gap-3">
                  <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un courtier..." />
                    </SelectTrigger>

                    <SelectContent>
                      {/* Unassign option */}
                      <SelectItem value="none">
                        Aucun (désassigner)
                      </SelectItem>

                      {brokers
                        .filter((b) => b.is_active)
                        .map((broker) => (
                          <SelectItem key={broker.id} value={broker.id}>
                            {broker.full_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full bg-[#E30613] hover:bg-[#C00510]"
                    onClick={() => {
                      if (!selectedBroker) return

                      handleAssignLead(
                        lead.id,
                        selectedBroker === "none" ? null : selectedBroker
                      )

                      setSelectedBroker("")
                      onOpenChange(false)
                    }}
                    disabled={!selectedBroker}
                  >
                    {selectedBroker === "none" ? "Désassigner ce lead" : "Assigner ce lead"}
                  </Button>
                </div>
              </div>

              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h4 className="font-semibold text-purple-900 mb-1">Envoyer un courriel</h4>
                <p className="text-sm text-purple-600 mb-4">Envoyer un email à partir des différents gabarits</p>
                <Button
                  variant="outline"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800 bg-transparent"
                  onClick={() => {
                    onDisqualify(lead)
                    onOpenChange(false)
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Sélectionner et envoyer l'email
                </Button>
              </div>

              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-semibold text-green-900 mb-1">Envoyer un SMS</h4>
                <p className="text-sm text-green-600 mb-4">Envoyer un SMS à partir des différents gabarits</p>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800 bg-transparent"
                  onClick={() => {
                    if (onOpenSms) {
                      onOpenSms(lead)
                      onOpenChange(false)
                    }
                  }}
                  disabled={!onOpenSms}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Sélectionner et envoyer le SMS
                </Button>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-semibold text-red-900 mb-1">
                  Supprimer le lead
                </h4>
                <p className="text-sm text-red-700 mb-4">
                  Cette action est irréversible.
                </p>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    onDelete(lead)
                    onOpenChange(false)
                  }}
                >
                  Supprimer définitivement
                </Button>
              </div>

            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
