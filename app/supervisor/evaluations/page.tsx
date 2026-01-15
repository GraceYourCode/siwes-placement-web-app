"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import EvaluationHeader from "@/components/supervisor/evaluations/header";
import { CompletedEvaluation } from "@/components/supervisor/evaluations/type";
import EvaluationStat from "@/components/supervisor/evaluations/stats";
import {
  completedEvaluations,
  studentsForEvaluation,
} from "@/components/supervisor/evaluations/data";
import EvaluationTabSection from "@/components/supervisor/evaluations/tab-section";
import NewEvaluationDialog from "@/components/supervisor/evaluations/new-evaluation-dialog";
import EvaluationDialog from "@/components/supervisor/evaluations/evaluation-dialog";

export default function SupervisorEvaluations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvaluationOpen, setNewEvaluationOpen] = useState(false);
  const [viewEvaluationOpen, setViewEvaluationOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<CompletedEvaluation | null>(null);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleViewEvaluation = (evaluation: CompletedEvaluation) => {
    setSelectedEvaluation(evaluation);
    setViewEvaluationOpen(true);
  };

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        <EvaluationHeader setNewEvaluationOpen={setNewEvaluationOpen} />

        <EvaluationStat
          completedEvaluationsLength={completedEvaluations.length}
          studentsForEvaluationLength={studentsForEvaluation.length}
          dueStudentsLength={
            studentsForEvaluation.filter((s) => s.status === "due").length
          }
        />

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <EvaluationTabSection
          completedEvaluations={completedEvaluations}
          handleViewEvaluation={handleViewEvaluation}
          searchQuery={searchQuery}
          setNewEvaluationOpen={setNewEvaluationOpen}
          setSelectedStudent={setSelectedStudent}
          studentsForEvaluation={studentsForEvaluation}
        />
      </div>

      <NewEvaluationDialog
        newEvaluationOpen={newEvaluationOpen}
        selectedStudent={selectedStudent}
        setNewEvaluationOpen={setNewEvaluationOpen}
        setSelectedStudent={setSelectedStudent}
        studentsForEvaluation={studentsForEvaluation}
      />

      <EvaluationDialog
        selectedEvaluation={selectedEvaluation}
        setViewEvaluationOpen={setViewEvaluationOpen}
        viewEvaluationOpen={viewEvaluationOpen}
      />
    </DashboardLayout>
  );
}
