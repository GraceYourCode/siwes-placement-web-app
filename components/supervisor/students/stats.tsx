import { BookOpen, Calendar, Users } from "lucide-react";
import { Student } from "./type";

export default function StatSection({
  demoStudents,
}: {
  demoStudents: Student[];
}) {
  const totalPending = demoStudents.reduce(
    (sum, s) => sum + s.pendingEntries,
    0
  );
  const totalEntries = demoStudents.reduce((sum, s) => sum + s.totalEntries, 0);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Total Students</p>
          <p className="text-heading-3">{demoStudents.length}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-warning/10">
          <BookOpen className="w-5 h-5 text-warning" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Pending Reviews</p>
          <p className="text-heading-3">{totalPending}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <BookOpen className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Total Entries</p>
          <p className="text-heading-3">{totalEntries}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-info/10">
          <Calendar className="w-5 h-5 text-info" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Site Visits</p>
          <p className="text-heading-3">3</p>
        </div>
      </div>
    </div>
  );
}
