import { Users, FileText, CheckCircle, Calendar } from "lucide-react";
import Header from "@/components/supervisor/dashboard/header";
import Alerts from "@/components/supervisor/dashboard/alerts";
import AssignedStudents from "@/components/supervisor/dashboard/assigned-students";
import UpcomingSchedule from "@/components/supervisor/dashboard/upcoming-schedule";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

const stats = [
  {
    title: "Assigned Students",
    value: "24",
    change: "8 active placements",
    changeType: "neutral" as const,
    icon: Users,
    iconColor: "primary" as const,
  },
  {
    title: "Pending Logbooks",
    value: "12",
    change: "Requires review",
    changeType: "neutral" as const,
    icon: FileText,
    iconColor: "warning" as const,
  },
  {
    title: "Evaluations Due",
    value: "5",
    change: "Next 7 days",
    changeType: "neutral" as const,
    icon: CheckCircle,
    iconColor: "accent" as const,
  },
  {
    title: "Site Visits",
    value: "3",
    change: "Scheduled this week",
    changeType: "neutral" as const,
    icon: Calendar,
    iconColor: "info" as const,
  },
];

const activities = [
  {
    id: "1",
    type: "logbook" as const,
    title: "New logbook entry",
    description: "Adewale Johnson submitted Week 6 entry",
    time: "1h ago",
  },
  {
    id: "2",
    type: "evaluation" as const,
    title: "Evaluation completed",
    description: "Mid-term for Chioma Okonkwo",
    time: "3h ago",
  },
  {
    id: "3",
    type: "alert" as const,
    title: "Pending review",
    description: "5 entries awaiting your approval",
    time: "5h ago",
  },
  {
    id: "4",
    type: "message" as const,
    title: "New message",
    description: "From: Industry Coordinator",
    time: "1d ago",
  },
];

export default function SupervisorDashboard() {
  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <Alerts />

        <div className="space-y-6 lg:grid lg:grid-cols-3 gap-6">
          <AssignedStudents />
          <ActivityFeed activities={activities} />
        </div>

        <UpcomingSchedule />
      </div>
    </DashboardLayout>
  );
}
