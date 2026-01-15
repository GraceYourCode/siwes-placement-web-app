import { BookOpen, Mail, Phone, User } from "lucide-react";
import { DemoStudent } from "../type";

export default function PersonalInfo({
  demoStudent,
}: {
  demoStudent: DemoStudent;
}) {
  return (
    <div className="card-elevated p-4 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <User className="w-4 h-4" />
        Personal Information
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{demoStudent.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{demoStudent.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span>
            {demoStudent.department} • {demoStudent.level}
          </span>
        </div>
      </div>
    </div>
  );
}
