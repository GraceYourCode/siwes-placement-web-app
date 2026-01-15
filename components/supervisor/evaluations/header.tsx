import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "../header";

export default function EvaluationHeader({
  setNewEvaluationOpen,
}: {
  setNewEvaluationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <Header
        heading="Evaluations"
        subtitle="Evaluate student performance and provide feedback"
      />
      <Button onClick={() => setNewEvaluationOpen(true)}>
        <Plus className="w-4 h-4" />
        New Evaluation
      </Button>
    </div>
  );
}
