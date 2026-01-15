import { DataTable } from "@/components/dashboard/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar } from "lucide-react";
import { attendanceColumns, logbookColumns } from "../data";
import {
  Attendance,
  DemoLogBookEntry,
  LogBookEntryConfirmDialog,
} from "../type";

interface TabSectionProps {
  demoLogbookEntries: DemoLogBookEntry[];
  handleReviewEntry: (arg0: DemoLogBookEntry) => void;
  setConfirmDialog: (arg0: LogBookEntryConfirmDialog) => void;
  demoAttendance: Attendance[];
}
export default function TabSection({
  demoLogbookEntries,
  handleReviewEntry,
  setConfirmDialog,
  demoAttendance,
}: TabSectionProps) {
  return (
    <Tabs defaultValue="logbook" className="space-y-4">
      <TabsList>
        <TabsTrigger value="logbook" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Logbook Entries
        </TabsTrigger>
        <TabsTrigger value="attendance" className="gap-2">
          <Calendar className="w-4 h-4" />
          Attendance
        </TabsTrigger>
      </TabsList>

      <TabsContent value="logbook">
        <div className="card-elevated">
          <DataTable
            columns={logbookColumns(setConfirmDialog, handleReviewEntry)}
            data={demoLogbookEntries}
            onRowClick={(entry) => handleReviewEntry(entry)}
          />
        </div>
      </TabsContent>

      <TabsContent value="attendance">
        <div className="card-elevated">
          <DataTable columns={attendanceColumns} data={demoAttendance} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
