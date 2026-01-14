"use client";

import Alert from "@/components/admin/dashboard/alert";
import DepartmentalStats from "@/components/admin/dashboard/departmental-stats";
import Header from "@/components/admin/dashboard/header";
import QuickLinks from "@/components/admin/dashboard/quick-links";
import RecentPlacements from "@/components/admin/dashboard/recent-placements";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Users, Building2, Briefcase, GraduationCap } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12% from last year",
    changeType: "positive" as const,
    icon: GraduationCap,
    iconColor: "primary" as const,
  },
  {
    title: "Active Placements",
    value: "892",
    change: "71% placement rate",
    changeType: "positive" as const,
    icon: Briefcase,
    iconColor: "accent" as const,
  },
  {
    title: "Partner Companies",
    value: "156",
    change: "+8 this semester",
    changeType: "positive" as const,
    icon: Building2,
    iconColor: "info" as const,
  },
  {
    title: "Supervisors",
    value: "48",
    change: "All assigned",
    changeType: "neutral" as const,
    icon: Users,
    iconColor: "warning" as const,
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout
      role="admin"
      userName="Dr. Olumide Okafor"
      userEmail="admin@university.edu"
    >
      <div className="space-y-6">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <Alert />

        <div className="space-y-6 lg:grid lg:grid-cols-3 gap-6">
          <RecentPlacements />
          <DepartmentalStats />
        </div>

        <QuickLinks />
      </div>
    </DashboardLayout>
  );
}
