/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface EntriesProps {
  selectedWeek: number;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  weekEntries: any[];
}

export default function Entries(props: EntriesProps) {
  const { selectedWeek, setSelectedWeek, weekEntries } = props;

  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Week {selectedWeek} Entries</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedWeek(Math.min(6, selectedWeek + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {weekEntries.map((entry) => (
          <div key={entry.id} className="card-elevated p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{entry.title}</h3>
                  <StatusBadge status={entry.status} />
                </div>
                <div className="flex items-center gap-4 text-caption text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {entry.hours} hours
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>

            <p className="text-body text-muted-foreground">
              {entry.description}
            </p>

            {entry.supervisorComment && (
              <div
                className={cn(
                  "p-3 rounded-lg border-l-4",
                  entry.status === "approved"
                    ? "bg-success/5 border-success"
                    : "bg-destructive/5 border-destructive"
                )}
              >
                <p className="text-caption font-medium mb-1">
                  Supervisor Feedback:
                </p>
                <p className="text-caption text-muted-foreground">
                  {entry.supervisorComment}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
