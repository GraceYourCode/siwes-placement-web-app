"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  User,
  Building2,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";

// Demo data for the student
const demoStudent = {
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

// Demo logbook entries
const demoLogbookEntries = [
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

// Demo attendance records
const demoAttendance = [
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

export default function SupervisorStudentDetail() {
  const [selectedEntry, setSelectedEntry] = useState<
    (typeof demoLogbookEntries)[0] | null
  >(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState("4");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "approve" | "reject";
    entry: (typeof demoLogbookEntries)[0] | null;
  }>({ open: false, type: "approve", entry: null });

  const handleReviewEntry = (entry: (typeof demoLogbookEntries)[0]) => {
    setSelectedEntry(entry);
    setReviewDialogOpen(true);
    setReviewComment("");
    setReviewRating("4");
  };

  const handleSubmitReview = (isApproved: boolean) => {
    setReviewDialogOpen(false);
  };

  const handleQuickAction = (
    entry: (typeof demoLogbookEntries)[0],
    action: "approve" | "reject"
  ) => {
    setConfirmDialog({ open: true, type: action, entry });
  };

  const confirmAction = () => {
    setConfirmDialog({ open: false, type: "approve", entry: null });
  };

  const logbookColumns = [
    {
      header: "Date",
      accessor: (row: (typeof demoLogbookEntries)[0]) => (
        <span className="font-medium">
          {format(new Date(row.entry_date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      header: "Activity",
      accessor: (row: (typeof demoLogbookEntries)[0]) => (
        <p className="line-clamp-2 max-w-md">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: (typeof demoLogbookEntries)[0]) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: (typeof demoLogbookEntries)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: "",
      accessor: (row: (typeof demoLogbookEntries)[0]) => (
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

  const attendanceColumns = [
    {
      header: "Date",
      accessor: (row: (typeof demoAttendance)[0]) => (
        <span className="font-medium">
          {format(new Date(row.date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      header: "Check In",
      accessor: (row: (typeof demoAttendance)[0]) => row.check_in || "-",
    },
    {
      header: "Check Out",
      accessor: (row: (typeof demoAttendance)[0]) => row.check_out || "-",
    },
    {
      header: "Status",
      accessor: (row: (typeof demoAttendance)[0]) => (
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
      accessor: (row: (typeof demoAttendance)[0]) =>
        row.notes || <span className="text-muted-foreground">-</span>,
    },
  ];

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
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/supervisor/students">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-heading-1">{demoStudent.name}</h1>
            <p className="text-muted-foreground">{demoStudent.matricNo}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href={`/supervisor/evaluations/new?student=2`}>
              <Star className="w-4 h-4" />
              Add Evaluation
            </Link>
          </Button>
        </div>

        {/* Student Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Personal Info */}
          <div className="card-elevated p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{demoStudent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{demoStudent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span>
                  {demoStudent.department} • {demoStudent.level}
                </span>
              </div>
            </div>
          </div>

          {/* Placement Info */}
          <div className="card-elevated p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Placement Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{demoStudent.company}</p>
              <p className="text-muted-foreground">{demoStudent.position}</p>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {demoStudent.companyAddress}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  {format(new Date(demoStudent.startDate), "MMM d")} -{" "}
                  {format(new Date(demoStudent.endDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="card-elevated p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Progress Overview
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion</span>
                  <span className="font-medium">{demoStudent.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${demoStudent.progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Hours Logged</p>
                  <p className="font-semibold">{demoStudent.totalHours}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-semibold">{demoStudent.targetHours}h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
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

        {/* Tabs */}
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
                columns={logbookColumns}
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
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Logbook Entry</DialogTitle>
            <DialogDescription>
              {selectedEntry &&
                format(
                  new Date(selectedEntry.entry_date),
                  "EEEE, MMMM d, yyyy"
                )}
            </DialogDescription>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Activity Summary</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEntry.activity_summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Hours Worked</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEntry.hours_worked} hours
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <StatusBadge status={selectedEntry.status} />
                </div>
              </div>

              {selectedEntry.skills_learned && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Skills Learned</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEntry.skills_learned}
                  </p>
                </div>
              )}

              {selectedEntry.challenges && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Challenges</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEntry.challenges}
                  </p>
                </div>
              )}

              {selectedEntry.status === "pending" && (
                <>
                  <div className="border-t pt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Rating
                      </label>
                      <Select
                        value={reviewRating}
                        onValueChange={setReviewRating}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="3">3 - Average</SelectItem>
                          <SelectItem value="2">2 - Below Average</SelectItem>
                          <SelectItem value="1">1 - Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Review Comment
                      </label>
                      <Textarea
                        placeholder="Add your feedback for this entry..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => handleSubmitReview(false)}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                    <Button onClick={() => handleSubmitReview(true)}>
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                  </DialogFooter>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Action Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={
          confirmDialog.type === "approve" ? "Approve Entry" : "Reject Entry"
        }
        description={`Are you sure you want to ${confirmDialog.type} this logbook entry?`}
        confirmLabel={confirmDialog.type === "approve" ? "Approve" : "Reject"}
        variant={confirmDialog.type === "reject" ? "destructive" : "default"}
        onConfirm={confirmAction}
      />
    </DashboardLayout>
  );
}
