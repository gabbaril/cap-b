import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

let twilioClient: twilio.Twilio | null = null

export function getTwilioClient() {
  if (!accountSid || !authToken) {
    console.warn("[Twilio] TWILIO_ACCOUNT_SID ou TWILIO_AUTH_TOKEN non configuré")
    return null
  }

  if (!twilioClient) {
    twilioClient = twilio(accountSid, authToken)
  }

  return twilioClient
}

export function getTwilioPhoneNumber() {
  return twilioPhoneNumber
}

export function isTwilioConfigured() {
  return !!(accountSid && authToken && twilioPhoneNumber)
}

/**
 * Format phone number to E.164 format for Twilio
 * Handles Canadian/US phone numbers
 */
export function formatPhoneForTwilio(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "")

  // If it starts with 1 (North America), add +
  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+${cleaned}`
  }

  // If it's 10 digits (North American without country code), add +1
  if (cleaned.length === 10) {
    return `+1${cleaned}`
  }

  // Otherwise, assume it already has country code
  return `+${cleaned}`
}

interface SendSmsOptions {
  to: string
  message: string
}

export async function sendSms({ to, message }: SendSmsOptions): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> {
  const client = getTwilioClient()
  const fromNumber = getTwilioPhoneNumber()

  if (!client || !fromNumber) {
    return {
      success: false,
      error: "Twilio n'est pas configuré. Vérifiez les variables d'environnement.",
    }
  }

  try {
    const formattedTo = formatPhoneForTwilio(to)

    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formattedTo,
    })

    console.log(`[Twilio] SMS envoyé avec succès: ${result.sid}`)

    return {
      success: true,
      messageId: result.sid,
    }
  } catch (error: any) {
    console.error("[Twilio] Erreur envoi SMS:", error)

    return {
      success: false,
      error: error.message || "Erreur lors de l'envoi du SMS",
    }
  }
}
