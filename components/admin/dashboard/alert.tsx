import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const alerts = [
  {
    id: "1",
    type: "warning",
    message: "23 students without placement assignments",
    action: "Review",
  },
  {
    id: "2",
    type: "info",
    message: "Mid-term evaluation period begins Feb 20",
    action: "Prepare",
  },
  {
    id: "3",
    type: "warning",
    message: "5 logbook entries pending approval > 7 days",
    action: "Escalate",
  },
];

export default function Alert() {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`card-elevated p-4 flex items-center gap-4 border-l-4 ${
            alert.type === "warning" ? "border-warning" : "border-info"
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              alert.type === "warning" ? "bg-warning/10" : "bg-info/10"
            }`}
          >
            <AlertCircle
              className={`w-5 h-5 ${
                alert.type === "warning" ? "text-warning" : "text-info"
              }`}
            />
          </div>
          <p className="flex-1">{alert.message}</p>
          <Button variant="outline" size="sm">
            {alert.action}
          </Button>
        </div>
      ))}
    </div>
  );
}
