import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    title: "Leads exclusifs",
    description: "Pas de leads brûlés. Pas de revente massive. Un vrai avantage concurrentiel sur votre marché.",
  },
  {
    title: "Qualification avant livraison",
    description:
      "Chaque lead est vérifié et qualifié selon des critères spécifiques avant d'arriver dans votre pipeline.",
  },
  {
    title: "Transparence totale des données",
    description: "Vous savez exactement d'où vient chaque lead, ce qu'il vous coûte et ce qu'il vous rapporte.",
  },
  {
    title: "Aucun bullshit marketing",
    description: "Pas de vanity metrics. On mesure uniquement ce qui impacte vos revenus.",
  },
  {
    title: "Focus sur le coût par opportunité",
    description: "Notre objectif n'est pas de livrer plus de leads, mais plus d'opportunités rentables.",
  },
]

export function DifferentiationSection() {
  return (
    <section id="pourquoi" className="reveal py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
              Pourquoi notre modèle fonctionne
              <br />
              <span className="text-accent">(quand les autres échouent)</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nous ne vendons pas de la visibilité. Nous livrons des opportunités d'affaires qualifiées qui se
              transforment en revenus. Notre modèle est conçu pour des partenaires qui veulent des résultats mesurables,
              pas des promesses marketing
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="reveal flex gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-150 ease-out hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <CheckCircle2 className="h-6 w-6 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
