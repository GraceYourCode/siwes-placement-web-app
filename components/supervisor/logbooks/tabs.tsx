import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import React from "react";
import { ConfirmDialogType, LogBookEntry } from "./types";
import { format } from "date-fns";

interface TabsProps {
  allLogbookEntries: LogBookEntry[];
  pendingEntries: LogBookEntry[];
  searchQuery: string;
  setSelectedEntry: React.Dispatch<React.SetStateAction<LogBookEntry | null>>;
  setReviewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewComment: React.Dispatch<React.SetStateAction<string>>;
  setReviewRating: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogType>>;
}

export default function TabsSection(props: TabsProps) {
  const {
    allLogbookEntries,
    pendingEntries,
    searchQuery,
    setConfirmDialog,
    setReviewComment,
    setReviewDialogOpen,
    setReviewRating,
    setSelectedEntry,
  } = props;

  const pendingColumns = [
    {
      header: "Student",
      accessor: (row: LogBookEntry) => (
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
      accessor: (row: LogBookEntry) =>
        format(new Date(row.entry_date), "MMM d, yyyy"),
    },
    {
      header: "Activity",
      accessor: (row: LogBookEntry) => (
        <p className="line-clamp-2 max-w-sm">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: LogBookEntry) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "",
      accessor: (row: LogBookEntry) => (
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
      accessor: (row: LogBookEntry) => (
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
      accessor: (row: LogBookEntry) =>
        format(new Date(row.entry_date), "MMM d, yyyy"),
    },
    {
      header: "Activity",
      accessor: (row: LogBookEntry) => (
        <p className="line-clamp-2 max-w-sm">{row.activity_summary}</p>
      ),
    },
    {
      header: "Hours",
      accessor: (row: LogBookEntry) => (
        <span className="font-medium">{row.hours_worked}h</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: LogBookEntry) => <StatusBadge status={row.status} />,
    },
    {
      header: "",
      accessor: (row: LogBookEntry) => (
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

  const handleQuickAction = (
    entry: LogBookEntry,
    action: "approve" | "reject"
  ) => {
    setConfirmDialog({ open: true, type: action, entry });
  };

  const reviewedEntries = allLogbookEntries.filter(
    (e) => e.status !== "pending"
  );

  const filterEntries = (entries: LogBookEntry[]) =>
    entries.filter(
      (entry) =>
        entry.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.student_matric
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        entry.activity_summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleReviewEntry = (entry: LogBookEntry) => {
    setSelectedEntry(entry);
    setReviewDialogOpen(true);
    setReviewComment("");
    setReviewRating("4");
  };
  return (
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
  );
}
