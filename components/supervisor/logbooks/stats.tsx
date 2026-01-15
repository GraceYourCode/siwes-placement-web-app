import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";
import { LogBookEntry } from "./types";

interface StatsProps {
  pendingEntries: LogBookEntry[];
  allLogbookEntries: LogBookEntry[];
}
export default function Stats({
  allLogbookEntries,
  pendingEntries,
}: StatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-warning/10">
          <Clock className="w-5 h-5 text-warning" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Pending</p>
          <p className="text-heading-3">{pendingEntries.length}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <CheckCircle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Approved</p>
          <p className="text-heading-3">
            {allLogbookEntries.filter((e) => e.status === "approved").length}
          </p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-destructive/10">
          <XCircle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Rejected</p>
          <p className="text-heading-3">
            {allLogbookEntries.filter((e) => e.status === "rejected").length}
          </p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Total Entries</p>
          <p className="text-heading-3">{allLogbookEntries.length}</p>
        </div>
      </div>
    </div>
  );
}
