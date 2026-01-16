const stats = [
  { value: "50,000+", label: "Leads générés" },
  { value: "15+", label: "Industries servies" },
  { value: "2.4x", label: "ROI moyen observé" },
  { value: "92%", label: "Taux de satisfaction" },
]

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card border border-border rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground italic mb-4">
              "Notre succès dépend directement du vôtre."
            </p>
            <p className="text-sm text-muted-foreground">— L'équipe CAP-B</p>
          </div>
        </div>
      </div>
    </section>
  )
}
