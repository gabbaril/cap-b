import { Building2, Scale, HardHat, Wallet, Heart, Briefcase } from "lucide-react"

const industries = [
  { icon: Building2, name: "Courtiers immobiliers" },
  { icon: HardHat, name: "Entrepreneurs en construction" },
  { icon: Scale, name: "Avocats et notaires" },
  { icon: Wallet, name: "Services financiers" },
  { icon: Heart, name: "Cliniques privées" },
  { icon: Briefcase, name: "Services professionnels locaux" },
]

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Pour les entreprises de services
            <br />
            <span className="text-muted-foreground">ambitieuses</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-foreground/20 transition-colors text-center group"
            >
              <div className="p-4 rounded-lg bg-secondary w-fit mx-auto mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{industry.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-medium text-muted-foreground">
            "Si chaque nouveau client a une grande valeur pour vous,
            <br />
            <span className="text-foreground">notre système est fait pour vous."</span>
          </p>
        </div>
      </div>
    </section>
  )
}
