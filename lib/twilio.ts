// Dynamic import to avoid issues if twilio package is not installed
let twilioModule: typeof import("twilio") | null = null

async function loadTwilio() {
  if (!twilioModule) {
    try {
      twilioModule = await import("twilio")
    } catch (e) {
      console.error("[Twilio] Failed to load twilio package:", e)
      return null
    }
  }
  return twilioModule
}

let twilioClient: any = null

export async function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    console.warn("[Twilio] TWILIO_ACCOUNT_SID ou TWILIO_AUTH_TOKEN non configuré")
    return null
  }

  if (!twilioClient) {
    const twilio = await loadTwilio()
    if (!twilio) return null
    twilioClient = twilio.default(accountSid, authToken)
  }

  return twilioClient
}

export function getTwilioPhoneNumber() {
  return process.env.TWILIO_PHONE_NUMBER
}

export function isTwilioConfigured() {
  return !!(
    process.env.TWILIO_ACCOUNT_SID && 
    process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_PHONE_NUMBER
  )
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

/**
 * Send an SMS via Twilio
 * @param to - Phone number to send to
 * @param message - Message content
 */
export async function sendSms(to: string, message: string): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> {
  const client = await getTwilioClient()
  const fromNumber = getTwilioPhoneNumber()

  if (!client) {
    return {
      success: false,
      error: "Twilio client non disponible. Vérifiez que le package twilio est installé et les variables d'environnement configurées.",
    }
  }

  if (!fromNumber) {
    return {
      success: false,
      error: "TWILIO_PHONE_NUMBER non configuré.",
    }
  }

  try {
    const formattedTo = formatPhoneForTwilio(to)
    console.log(`[Twilio] Envoi SMS de ${fromNumber} vers ${formattedTo}`)

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

    // Extract more useful error message from Twilio errors
    let errorMessage = error.message || "Erreur lors de l'envoi du SMS"
    if (error.code) {
      errorMessage = `Erreur Twilio ${error.code}: ${errorMessage}`
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
