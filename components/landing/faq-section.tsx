"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Les leads sont-ils exclusifs ?",
    answer:
      "Oui, nous offrons des leads exclusifs. Contrairement aux grandes plateformes qui revendent les mêmes contacts à plusieurs entreprises, vos leads vous appartiennent.",
  },
  {
    question: "Quels secteurs acceptez-vous ?",
    answer:
      "Nous travaillons principalement avec les entreprises de services à forte valeur client : immobilier, juridique, construction, services financiers, santé privée, et autres services professionnels.",
  },
  {
    question: "Comment sont qualifiés les leads ?",
    answer:
      "Chaque lead passe par notre processus de qualification en plusieurs étapes : vérification des coordonnées, validation de l'intention, et matching avec des critères spécifiques avant livraison.",
  },
  {
    question: "Quel est l'engagement minimum ?",
    answer:
      "Nous proposons des engagements flexibles adaptés à votre situation. Contactez-nous pour discuter de vos besoins et découvrir l'option qui vous convient le mieux.",
  },
]

export function FaqSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Questions fréquentes</h2>
          <p className="text-muted-foreground">Tout ce que vous devez savoir avant de commencer.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
