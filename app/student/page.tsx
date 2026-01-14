import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import WelcomeSection from "@/components/students/dashboard/welcome";
import StatSection from "@/components/students/dashboard/stats";
import CurrentPlacement from "@/components/students/dashboard/current-placement";
import QuickActions from "@/components/students/dashboard/quick-actions";

const activities = [
  {
    id: "1",
    type: "logbook" as const,
    title: "Logbook entry approved",
    description: "Week 6 entry reviewed by Dr. Adebayo",
    time: "2h ago",
  },
  {
    id: "2",
    type: "application" as const,
    title: "Application viewed",
    description: "TechCorp Nigeria viewed your application",
    time: "5h ago",
  },
  {
    id: "3",
    type: "message" as const,
    title: "New message",
    description: "From: Industry Supervisor",
    time: "1d ago",
  },
  {
    id: "4",
    type: "evaluation" as const,
    title: "Mid-term evaluation",
    description: "Completed successfully",
    time: "2d ago",
  },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout
      role="student"
      userName="Adewale Johnson"
      userEmail="adewale@university.edu"
    >
      <div className="space-y-6">
        <WelcomeSection />
        <StatSection />

        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6">
          <CurrentPlacement />
          <ActivityFeed activities={activities} />
        </div>

        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
