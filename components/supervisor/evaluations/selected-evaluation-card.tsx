import { format } from "date-fns";
import { CompletedEvaluation } from "./type";
import { Star } from "lucide-react";

export default function SelectedEvaluationCard({
  selectedEvaluation,
}: {
  selectedEvaluation: CompletedEvaluation;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
        <div>
          <p className="font-medium">{selectedEvaluation.student_name}</p>
          <p className="text-caption text-muted-foreground">
            {selectedEvaluation.student_matric}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-warning fill-warning" />
            <span className="text-xl font-bold">
              {selectedEvaluation.overall_rating.toFixed(1)}
            </span>
          </div>
          <p className="text-caption text-muted-foreground">Overall Rating</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 text-center">
        {[
          {
            label: "Technical",
            value: selectedEvaluation.technical_skills,
          },
          {
            label: "Communication",
            value: selectedEvaluation.communication,
          },
          { label: "Teamwork", value: selectedEvaluation.teamwork },
          {
            label: "Punctuality",
            value: selectedEvaluation.punctuality,
          },
          { label: "Initiative", value: selectedEvaluation.initiative },
        ].map((item) => (
          <div key={item.label} className="p-2 bg-secondary/30 rounded-lg">
            <p className="text-lg font-bold">{item.value}</p>
            <p className="text-caption text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-1">Strengths</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEvaluation.strengths}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Areas for Improvement</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEvaluation.areas_for_improvement}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Comments</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEvaluation.comments}
          </p>
        </div>
      </div>

      <div className="text-caption text-muted-foreground text-right">
        Submitted on {format(new Date(selectedEvaluation.date), "MMMM d, yyyy")}
      </div>
    </div>
  );
}
