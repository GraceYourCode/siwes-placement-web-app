import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    role: "Students",
    description:
      "Find placements, maintain logbooks, and track your training journey.",
    href: "/student",
    color: "bg-info/10 text-info",
  },
  {
    role: "Supervisors",
    description:
      "Monitor assigned students, review entries, and complete evaluations.",
    href: "/supervisor",
    color: "bg-accent/10 text-accent",
  },
  {
    role: "Companies",
    description: "Post opportunities, review applications, and manage interns.",
    href: "/company",
    color: "bg-warning/10 text-warning",
  },
  {
    role: "Institutions",
    description: "Oversee the entire program with comprehensive admin tools.",
    href: "/admin",
    color: "bg-primary/10 text-primary",
  },
];

export default function RolesSection() {
  return (
    <section id="roles" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-heading-1 mb-4">Built for Everyone</h2>
          <p className="text-muted-foreground">
            Tailored experiences for every stakeholder in the SIWES ecosystem.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((item) => (
            <Link
              key={item.role}
              href={item.href}
              className="card-elevated p-6 hover:shadow-card-hover transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
              >
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.role}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <span className="text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
