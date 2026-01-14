import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  FileText,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    label: "Write Logbook Entry",
    icon: FileText,
    href: "/student/logbook",
  },
  {
    label: "View Schedule",
    icon: Calendar,
    href: "/student/schedule",
  },
  {
    label: "Find Companies",
    icon: Building2,
    href: "/student/marketplace",
  },
  {
    label: "Check Applications",
    icon: Briefcase,
    href: "/student/applications",
  },
];

export default function QuickActions() {
  return (
    <div className="card-elevated p-6">
      <h2 className="text-heading-3 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <action.icon className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium flex-1">{action.label}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
