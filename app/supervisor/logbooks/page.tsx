"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  BookOpen,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

// Demo logbook entries from all students
const allLogbookEntries = [
  {
    id: "1",
    student_id: "user-1",
    student_name: "Adewale Johnson",
    student_matric: "2020/123456",
    entry_date: "2024-02-12",
    activity_summary:
      "Worked on the user authentication module. Implemented login and registration functionality using React and Node.js.",
    hours_worked: 8,
    skills_learned: "JWT Authentication, React Hooks",
    challenges: "OAuth flow complexity",
    status: "pending" as const,
  },
  {
    id: "2",
    student_id: "user-3",
    student_name: "Ibrahim Musa",
    student_matric: "2020/123458",
    entry_date: "2024-02-12",
    activity_summary:
      "Electrical installation and safety testing for the new manufacturing unit. Conducted wire sizing calculations.",
    hours_worked: 7,
    skills_learned: "Industrial Electrical Systems, Safety Protocols",
    challenges: null,
    status: "pending" as const,
  },
  {
    id: "3",
    student_id: "user-4",
    student_name: "Fatima Ahmed",
    student_matric: "2020/123459",
    entry_date: "2024-02-12",
    activity_summary:
      "Network infrastructure audit and documentation. Created network topology diagrams for the data center.",
    hours_worked: 8,
    skills_learned: "Network Documentation, Visio Diagrams",
    challenges: null,
    status: "pending" as const,
  },
  {
    id: "4",
    student_id: "user-1",
    student_name: "Adewale Johnson",
    student_matric: "2020/123456",
    entry_date: "2024-02-11",
    activity_summary:
      "Dashboard UI development and component library creation. Built reusable React components.",
    hours_worked: 7,
    skills_learned: "React Components, Tailwind CSS",
    challenges: null,
    status: "approved" as const,
  },
  {
    id: "5",
    student_id: "user-6",
    student_name: "Amina Bello",
    student_matric: "2020/123461",
    entry_date: "2024-02-11",
    activity_summary:
      "Quality control procedures in the production line. Tested sample products for compliance.",
    hours_worked: 6,
    skills_learned: "QC Procedures, Documentation",
    challenges: "Calibration issues with testing equipment",
    status: "pending" as const,
  },
  {
    id: "6",
    student_id: "user-8",
    student_name: "Grace Eze",
    student_matric: "2020/123463",
    entry_date: "2024-02-11",
    activity_summary:
      "Microbial analysis and culture preparation. Conducted gram staining and microscopy.",
    hours_worked: 8,
    skills_learned: "Microbiology Techniques, Lab Safety",
    challenges: null,
    status: "pending" as const,
  },
  {
    id: "7",
    student_id: "user-2",
    student_name: "Chioma Okonkwo",
    student_matric: "2020/123457",
    entry_date: "2024-02-10",
    activity_summary:
      "Banking software testing and bug reporting. Wrote test cases for transaction modules.",
    hours_worked: 8,
    skills_learned: "Software Testing, Bug Tracking",
    challenges: null,
    status: "approved" as const,
  },
  {
    id: "8",
    student_id: "user-3",
    student_name: "Ibrahim Musa",
    student_matric: "2020/123458",
    entry_date: "2024-02-10",
    activity_summary:
      "PLC programming and industrial automation training. Wrote ladder logic programs.",
    hours_worked: 7,
    skills_learned: "PLC Programming, Industrial Automation",
    challenges: "Understanding complex timing sequences",
    status: "rejected" as const,
  },
];

export default function SupervisorLogbooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<
    (typeof allLogbookEntries)[0] | null
  >(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState("4");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "approve" | "reject";
    entry: (typeof allLogbookEntries)[0] | null;
  }>({ open: false, type: "approve", entry: null });

  const pendingEntries = allLogbookEntries.filter(
    (e) => e.status === "pending"
  );
  const reviewedEntries = allLogbookEntries.filter(
    (e) => e.status !== "pending"
  );

  const filterEntries = (entries: typeof allLogbookEntries) =>
    entries.filter(
      (entry) =>
        entry.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.student_matric
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        entry.activity_summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleReviewEntry = (entry: (typeof allLogbookEntries)[0]) => {
    setSelectedEntry(entry);
    setReviewDialogOpen(true);
    setReviewComment("");
    setReviewRating("4");
  };

  const handleSubmitReview = (isApproved: boolean) => {
    setReviewDialogOpen(false);
  };

  const handleQuickAction = (
    entry: (typeof allLogbookEntries)[0],
    action: "approve" | "reject"
  ) => {
    setConfirmDialog({ open: true, type: action, entry });
  };

  const confirmAction = () => {
    setConfirmDialog({ open: false, type: "approve", entry: null });
  };

  const pendingColumns = [
    {
      header: "Student",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <div>
          <p className="font-medium">{row.student_name}</p>
          <p className="text-caption text-muted-foreground">
            {row.student_matric}
          </p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (row: (typeof allLogbookEntries)[0]) =>
        format(new Date(row.entry_date), "MMM d, yyyy"),
    },
    {
      header: "Activity",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <p className="line-clamp-2 max-w-sm">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <div className="flex items-center gap-1 justify-end">
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

  const reviewedColumns = [
    {
      header: "Student",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <div>
          <p className="font-medium">{row.student_name}</p>
          <p className="text-caption text-muted-foreground">
            {row.student_matric}
          </p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (row: (typeof allLogbookEntries)[0]) =>
        format(new Date(row.entry_date), "MMM d, yyyy"),
    },
    {
      header: "Activity",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <p className="line-clamp-2 max-w-sm">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: "",
      accessor: (row: (typeof allLogbookEntries)[0]) => (
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
      ),
      className: "text-right",
    },
  ];

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-heading-1">Logbook Reviews</h1>
          <p className="text-muted-foreground">
            Review and approve student logbook entries
          </p>
        </div>

        {/* Stats */}
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
                {
                  allLogbookEntries.filter((e) => e.status === "approved")
                    .length
                }
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
                {
                  allLogbookEntries.filter((e) => e.status === "rejected")
                    .length
                }
              </p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">
                Total Entries
              </p>
              <p className="text-heading-3">{allLogbookEntries.length}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="w-4 h-4" />
              Pending ({pendingEntries.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Reviewed ({reviewedEntries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="card-elevated">
              <DataTable
                columns={pendingColumns}
                data={filterEntries(pendingEntries)}
                onRowClick={(entry) => handleReviewEntry(entry)}
                emptyMessage="No pending entries to review"
              />
            </div>
          </TabsContent>

          <TabsContent value="reviewed">
            <div className="card-elevated">
              <DataTable
                columns={reviewedColumns}
                data={filterEntries(reviewedEntries)}
                onRowClick={(entry) => handleReviewEntry(entry)}
                emptyMessage="No reviewed entries"
              />
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
              {selectedEntry && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedEntry.student_name} • {selectedEntry.student_matric}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {format(
                    new Date(selectedEntry.entry_date),
                    "EEEE, MMMM d, yyyy"
                  )}
                </span>
                <StatusBadge status={selectedEntry.status} />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Activity Summary</h4>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
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
                {selectedEntry.skills_learned && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Skills Learned</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry.skills_learned}
                    </p>
                  </div>
                )}
              </div>

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

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={
          confirmDialog.type === "approve" ? "Approve Entry" : "Reject Entry"
        }
        description={`Are you sure you want to ${confirmDialog.type} ${confirmDialog.entry?.student_name}'s logbook entry?`}
        confirmLabel={confirmDialog.type === "approve" ? "Approve" : "Reject"}
        variant={confirmDialog.type === "reject" ? "destructive" : "default"}
        onConfirm={confirmAction}
      />
    </DashboardLayout>
  );
}
