import { DataTable } from "@/components/dashboard/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock } from "lucide-react";
import React from "react";
import { completedColumns, pendingColumns } from "./data";
import { CompletedEvaluation, Evaluation } from "./type";

interface EvaluationTabSectionProps {
  completedEvaluations: CompletedEvaluation[];
  studentsForEvaluation: Evaluation[];
  searchQuery: string;
  setSelectedStudent: React.Dispatch<React.SetStateAction<string>>;
  setNewEvaluationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleViewEvaluation: (arg0: CompletedEvaluation) => void;
}

export default function EvaluationTabSection(props: EvaluationTabSectionProps) {
  const {
    completedEvaluations,
    handleViewEvaluation,
    searchQuery,
    setNewEvaluationOpen,
    setSelectedStudent,
    studentsForEvaluation,
  } = props;

  return (
    <Tabs defaultValue="pending" className="space-y-4">
      <TabsList>
        <TabsTrigger value="pending" className="gap-2">
          <Clock className="w-4 h-4" />
          Pending ({studentsForEvaluation.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="gap-2">
          <CheckCircle className="w-4 h-4" />
          Completed ({completedEvaluations.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pending">
        <div className="card-elevated">
          <DataTable
            columns={pendingColumns(setSelectedStudent, setNewEvaluationOpen)}
            data={studentsForEvaluation.filter(
              (s) =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.matricNo.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            emptyMessage="No students pending evaluation"
          />
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="card-elevated">
          <DataTable
            columns={completedColumns(handleViewEvaluation)}
            data={completedEvaluations.filter(
              (e) =>
                e.student_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                e.student_matric
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )}
            onRowClick={(evaluation) => handleViewEvaluation(evaluation)}
            emptyMessage="No completed evaluations"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
