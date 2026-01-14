import { StatCard } from "@/components/dashboard/stat-card";
import { Briefcase, Calendar, Clock, FileText } from "lucide-react";

const stats = [
  {
    title: "Applications Sent",
    value: "8",
    change: "+2 this week",
    changeType: "positive" as const,
    icon: Briefcase,
    iconColor: "primary" as const,
  },
  {
    title: "Logbook Entries",
    value: "24",
    change: "12 approved",
    changeType: "positive" as const,
    icon: FileText,
    iconColor: "accent" as const,
  },
  {
    title: "Days Completed",
    value: "45",
    change: "of 90 days",
    changeType: "neutral" as const,
    icon: Calendar,
    iconColor: "info" as const,
  },
  {
    title: "Pending Reviews",
    value: "3",
    change: "Awaiting approval",
    changeType: "neutral" as const,
    icon: Clock,
    iconColor: "warning" as const,
  },
];

export default function StatSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
