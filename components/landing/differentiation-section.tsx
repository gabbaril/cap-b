import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    title: "Leads exclusifs ou semi-exclusifs",
    description: "Vos leads ne sont pas revendus à 10 concurrents. Vous obtenez un avantage réel.",
  },
  {
    title: "Qualification avant livraison",
    description: "Chaque lead est vérifié selon vos critères avant d'arriver dans votre pipeline.",
  },
  {
    title: "Transparence totale des données",
    description: "Accès complet aux métriques, sources et performances de vos campagnes.",
  },
  {
    title: "Aucun bullshit marketing",
    description: "Pas de vanity metrics. On mesure ce qui compte : coût par opportunité réelle.",
  },
  {
    title: "Focus sur le coût par opportunité",
    description: "Notre objectif est votre rentabilité, pas le volume de leads inutiles.",
  },
]

export function DifferentiationSection() {
  return (
    <section id="pourquoi" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
              Pourquoi notre modèle fonctionne
              <br />
              <span className="text-muted-foreground">(quand les autres échouent)</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nous ne vendons pas de la visibilité. Nous livrons des opportunités d'affaires qualifiées qui se
              transforment en revenus. Notre modèle est conçu pour des partenaires qui veulent des résultats mesurables, pas des promesses marketing
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
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
