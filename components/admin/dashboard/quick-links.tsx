import { BarChart3, Building2, GraduationCap, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const actions = [
  {
    label: "Manage Students",
    icon: GraduationCap,
    href: "/admin/students",
    count: "1,248",
  },
  {
    label: "Partner Companies",
    icon: Building2,
    href: "/admin/companies",
    count: "156",
  },
  {
    label: "Supervisor Assignments",
    icon: Users,
    href: "/admin/supervisors",
    count: "48",
  },
  {
    label: "Generate Reports",
    icon: BarChart3,
    href: "/admin/reports",
    count: "15 templates",
  },
];

export default function QuickLinks() {
  return (
    <div className="card-elevated p-6">
      <h2 className="text-heading-3 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <action.icon className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{action.label}</span>
            </div>
            <p className="text-caption text-muted-foreground">{action.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
