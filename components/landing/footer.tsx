export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/cap2b.png" alt="Cap2B" className="h-16 py-4"/>
          </div>

          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">Performance. Données. Résultats.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="mailto:info@cap2b.ca"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@cap2b.ca
            </a>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CAP2B Inc. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
