/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

interface WeekSelectorSidebarProps {
  selectedWeek: number;
  setSelectedWeek: React.Dispatch<React.SetStateAction<number>>;
  weekEntries: any[];
}

const weeks = [
  { number: 6, startDate: "Feb 5", endDate: "Feb 11", entries: 4, approved: 2 },
  { number: 5, startDate: "Jan 29", endDate: "Feb 4", entries: 5, approved: 5 },
  {
    number: 4,
    startDate: "Jan 22",
    endDate: "Jan 28",
    entries: 5,
    approved: 5,
  },
  {
    number: 3,
    startDate: "Jan 15",
    endDate: "Jan 21",
    entries: 5,
    approved: 5,
  },
];

export default function WeekSelectorSidebar(props: WeekSelectorSidebarProps) {
  const { selectedWeek, setSelectedWeek, weekEntries } = props;
  const currentWeek = weeks.find((w) => w.number === selectedWeek);

  return (
    <div className="space-y-4">
      <div className="card-elevated p-4">
        <h3 className="font-semibold mb-3">Training Weeks</h3>
        <div className="space-y-2">
          {weeks.map((week) => (
            <button
              key={week.number}
              onClick={() => setSelectedWeek(week.number)}
              className={cn(
                "w-full p-3 rounded-lg text-left transition-colors",
                selectedWeek === week.number
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Week {week.number}</span>
                <span
                  className={cn(
                    "text-xs",
                    selectedWeek === week.number
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {week.approved}/{week.entries}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs mt-1",
                  selectedWeek === week.number
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {week.startDate} - {week.endDate}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Week summary */}
      <div className="card-elevated p-4 space-y-3">
        <h3 className="font-semibold">Week {selectedWeek} Summary</h3>
        <div className="space-y-2 text-caption">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Entries</span>
            <span className="font-medium">{currentWeek?.entries}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Approved</span>
            <span className="font-medium text-success">
              {currentWeek?.approved}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Hours</span>
            <span className="font-medium">
              {weekEntries.reduce((acc, e) => acc + e.hours, 0)}h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
