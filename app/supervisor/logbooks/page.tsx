"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Header from "../../../components/supervisor/header";
import Stats from "@/components/supervisor/logbooks/stats";
import { allLogbookEntries } from "@/components/supervisor/logbooks/data";
import {
  ConfirmDialogType,
  LogBookEntry,
} from "@/components/supervisor/logbooks/types";
import TabsSection from "@/components/supervisor/logbooks/tabs";
import ReviewDialog from "@/components/supervisor/logbooks/review-dialog";

export default function SupervisorLogbooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<LogBookEntry | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState("4");
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>({
    open: false,
    type: "approve",
    entry: null,
  });

  const pendingEntries = allLogbookEntries.filter(
    (e) => e.status === "pending"
  );

  const confirmAction = () => {
    setConfirmDialog({ open: false, type: "approve", entry: null });
  };

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        <Header
          heading="Logbook Reviews"
          subtitle="Review and approve student logbook entries"
        />

        <Stats
          allLogbookEntries={allLogbookEntries}
          pendingEntries={pendingEntries}
        />

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <TabsSection
          allLogbookEntries={allLogbookEntries}
          pendingEntries={pendingEntries}
          searchQuery={searchQuery}
          setConfirmDialog={setConfirmDialog}
          setReviewComment={setReviewComment}
          setReviewDialogOpen={setReviewDialogOpen}
          setReviewRating={setReviewRating}
          setSelectedEntry={setSelectedEntry}
        />
      </div>

      <ReviewDialog
        reviewComment={reviewComment}
        reviewDialogOpen={reviewDialogOpen}
        reviewRating={reviewRating}
        selectedEntry={selectedEntry}
        setReviewComment={setReviewComment}
        setReviewDialogOpen={setReviewDialogOpen}
        setReviewRating={setReviewRating}
      />

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
