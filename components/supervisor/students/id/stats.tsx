import { Attendance, DemoLogBookEntry } from "../type";

interface StatSectionProps {
  demoLogbookEntries: DemoLogBookEntry[];
  demoAttendance: Attendance[];
}
export default function StatSection({
  demoAttendance,
  demoLogbookEntries,
}: StatSectionProps) {
  const pendingCount = demoLogbookEntries.filter(
    (e) => e.status === "pending"
  ).length;
  const approvedCount = demoLogbookEntries.filter(
    (e) => e.status === "approved"
  ).length;
  const presentDays = demoAttendance.filter(
    (a) => a.status === "present" || a.status === "late"
  ).length;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card-elevated p-4 text-center">
        <p className="text-2xl font-bold text-primary">
          {demoLogbookEntries.length}
        </p>
        <p className="text-caption text-muted-foreground">Total Entries</p>
      </div>
      <div className="card-elevated p-4 text-center">
        <p className="text-2xl font-bold text-warning">{pendingCount}</p>
        <p className="text-caption text-muted-foreground">Pending Review</p>
      </div>
      <div className="card-elevated p-4 text-center">
        <p className="text-2xl font-bold text-accent">{approvedCount}</p>
        <p className="text-caption text-muted-foreground">Approved</p>
      </div>
      <div className="card-elevated p-4 text-center">
        <p className="text-2xl font-bold text-info">{presentDays}</p>
        <p className="text-caption text-muted-foreground">Days Present</p>
      </div>
    </div>
  );
}
