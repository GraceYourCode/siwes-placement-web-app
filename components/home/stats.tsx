const stats = [
  { value: "15,000+", label: "Students Placed" },
  { value: "500+", label: "Partner Companies" },
  { value: "50+", label: "Institutions" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function StatSection() {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-semibold text-accent">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
