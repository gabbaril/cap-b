"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-sm" />
            <span className="font-semibold text-lg tracking-tight">Cap2B</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#problemes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Problèmes
            </a>
            <a href="#methode" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Méthode
            </a>
            <a href="#industries" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Industries
            </a>
            <a href="#pourquoi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pourquoi nous
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <a href="/broker/login">
                Connexion
              </a>
            </Button>
            <Button size="sm">Recevoir des leads</Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#problemes" className="text-sm text-muted-foreground hover:text-foreground">
                Problèmes
              </a>
              <a href="#methode" className="text-sm text-muted-foreground hover:text-foreground">
                Méthode
              </a>
              <a href="#industries" className="text-sm text-muted-foreground hover:text-foreground">
                Industries
              </a>
              <a href="#pourquoi" className="text-sm text-muted-foreground hover:text-foreground">
                Pourquoi nous
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
                <Button size="sm">Recevoir des leads</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
