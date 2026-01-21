"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Target,
  BarChart3,
  Layers,
  User,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Crosshair,
  ChevronLeft,
  ChevronRight,
  Zap,
  Briefcase,
  Flame,
} from "lucide-react"

const leadsData = [
  {
    industry: "Courtage immobilier",
    intentLabel: "Lead vendeur à intention forte",
    name: "Jean M.",
    sector: "Immobilier résidentiel",
    location: "Montréal, Québec",
    intention: "Vente à court terme (3–6 mois)",
    source: "Recherche locale",
    budgetLabel: "Valeur estimée de la propriété",
    budgetValue: "750 000 $",
    status: "Qualifié et validé",
    badges: ["Lead exclusif", "Vérifié", "Intention confirmée", "Livré < 24h"],
  },
  {
    industry: "Courtage hypothécaire",
    intentLabel: "Lead refinancement chaud",
    name: "Amélie G.",
    sector: "Financement immobilier",
    location: "Laval, Québec",
    intention: "Refinancement (30–45 jours)",
    source: "Demande de taux actuel",
    budgetLabel: "Valeur estimée du refinancement",
    budgetValue: "500 000 $",
    status: "Qualifié et validé",
    badges: ["Lead exclusif", "Vérifié", "Intention confirmée", "Livré < 24h"],
  },
  {
    industry: "Services professionnels (Psychologie)",
    intentLabel: "Lead besoin actif",
    name: "Marc D.",
    sector: "Santé mentale",
    location: "Québec, Québec",
    intention: "Besoin actif (1–2 semaines)",
    source: "Recherche locale",
    budgetLabel: "Budget estimé",
    budgetValue: "À valider à l'appel",
    status: "Qualifié et validé",
    badges: ["Lead exclusif", "Vérifié", "Priorité élevée", "Livré < 24h"],
  },
]

const badgeIcons: Record<string, React.ReactNode> = {
  "Lead exclusif": <ShieldCheck className="h-3 w-3" />,
  Vérifié: <CheckCircle2 className="h-3 w-3" />,
  "Intention confirmée": <Target className="h-3 w-3" />,
  "Livré < 24h": <Clock className="h-3 w-3" />,
  "Priorité élevée": <Zap className="h-3 w-3" />,
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leadsData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leadsData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leadsData.length) % leadsData.length)
  }

  const currentLead = leadsData[currentSlide]

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Accélérez la croissance de votre entreprise
              <br />
              <span className="text-accent">avec des leads qualifiés</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Cap2B aide les entreprises de services au Québec à générer des opportunités d'affaires réelles grâce à des
              systèmes de génération de leads performants et mesurables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-base px-8 transition-all duration-150 ease-out hover:shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98]"
              >
                Recevoir des leads qualifiés
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 bg-transparent transition-all duration-150 ease-out hover:shadow-md hover:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-[0.98]"
              >
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
            <div
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl min-h-[520px] flex flex-col transition-all duration-150 ease-out hover:shadow-3xl hover:border-foreground/10"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                      aria-label={`Industrie: ${currentLead.industry}`}
                    >
                      <Briefcase className="h-3 w-3" />
                      {currentLead.industry}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-secondary/50 text-foreground/80 text-xs font-medium"
                      aria-label={`Niveau d'intention: ${currentLead.intentLabel}`}
                    >
                      <Flame className="h-3 w-3 text-accent" />
                      {currentLead.intentLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">Exemple de lead livré à nos partenaires</h3>
                  <p className="text-sm text-muted-foreground">
                    Données réelles, qualification complète, livraison en temps réel
                  </p>
                </div>

                {/* Lead Info - CRM style */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">Nom :</span>
                    <span className="text-sm font-medium">{currentLead.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">Localisation :</span>
                    <span className="text-sm font-medium">{currentLead.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Crosshair className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">Intention :</span>
                    <span className="text-sm font-medium">{currentLead.intention}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">Source :</span>
                    <span className="text-sm font-medium">{currentLead.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">{currentLead.budgetLabel} :</span>
                    <span className="text-sm font-medium">{currentLead.budgetValue}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">Statut :</span>
                    <span className="text-sm font-medium text-primary">{currentLead.status}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {currentLead.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium"
                    >
                      {badgeIcons[badge]}
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <p className="text-xs text-muted-foreground pt-2">
                
                </p>
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className={`p-2 rounded-full transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95 ${
                    isHovered ? "opacity-100" : "opacity-50"
                  } hover:opacity-100 hover:bg-secondary/80 hover:shadow-sm`}
                  aria-label="Lead précédent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {leadsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card ${
                        index === currentSlide
                          ? "bg-primary w-4"
                          : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Aller au lead ${index + 1}`}
                      aria-current={index === currentSlide ? "true" : "false"}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className={`p-2 rounded-full transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95 ${
                    isHovered ? "opacity-100" : "opacity-50"
                  } hover:opacity-100 hover:bg-secondary/80 hover:shadow-sm`}
                  aria-label="Lead suivant"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
