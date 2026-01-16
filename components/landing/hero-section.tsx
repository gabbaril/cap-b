import { Button } from "@/components/ui/button"
import { MapPin, Target, BarChart3, Layers } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Accélérez la croissance de votre entreprise
              <br />
              <span className="text-muted-foreground">avec des leads qualifiés</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              CAP-B aide les entreprises de services au Québec à générer des opportunités d'affaires réelles grâce à des
              systèmes de génération de leads performants et mesurables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8">
                Recevoir des leads qualifiés
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                Demander un audit gratuit
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-medium">Marché québécois</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Target className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-medium">Leads qualifiés</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <BarChart3 className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-medium">Performance mesurable</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Layers className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-sm font-medium">Approche structurée</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taux de conversion</span>
                  <span className="text-sm font-semibold text-green-400">+150%</span>
                </div>
                <div className="h-48 bg-secondary/50 rounded-xl flex items-end justify-around p-4 gap-2">
                  <div className="w-8 bg-muted-foreground/30 rounded-t-sm" style={{ height: "30%" }} />
                  <div className="w-8 bg-muted-foreground/30 rounded-t-sm" style={{ height: "45%" }} />
                  <div className="w-8 bg-muted-foreground/30 rounded-t-sm" style={{ height: "40%" }} />
                  <div className="w-8 bg-muted-foreground/30 rounded-t-sm" style={{ height: "60%" }} />
                  <div className="w-8 bg-muted-foreground/30 rounded-t-sm" style={{ height: "55%" }} />
                  <div className="w-8 bg-foreground rounded-t-sm" style={{ height: "85%" }} />
                  <div className="w-8 bg-foreground rounded-t-sm" style={{ height: "95%" }} />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold">2.4x</p>
                    <p className="text-xs text-muted-foreground">ROI moyen</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">48h</p>
                    <p className="text-xs text-muted-foreground">Délai de livraison</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-xs text-muted-foreground">Taux qualifié</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
