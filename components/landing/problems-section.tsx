import { AlertCircle, Clock, TrendingDown, MousePointer } from "lucide-react"

const problems = [
  {
    icon: AlertCircle,
    title: "Trop de demandes non qualifiées",
    description: "Des contacts qui ne correspondent pas à votre client idéal et qui gaspillent votre temps précieux.",
  },
  {
    icon: Clock,
    title: "Temps perdu en suivi",
    description: "Des heures passées à relancer des prospects qui n'achèteront jamais.",
  },
  {
    icon: TrendingDown,
    title: "Résultats imprévisibles",
    description: "Une croissance inconstante basée sur le hasard plutôt que sur un système fiable.",
  },
  {
    icon: MousePointer,
    title: "Agences qui vendent des clics",
    description: "Des rapports impressionnants mais aucun client réel à la fin du mois.",
  },
]

export function ProblemsSection() {
  return (
    <section id="problemes" className="reveal py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Le problème n'est pas la visibilité.
            <br />
            <span className="text-accent">C'est la qualité des opportunités.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="reveal bg-card border border-border rounded-xl p-6 transition-all duration-150 ease-out hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="p-3 rounded-lg bg-secondary w-fit mb-4">
                <problem.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
