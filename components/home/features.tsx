import {
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle,
  GraduationCap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Company Marketplace",
    description:
      "Browse and apply to verified placement opportunities from leading organizations.",
  },
  {
    icon: GraduationCap,
    title: "Digital Logbook",
    description:
      "Record daily activities, get supervisor feedback, and track your training progress.",
  },
  {
    icon: Users,
    title: "Supervisor Portal",
    description:
      "Monitor students, review logbooks, schedule visits, and complete evaluations.",
  },
  {
    icon: CheckCircle,
    title: "Evaluation System",
    description:
      "Structured assessment forms for mid-term and final evaluations.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Generate comprehensive reports on placements, performance, and outcomes.",
  },
  {
    icon: Briefcase,
    title: "Application Tracking",
    description:
      "Monitor application status and receive real-time notifications.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-heading-1 mb-4">Everything You Need</h2>
          <p className="text-muted-foreground">
            Comprehensive tools designed to simplify every aspect of industrial
            training management.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-elevated p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
