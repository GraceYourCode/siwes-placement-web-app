import { cn } from "@/lib/utils";

type StatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed"
  | "in-progress"
  | "draft"
  | "verified";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning",
  },
  approved: {
    label: "Approved",
    className: "bg-success/10 text-success",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive",
  },
  active: {
    label: "Active",
    className: "bg-info/10 text-info",
  },
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-info/10 text-info",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  verified: {
    label: "Approved",
    className: "bg-success/10 text-success",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={cn("status-badge", config.className, className)}>
      {config.label}
    </span>
  );
}
