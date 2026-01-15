import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompletedEvaluation } from "./type";
import SelectedEvaluationCard from "./selected-evaluation-card";

interface EvaluationDialogProps {
  viewEvaluationOpen: boolean;
  selectedEvaluation: CompletedEvaluation | null;
  setViewEvaluationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EvaluationDialog({
  viewEvaluationOpen,
  setViewEvaluationOpen,
  selectedEvaluation,
}: EvaluationDialogProps) {
  return (
    <Dialog open={viewEvaluationOpen} onOpenChange={setViewEvaluationOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Evaluation Details</DialogTitle>
          <DialogDescription>
            {selectedEvaluation && (
              <span>
                {selectedEvaluation.student_name} • {selectedEvaluation.period}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {selectedEvaluation && (
          <SelectedEvaluationCard selectedEvaluation={selectedEvaluation} />
        )}
      </DialogContent>
    </Dialog>
  );
}
