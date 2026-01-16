import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemsSection } from "@/components/landing/problems-section"
import { SolutionSection } from "@/components/landing/solution-section"
import { IndustriesSection } from "@/components/landing/industries-section"
import { DifferentiationSection } from "@/components/landing/differentiation-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <IndustriesSection />
      <DifferentiationSection />
      <StatsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
