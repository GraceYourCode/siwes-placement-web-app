import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";
import Header from "@/components/company/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import ActiveListing from "@/components/company/dashboard/active-listings";
import RecentApplications from "@/components/company/dashboard/recent-applications";

const stats = [
  {
    title: "Active Listings",
    value: "4",
    change: "2 new this month",
    changeType: "positive" as const,
    icon: Briefcase,
    iconColor: "primary" as const,
  },
  {
    title: "Applications",
    value: "28",
    change: "12 pending review",
    changeType: "neutral" as const,
    icon: FileText,
    iconColor: "info" as const,
  },
  {
    title: "Current Interns",
    value: "8",
    change: "All active",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "accent" as const,
  },
  {
    title: "Evaluations Due",
    value: "3",
    change: "End of month",
    changeType: "neutral" as const,
    icon: CheckCircle,
    iconColor: "warning" as const,
  },
];

const activities = [
  {
    id: "1",
    type: "application" as const,
    title: "New application",
    description: "Adewale Johnson applied for Software Developer",
    time: "2h ago",
  },
  {
    id: "2",
    type: "logbook" as const,
    title: "Logbook submitted",
    description: "Ibrahim Musa - Week 6 entry",
    time: "4h ago",
  },
  {
    id: "3",
    type: "evaluation" as const,
    title: "Evaluation reminder",
    description: "Mid-term evaluation for 3 interns due",
    time: "1d ago",
  },
  {
    id: "4",
    type: "message" as const,
    title: "New message",
    description: "From: University Coordinator",
    time: "1d ago",
  },
];

export default function CompanyDashboard() {
  return (
    <DashboardLayout
      role="company"
      userName="HR Manager"
      userEmail="hr@techcorp.ng"
    >
      <div className="space-y-6">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="space-y-6 lg:grid lg:grid-cols-3 gap-6">
          <ActiveListing />
          <ActivityFeed activities={activities} />
        </div>

        <RecentApplications />
      </div>
    </DashboardLayout>
  );
}
