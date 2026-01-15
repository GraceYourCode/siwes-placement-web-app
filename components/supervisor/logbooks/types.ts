export interface LogBookEntry {
  id: string;
  student_id: string;
  student_name: string;
  student_matric: string;
  entry_date: string;
  activity_summary: string;
  hours_worked: number;
  skills_learned: string;
  challenges: string | null;
  status: "pending" | "approved" | "rejected";
}

export interface ConfirmDialogType {
  open: boolean;
  type: "approve" | "reject";
  entry: LogBookEntry | null;
}
