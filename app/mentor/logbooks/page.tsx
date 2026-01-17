"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";

// Demo logbook entries
const initialLogbookEntries = [
  {
    id: "1",
    studentId: "1",
    studentName: "Adewale Johnson",
    matricNumber: "2020/12345",
    institution: "University of Lagos",
    date: "2024-02-12",
    title: "API Integration",
    description:
      "Worked on integrating third-party payment API with the e-commerce platform. Implemented error handling and transaction logging. Collaborated with the backend team to ensure proper data flow.",
    hoursWorked: 8,
    skillsLearned: "REST API, Error Handling, Payment Integration",
    status: "pending" as const,
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Chioma Okonkwo",
    matricNumber: "2020/23456",
    institution: "Covenant University",
    date: "2024-02-12",
    title: "UI Design Implementation",
    description:
      "Implemented the new dashboard design using React and Tailwind CSS. Created reusable components for charts and data visualization.",
    hoursWorked: 7,
    skillsLearned: "React, Tailwind CSS, Component Design",
    status: "approved" as const,
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Ibrahim Musa",
    matricNumber: "2020/34567",
    institution: "Ahmadu Bello University",
    date: "2024-02-11",
    title: "Database Migration",
    description:
      "Assisted in migrating the legacy database to PostgreSQL. Wrote migration scripts and validated data integrity.",
    hoursWorked: 6,
    skillsLearned: "PostgreSQL, Data Migration, SQL",
    status: "pending" as const,
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Fatima Ahmed",
    matricNumber: "2020/45678",
    institution: "University of Ibadan",
    date: "2024-02-11",
    title: "Testing & QA",
    description:
      "Performed unit testing and integration testing for the new features. Documented test cases and reported bugs.",
    hoursWorked: 8,
    skillsLearned: "Jest, Testing, QA Processes",
    status: "rejected" as const,
  },
  {
    id: "5",
    studentId: "5",
    studentName: "Emeka Nwosu",
    matricNumber: "2020/56789",
    institution: "University of Nigeria",
    date: "2024-02-10",
    title: "Sprint Planning Meeting",
    description:
      "Participated in the weekly sprint planning meeting. Presented progress on assigned tasks and received feedback.",
    hoursWorked: 5,
    skillsLearned: "Agile, Sprint Planning, Communication",
    status: "approved" as const,
  },
  {
    id: "6",
    studentId: "1",
    studentName: "Adewale Johnson",
    matricNumber: "2020/12345",
    institution: "University of Lagos",
    date: "2024-02-10",
    title: "Code Review Session",
    description:
      "Participated in code review for the authentication module. Learned about security best practices and code optimization.",
    hoursWorked: 4,
    skillsLearned: "Code Review, Security, Best Practices",
    status: "pending" as const,
  },
];

type LogbookEntry = (typeof initialLogbookEntries)[0];

export default function CompanyLogbooks() {
  const [entries, setEntries] = useState(initialLogbookEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogbookEntry | null>(null);
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">(
    "approve"
  );
  const [reviewComment, setReviewComment] = useState("");

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.matricNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || entry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewEntry = (entry: LogbookEntry) => {
    setSelectedEntry(entry);
    setViewDialogOpen(true);
  };

  const handleReview = (entry: LogbookEntry, action: "approve" | "reject") => {
    setSelectedEntry(entry);
    setReviewAction(action);
    setReviewComment("");
    setReviewDialogOpen(true);
  };

  const confirmReview = () => {
    if (!selectedEntry) return;

    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === selectedEntry.id
          ? {
              ...entry,
              status: reviewAction === "approve" ? "approved" : "rejected",
            }
          : entry
      )
    );

    toast.success(
      `Logbook entry ${
        reviewAction === "approve" ? "approved" : "rejected"
      } successfully`
    );
    setReviewDialogOpen(false);
  };

  // Stats
  const pendingCount = entries.filter((e) => e.status === "pending").length;
  const approvedCount = entries.filter((e) => e.status === "approved").length;
  const rejectedCount = entries.filter((e) => e.status === "rejected").length;

  const columns = [
    {
      header: "Student",
      accessor: (row: LogbookEntry) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.studentName}</p>
            <p className="text-caption text-muted-foreground">
              {row.matricNumber}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Entry",
      accessor: (row: LogbookEntry) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-caption text-muted-foreground line-clamp-1">
            {row.description}
          </p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (row: LogbookEntry) =>
        format(new Date(row.date), "MMM d, yyyy"),
      className: "hidden md:table-cell",
    },
    {
      header: "Hours",
      accessor: (row: LogbookEntry) => (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted-foreground" />
          {row.hoursWorked}h
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: LogbookEntry) => <StatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      accessor: (row: LogbookEntry) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewEntry(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleReview(row, "approve")}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleReview(row, "reject")}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <DashboardLayout
      role="company"
      userName="Mr. Tunde Bakare"
      userEmail="tunde@techcorp.ng"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-heading-1">Logbook Review</h1>
          <p className="text-muted-foreground">
            Review and manage student logbook entries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {approvedCount}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">
                {rejectedCount}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name, title, or matric number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entries</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredEntries}
          emptyMessage="No logbook entries found"
        />
      </div>

      {/* View Entry Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="bg-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Logbook Entry Details
            </DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedEntry.studentName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedEntry.matricNumber} • {selectedEntry.institution}
                  </p>
                </div>
                <StatusBadge status={selectedEntry.status} />
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedEntry.date), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{selectedEntry.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{selectedEntry.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Hours Worked
                    </p>
                    <p className="font-medium">
                      {selectedEntry.hoursWorked} hours
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Skills Learned
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedEntry.skillsLearned
                        .split(", ")
                        .map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedEntry?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-destructive"
                  onClick={() => {
                    setViewDialogOpen(false);
                    handleReview(selectedEntry, "reject");
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setViewDialogOpen(false);
                    handleReview(selectedEntry, "approve");
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {selectedEntry?.status !== "pending" && (
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" ? "Approve Entry" : "Reject Entry"}
            </DialogTitle>
            <DialogDescription>
              Add a comment or feedback for this logbook entry (optional)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="font-medium">{selectedEntry?.title}</p>
              <p className="text-sm text-muted-foreground">
                by {selectedEntry?.studentName}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Feedback / Comment
              </label>
              <Textarea
                placeholder="Enter your feedback or comments..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={reviewAction === "approve" ? "default" : "destructive"}
              className={
                reviewAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              onClick={confirmReview}
            >
              {reviewAction === "approve" ? "Approve Entry" : "Reject Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
