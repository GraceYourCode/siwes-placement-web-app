import { StatusBadge } from "@/components/dashboard/status-badge";
import { Student } from "./type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Eye } from "lucide-react";

export const demoStudents: Student[] = [
  {
    id: "1",
    user_id: "user-1",
    name: "Adewale Johnson",
    matricNo: "2020/123456",
    email: "adewale.johnson@student.edu",
    company: "TechCorp Nigeria Ltd",
    department: "Computer Science",
    progress: 65,
    pendingEntries: 3,
    totalEntries: 24,
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "active" as const,
  },
  {
    id: "2",
    user_id: "user-2",
    name: "Chioma Okonkwo",
    matricNo: "2020/123457",
    email: "chioma.okonkwo@student.edu",
    company: "First Bank Nigeria Plc",
    department: "Computer Science",
    progress: 78,
    pendingEntries: 0,
    totalEntries: 28,
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    status: "active" as const,
  },
  {
    id: "3",
    user_id: "user-3",
    name: "Ibrahim Musa",
    matricNo: "2020/123458",
    email: "ibrahim.musa@student.edu",
    company: "Dangote Industries",
    department: "Electrical Engineering",
    progress: 45,
    pendingEntries: 5,
    totalEntries: 18,
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    status: "active" as const,
  },
  {
    id: "4",
    user_id: "user-4",
    name: "Fatima Ahmed",
    matricNo: "2020/123459",
    email: "fatima.ahmed@student.edu",
    company: "MTN Nigeria Communications",
    department: "Electrical Engineering",
    progress: 82,
    pendingEntries: 1,
    totalEntries: 32,
    startDate: "2024-01-08",
    endDate: "2024-06-08",
    status: "active" as const,
  },
  {
    id: "5",
    user_id: "user-5",
    name: "Emeka Nwosu",
    matricNo: "2020/123460",
    email: "emeka.nwosu@student.edu",
    company: "Shell Petroleum Development",
    department: "Chemical Engineering",
    progress: 35,
    pendingEntries: 0,
    totalEntries: 14,
    startDate: "2024-02-15",
    endDate: "2024-07-15",
    status: "active" as const,
  },
  {
    id: "6",
    user_id: "user-6",
    name: "Amina Bello",
    matricNo: "2020/123461",
    email: "amina.bello@student.edu",
    company: "Nestle Nigeria Plc",
    department: "Food Technology",
    progress: 55,
    pendingEntries: 2,
    totalEntries: 22,
    startDate: "2024-01-20",
    endDate: "2024-06-20",
    status: "active" as const,
  },
  {
    id: "7",
    user_id: "user-7",
    name: "Oluwaseun Adeyemi",
    matricNo: "2020/123462",
    email: "oluwaseun.adeyemi@student.edu",
    company: "Chevron Nigeria Limited",
    department: "Mechanical Engineering",
    progress: 90,
    pendingEntries: 0,
    totalEntries: 36,
    startDate: "2024-01-05",
    endDate: "2024-06-05",
    status: "completed" as const,
  },
  {
    id: "8",
    user_id: "user-8",
    name: "Grace Eze",
    matricNo: "2020/123463",
    email: "grace.eze@student.edu",
    company: "Nigerian Breweries Plc",
    department: "Microbiology",
    progress: 60,
    pendingEntries: 4,
    totalEntries: 24,
    startDate: "2024-01-25",
    endDate: "2024-06-25",
    status: "active" as const,
  },
];

export const columns = [
  {
    header: "Student",
    accessor: (row: Student) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-caption text-muted-foreground">{row.matricNo}</p>
      </div>
    ),
  },
  {
    header: "Company",
    accessor: "company" as const,
    className: "hidden md:table-cell",
  },
  {
    header: "Department",
    accessor: "department" as const,
    className: "hidden lg:table-cell",
  },
  {
    header: "Progress",
    accessor: (row: Student) => (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full"
            style={{ width: `${row.progress}%` }}
          />
        </div>
        <span className="text-caption text-muted-foreground">
          {row.progress}%
        </span>
      </div>
    ),
  },
  {
    header: "Pending",
    accessor: (row: Student) =>
      row.pendingEntries > 0 ? (
        <span className="status-badge bg-warning/10 text-warning">
          {row.pendingEntries} entries
        </span>
      ) : (
        <span className="text-caption text-muted-foreground">None</span>
      ),
  },
  {
    header: "Status",
    accessor: (row: Student) => <StatusBadge status={row.status} />,
  },
  {
    header: "",
    accessor: (row: Student) => (
      <div className="flex items-center gap-1 justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/supervisor/students/${row.user_id}`}>
            <Eye className="w-4 h-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/supervisor/students/${row.user_id}/logbook`}>
            <BookOpen className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    ),
    className: "text-right",
  },
];
