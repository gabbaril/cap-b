import { Search, Filter, Send, LineChart } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Acquisition ciblée",
    description: "Google, Meta, recherche locale — nous activons les canaux qui performent pour votre industrie.",
  },
  {
    number: "2",
    icon: Filter,
    title: "Qualification des leads",
    description: "Chaque lead est qualifié selon vos critères avant d'être livré.",
  },
  {
    number: "3",
    icon: Send,
    title: "Livraison rapide et structurée",
    description: "Recevez vos leads qualifiés rapidement, directement dans votre pipeline.",
  },
  {
    number: "4",
    icon: LineChart,
    title: "Optimisation continue",
    description: "Analyse et ajustements constants selon les données pour maximiser vos résultats.",
  },
]

export function SolutionSection() {
  return (
    <section id="methode" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Un accélérateur de croissance
            <br />
            <span className="text-muted-foreground">pensé pour les entreprises d'ici</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous ne vendons pas du marketing. Nous livrons des opportunités d'affaires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-muted-foreground/20">{step.number}</span>
                  <div className="p-3 rounded-lg bg-secondary">
                    <step.icon className="h-6 w-6 text-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
