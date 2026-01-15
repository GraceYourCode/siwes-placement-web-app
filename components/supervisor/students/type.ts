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
