"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Header from "@/components/supervisor/students/id/header";
import {
  demoAttendance,
  demoLogbookEntries,
  demoStudent,
} from "@/components/supervisor/students/data";
import {
  DemoLogBookEntry,
  LogBookEntryConfirmDialog,
} from "@/components/supervisor/students/type";
import StatSection from "@/components/supervisor/students/id/stats";
import TabSection from "@/components/supervisor/students/id/tab-section";
import ReviewDialog from "@/components/supervisor/students/id/review-dialog";
import PersonalInfo from "@/components/supervisor/students/id/personal-info";
import PlacementInfo from "@/components/supervisor/students/id/placement-info";
import Progress from "@/components/supervisor/students/id/progress";

export default function SupervisorStudentDetail() {
  const [selectedEntry, setSelectedEntry] = useState<DemoLogBookEntry | null>(
    null
  );
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState("4");
  const [confirmDialog, setConfirmDialog] = useState<LogBookEntryConfirmDialog>(
    { open: false, type: "approve", entry: null }
  );

  const handleReviewEntry = (entry: DemoLogBookEntry) => {
    setSelectedEntry(entry);
    setReviewDialogOpen(true);
    setReviewComment("");
    setReviewRating("4");
  };

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
        <Header matricNo={demoStudent.matricNo} name={demoStudent.name} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PersonalInfo demoStudent={demoStudent} />
          <PlacementInfo demoStudent={demoStudent} />
          <Progress demoStudent={demoStudent} />
        </div>

        <StatSection
          demoAttendance={demoAttendance}
          demoLogbookEntries={demoLogbookEntries}
        />

        <TabSection
          demoAttendance={demoAttendance}
          demoLogbookEntries={demoLogbookEntries}
          handleReviewEntry={handleReviewEntry}
          setConfirmDialog={setConfirmDialog}
        />
      </div>

      <ReviewDialog
        reviewComment={reviewComment}
        reviewRating={reviewRating}
        selectedEntry={selectedEntry}
        setReviewComment={setReviewComment}
        setReviewDialogOpen={setReviewDialogOpen}
        setReviewRating={setReviewRating}
        reviewDialogOpen={reviewDialogOpen}
      />

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
