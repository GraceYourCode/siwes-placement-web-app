import { cn } from "@/lib/utils";
import {
  LucideIcon,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Briefcase,
} from "lucide-react";

interface Activity {
  id: string;
  type: "logbook" | "application" | "message" | "evaluation" | "alert";
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const typeConfig: Record<
  Activity["type"],
  { icon: LucideIcon; color: string }
> = {
  logbook: { icon: FileText, color: "bg-info/10 text-info" },
  application: { icon: Briefcase, color: "bg-accent/10 text-accent" },
  message: { icon: MessageSquare, color: "bg-primary/10 text-primary" },
  evaluation: { icon: CheckCircle, color: "bg-success/10 text-success" },
  alert: { icon: AlertCircle, color: "bg-warning/10 text-warning" },
};

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("card-elevated", className)}>
      <div className="p-4 border-b border-border">
        <h3 className="text-heading-3">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border/50">
        {activities.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No recent activity
          </div>
        ) : (
          activities.map((activity) => {
            const config = typeConfig[activity.type];
            const Icon = config.icon;
            return (
              <div
                key={activity.id}
                className="p-4 flex gap-3 hover:bg-secondary/30 transition-colors"
              >
                <div className={cn("p-2 rounded-lg shrink-0", config.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium truncate">
                    {activity.title}
                  </p>
                  <p className="text-caption text-muted-foreground truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-caption text-muted-foreground shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
