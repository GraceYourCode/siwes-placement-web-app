import { Clock } from "lucide-react";
import { DemoStudent } from "../type";

export default function Progress({
  demoStudent,
}: {
  demoStudent: DemoStudent;
}) {
  return (
    <div className="card-elevated p-4 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Progress Overview
      </h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Completion</span>
            <span className="font-medium">{demoStudent.progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${demoStudent.progress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Hours Logged</p>
            <p className="font-semibold">{demoStudent.totalHours}h</p>
          </div>
          <div>
            <p className="text-muted-foreground">Target</p>
            <p className="font-semibold">{demoStudent.targetHours}h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
