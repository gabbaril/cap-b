import { NextResponse } from "next/server"
import { sendSms, isTwilioConfigured } from "@/lib/twilio"
import { getSmsTemplateById, replaceSmsVariables } from "@/lib/sms-templates"
import { getSupabaseAdmin } from "@/lib/supabase-server"

export async function POST(request: Request) {
  try {
    // Check if Twilio is configured
    if (!isTwilioConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Twilio n'est pas configuré" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      leadId,
      leadPhone,
      leadName,
      templateId,
      customMessage,
      variables = {},
    } = body

    if (!leadPhone) {
      return NextResponse.json(
        { ok: false, error: "Numero de telephone manquant" },
        { status: 400 }
      )
    }

    let message: string

    if (templateId === "custom" || customMessage) {
      // Use custom message
      message = customMessage || ""
    } else if (templateId) {
      // Use template
      const template = getSmsTemplateById(templateId)
      if (!template) {
        return NextResponse.json(
          { ok: false, error: "Template non trouve" },
          { status: 400 }
        )
      }

      // Replace variables in template
      message = replaceSmsVariables(template.message, {
        leadName: leadName || "",
        ...variables,
      })
    } else {
      return NextResponse.json(
        { ok: false, error: "Message ou template requis" },
        { status: 400 }
      )
    }

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { ok: false, error: "Le message ne peut pas etre vide" },
        { status: 400 }
      )
    }

    // Send SMS
    const result = await sendSms({
      to: leadPhone,
      message: message,
    })

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 }
      )
    }

    // Log SMS in database if leadId is provided
    if (leadId) {
      try {
        const supabase = getSupabaseAdmin()
        await supabase.from("lead_notes").insert({
          lead_id: leadId,
          note: `SMS envoye: "${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"`,
          created_by: "admin",
        })
      } catch (logError) {
        console.error("[SMS] Erreur log dans la base:", logError)
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json({
      ok: true,
      messageId: result.messageId,
    })
  } catch (err: any) {
    console.error("[SMS] Exception:", err)
    return NextResponse.json(
      { ok: false, error: `Exception: ${err.message}` },
      { status: 500 }
    )
  }
}

// GET endpoint to check Twilio configuration status
export async function GET() {
  return NextResponse.json({
    configured: isTwilioConfigured(),
  })
}
