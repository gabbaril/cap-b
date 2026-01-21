import { Building2, Scale, HardHat, Wallet, Heart, Briefcase } from "lucide-react"

const industries = [
  { icon: Building2, name: "Courtiers immobiliers", available: true },
  { icon: HardHat, name: "Entrepreneurs en construction", available: false },
  { icon: Scale, name: "Avocats et notaires", available: false },
  { icon: Wallet, name: "Services financiers", available: false },
  { icon: Heart, name: "Cliniques privées", available: false },
  { icon: Briefcase, name: "Services professionnels locaux", available: false },
]

export function IndustriesSection() {
  return (
    <section id="industries" className="reveal py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance">
            Pour les entreprises de services
            <br />
            <span className="text-accent">ambitieuses</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`reveal bg-card border rounded-xl p-6 transition-all duration-150 ease-out text-center group relative ${
                industry.available 
                  ? "border-primary/30 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg" 
                  : "border-border hover:border-foreground/20"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {!industry.available && (
                <span className="absolute top-3 right-3 text-[10px] font-medium text-muted-foreground/70 bg-secondary/80 px-2 py-0.5 rounded">
                  Bientot disponible
                </span>
              )}
              <div className={`p-4 rounded-lg w-fit mx-auto mb-4 transition-all duration-150 ease-out ${
                industry.available 
                  ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground" 
                  : "bg-secondary group-hover:bg-foreground group-hover:text-background"
              }`}>
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
