export interface SmsTemplate {
  id: string
  name: string
  category: "reminder" | "disqualification" | "confirmation" | "followup" | "custom"
  message: string
  variables: string[]
}

export const SMS_TEMPLATES: SmsTemplate[] = [
  // RAPPEL DE FINALISATION
  {
    id: "reminder-finalization",
    name: "Rappel de finalisation",
    category: "reminder",
    message: `Bonjour {{leadName}}, votre demande d'evaluation immobiliere est en attente. Completez votre fiche en 2 min pour accelerer le processus: {{finalizationUrl}} - Valeur Maison Rapide`,
    variables: ["leadName", "finalizationUrl"],
  },
  {
    id: "reminder-urgent",
    name: "Rappel urgent (72h)",
    category: "reminder",
    message: `{{leadName}}, votre lien d'evaluation expire bientot! Finalisez maintenant pour recevoir votre estimation: {{finalizationUrl}} - VMR`,
    variables: ["leadName", "finalizationUrl"],
  },

  // CONFIRMATION
  {
    id: "confirmation-received",
    name: "Confirmation de reception",
    category: "confirmation",
    message: `Bonjour {{leadName}}, nous avons bien recu votre demande d'evaluation pour {{address}}. Notre equipe vous contactera sous 24-48h. - Valeur Maison Rapide`,
    variables: ["leadName", "address"],
  },
  {
    id: "confirmation-finalized",
    name: "Confirmation de finalisation",
    category: "confirmation",
    message: `Merci {{leadName}}! Votre fiche d'evaluation est complete. Un expert immobilier local analysera votre dossier et vous contactera rapidement. - VMR`,
    variables: ["leadName"],
  },

  // DISQUALIFICATION
  {
    id: "disqualify-standard",
    name: "Disqualification standard",
    category: "disqualification",
    message: `Bonjour {{leadName}}, merci pour votre demande. Malheureusement, votre propriete ne correspond pas a nos criteres actuels. N'hesitez pas a nous recontacter si votre situation change. - VMR`,
    variables: ["leadName"],
  },
  {
    id: "disqualify-referral",
    name: "Disqualification avec reference",
    category: "disqualification",
    message: `{{leadName}}, votre propriete est hors de notre zone de service. Nous vous recommandons de contacter un courtier local. Bonne chance dans vos demarches! - Valeur Maison Rapide`,
    variables: ["leadName"],
  },

  // SUIVI
  {
    id: "followup-broker-assigned",
    name: "Courtier assigne",
    category: "followup",
    message: `Bonne nouvelle {{leadName}}! Le courtier {{brokerName}} a ete assigne a votre dossier et vous contactera sous peu. - Valeur Maison Rapide`,
    variables: ["leadName", "brokerName"],
  },
  {
    id: "followup-evaluation-ready",
    name: "Evaluation prete",
    category: "followup",
    message: `{{leadName}}, votre evaluation comparative de marche est prete! Un courtier vous contactera pour vous presenter les resultats. - VMR`,
    variables: ["leadName"],
  },

  // PERSONNALISE
  {
    id: "custom",
    name: "Message personnalise",
    category: "custom",
    message: "",
    variables: ["leadName"],
  },
]

export function getSmsTemplateById(id: string): SmsTemplate | undefined {
  return SMS_TEMPLATES.find((t) => t.id === id)
}

export function getSmsTemplatesByCategory(category: SmsTemplate["category"]): SmsTemplate[] {
  return SMS_TEMPLATES.filter((t) => t.category === category)
}

export function replaceSmsVariables(
  template: string,
  variables: Record<string, string | undefined>
): string {
  let result = template

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g")
    result = result.replace(regex, value || "")
  }

  return result
}

// Character limit for SMS (standard is 160, but with unicode it can be less)
export const SMS_CHAR_LIMIT = 160
export const SMS_CHAR_LIMIT_UNICODE = 70

export function getSmsCharacterCount(message: string): {
  count: number
  segments: number
  isUnicode: boolean
} {
  // Check if message contains non-GSM characters (unicode)
  const gsmRegex = /^[@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-.\/0-9:;<=>?¡A-ZÄÖÑÜa-zäöñüà\r\n]*$/
  const isUnicode = !gsmRegex.test(message)

  const limit = isUnicode ? SMS_CHAR_LIMIT_UNICODE : SMS_CHAR_LIMIT
  const count = message.length
  const segments = Math.ceil(count / limit)

  return { count, segments, isUnicode }
}
