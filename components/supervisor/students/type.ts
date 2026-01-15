export interface Student {
  id: string;
  user_id: string;
  name: string;
  matricNo: string;
  email: string;
  company: string;
  department: string;
  progress: number;
  pendingEntries: number;
  totalEntries: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed";
}

export interface DemoStudent {
  id: string;
  name: string;
  matricNo: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  institution: string;
  company: string;
  companyAddress: string;
  position: string;
  startDate: string;
  endDate: string;
  progress: number;
  totalHours: number;
  targetHours: number;
  mentor: string;
  mentorEmail: string;
}

export interface DemoLogBookEntry {
  id: string;
  entry_date: string;
  activity_summary: string;
  hours_worked: number;
  skills_learned: string;
  challenges: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Attendance {
  id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
  notes: null | string;
}

export interface LogBookEntryConfirmDialog {
  open: boolean;
  type: "approve" | "reject";
  entry: DemoLogBookEntry | null;
}
