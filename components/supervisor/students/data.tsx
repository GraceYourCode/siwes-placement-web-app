import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Attendance,
  DemoLogBookEntry,
  DemoStudent,
  LogBookEntryConfirmDialog,
  Student,
} from "./type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, CheckCircle, Eye, FileText, XCircle } from "lucide-react";
import { format } from "date-fns";

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

export const demoStudent: DemoStudent = {
  id: "user-1",
  name: "Adewale Johnson",
  matricNo: "2020/123456",
  email: "adewale.johnson@student.edu",
  phone: "+234 801 234 5678",
  department: "Computer Science",
  level: "400 Level",
  institution: "University of Lagos",
  company: "TechCorp Nigeria Ltd",
  companyAddress: "12 Marina Street, Lagos Island, Lagos",
  position: "Software Development Intern",
  startDate: "2025-01-15",
  endDate: "2025-06-15",
  progress: 65,
  totalHours: 480,
  targetHours: 750,
  mentor: "Mr. Chukwudi Eze",
  mentorEmail: "c.eze@techcorp.ng",
};

export const demoLogbookEntries: DemoLogBookEntry[] = [
  {
    id: "1",
    entry_date: "2025-02-12",
    activity_summary:
      "Worked on the user authentication module. Implemented login and registration functionality using React and Node.js. Conducted code review with senior developer.",
    hours_worked: 8,
    skills_learned: "JWT Authentication, React Hooks, API Integration",
    challenges:
      "Had difficulty understanding the OAuth flow initially, but resolved with mentor guidance.",
    status: "pending" as const,
    created_at: "2025-02-12T17:00:00Z",
  },
  {
    id: "2",
    entry_date: "2025-02-11",
    activity_summary:
      "Completed the dashboard UI components. Created reusable card components and implemented data visualization charts using Recharts library.",
    hours_worked: 7,
    skills_learned: "React Components, Data Visualization, Tailwind CSS",
    challenges: null,
    status: "approved" as const,
    created_at: "2025-02-11T17:00:00Z",
  },
  {
    id: "3",
    entry_date: "2025-02-10",
    activity_summary:
      "Database schema design session with the team. Created ERD diagrams and wrote SQL migrations for the new features.",
    hours_worked: 6,
    skills_learned: "Database Design, PostgreSQL, Migrations",
    challenges: "Optimizing query performance for large datasets",
    status: "approved" as const,
    created_at: "2025-02-10T17:00:00Z",
  },
  {
    id: "4",
    entry_date: "2025-02-09",
    activity_summary:
      "API development and testing. Built RESTful endpoints for user management and wrote unit tests.",
    hours_worked: 8,
    skills_learned: "REST API Design, Jest Testing, Express.js",
    challenges: null,
    status: "pending" as const,
    created_at: "2025-02-09T17:00:00Z",
  },
  {
    id: "5",
    entry_date: "2025-02-08",
    activity_summary:
      "Team standup and sprint planning. Worked on bug fixes for the notification system.",
    hours_worked: 7,
    skills_learned: "Agile Methodology, Bug Fixing, Code Debugging",
    challenges: "Tracking down a race condition in async code",
    status: "rejected" as const,
    created_at: "2025-02-08T17:00:00Z",
  },
];

export const demoAttendance: Attendance[] = [
  {
    id: "1",
    date: "2025-02-12",
    check_in: "08:45",
    check_out: "17:30",
    status: "present",
    notes: null,
  },
  {
    id: "2",
    date: "2025-02-11",
    check_in: "08:30",
    check_out: "17:00",
    status: "present",
    notes: null,
  },
  {
    id: "3",
    date: "2025-02-10",
    check_in: "09:15",
    check_out: "16:30",
    status: "late",
    notes: "Traffic delay",
  },
  {
    id: "4",
    date: "2025-02-09",
    check_in: "08:30",
    check_out: "17:45",
    status: "present",
    notes: null,
  },
  {
    id: "5",
    date: "2025-02-08",
    check_in: "08:30",
    check_out: "17:00",
    status: "present",
    notes: null,
  },
  {
    id: "6",
    date: "2025-02-07",
    check_in: null,
    check_out: null,
    status: "absent",
    notes: "Medical appointment",
  },
  {
    id: "7",
    date: "2025-02-06",
    check_in: "08:45",
    check_out: "17:30",
    status: "present",
    notes: null,
  },
  {
    id: "8",
    date: "2025-02-05",
    check_in: "08:30",
    check_out: "17:00",
    status: "present",
    notes: null,
  },
];

export const logbookColumns = (
  setConfirmDialog: (arg0: LogBookEntryConfirmDialog) => void,
  handleReviewEntry: (arg0: DemoLogBookEntry) => void
) => {
  const handleQuickAction = (
    entry: DemoLogBookEntry,
    action: "approve" | "reject"
  ) => {
    setConfirmDialog({ open: true, type: action, entry });
  };

  return [
    {
      header: "Date",
      accessor: (row: DemoLogBookEntry) => (
        <span className="font-medium">
          {format(new Date(row.entry_date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      header: "Activity",
      accessor: (row: DemoLogBookEntry) => (
        <p className="line-clamp-2 max-w-md">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: DemoLogBookEntry) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: DemoLogBookEntry) => <StatusBadge status={row.status} />,
    },
    {
      header: "",
      accessor: (row: DemoLogBookEntry) => (
        <div className="flex items-center gap-1 justify-end">
          {row.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(row, "approve");
                }}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickAction(row, "reject");
                }}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleReviewEntry(row);
            }}
          >
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];
};

export const attendanceColumns = [
  {
    header: "Date",
    accessor: (row: Attendance) => (
      <span className="font-medium">
        {format(new Date(row.date), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    header: "Check In",
    accessor: (row: Attendance) => row.check_in || "-",
  },
  {
    header: "Check Out",
    accessor: (row: Attendance) => row.check_out || "-",
  },
  {
    header: "Status",
    accessor: (row: Attendance) => (
      <StatusBadge
        status={
          row.status === "present"
            ? "approved"
            : row.status === "late"
            ? "pending"
            : "rejected"
        }
      />
    ),
  },
  {
    header: "Notes",
    accessor: (row: Attendance) =>
      row.notes || <span className="text-muted-foreground">-</span>,
  },
];
