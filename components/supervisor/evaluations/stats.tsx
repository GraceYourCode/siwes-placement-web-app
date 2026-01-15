import { Calendar, CheckCircle, Clock, User } from "lucide-react";

interface EvaluationStatProps {
  dueStudentsLength: number;
  completedEvaluationsLength: number;
  studentsForEvaluationLength: number;
}
export default function EvaluationStat({
  dueStudentsLength,
  completedEvaluationsLength,
  studentsForEvaluationLength,
}: EvaluationStatProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-warning/10">
          <Clock className="w-5 h-5 text-warning" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Due Now</p>
          <p className="text-heading-3">{dueStudentsLength}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <CheckCircle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Completed</p>
          <p className="text-heading-3">{completedEvaluationsLength}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">Students</p>
          <p className="text-heading-3">{studentsForEvaluationLength}</p>
        </div>
      </div>
      <div className="card-elevated p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-info/10">
          <Calendar className="w-5 h-5 text-info" />
        </div>
        <div>
          <p className="text-caption text-muted-foreground">This Month</p>
          <p className="text-heading-3">2</p>
        </div>
      </div>
    </div>
  );
}
