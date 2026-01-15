import { format } from "date-fns";
import { CompletedEvaluation, Evaluation } from "./type";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";

export const studentsForEvaluation: Evaluation[] = [
  {
    id: "user-1",
    name: "Adewale Johnson",
    matricNo: "2020/123456",
    company: "TechCorp Nigeria Ltd",
    progress: 65,
    lastEvaluation: "2025-01-15",
    nextDue: "2025-02-15",
    status: "due" as const,
  },
  {
    id: "user-2",
    name: "Chioma Okonkwo",
    matricNo: "2020/123457",
    company: "First Bank Nigeria Plc",
    progress: 78,
    lastEvaluation: "2025-02-01",
    nextDue: "2025-03-01",
    status: "upcoming" as const,
  },
  {
    id: "user-3",
    name: "Ibrahim Musa",
    matricNo: "2020/123458",
    company: "Dangote Industries",
    progress: 45,
    lastEvaluation: null,
    nextDue: "2025-02-20",
    status: "due" as const,
  },
];

export const completedEvaluations: CompletedEvaluation[] = [
  {
    id: "1",
    student_id: "user-2",
    student_name: "Chioma Okonkwo",
    student_matric: "2020/123457",
    period: "Mid-term",
    date: "2025-02-01",
    technical_skills: 4,
    communication: 5,
    teamwork: 4,
    punctuality: 5,
    initiative: 4,
    overall_rating: 4.4,
    strengths:
      "Excellent communication skills, quick learner, good team player",
    areas_for_improvement: "Could take more initiative in suggesting solutions",
    comments:
      "Chioma has been performing exceptionally well during her internship.",
  },
  {
    id: "2",
    student_id: "user-1",
    student_name: "Adewale Johnson",
    student_matric: "2020/123456",
    period: "Monthly (January)",
    date: "2025-01-15",
    technical_skills: 5,
    communication: 3,
    teamwork: 4,
    punctuality: 4,
    initiative: 5,
    overall_rating: 4.2,
    strengths:
      "Strong technical skills, great problem solver, takes initiative",
    areas_for_improvement: "Needs to improve verbal communication with team",
    comments: "Adewale shows great potential and is progressing well.",
  },
];

export const pendingColumns = (
  setSelectedStudent: (arg0: string) => void,
  setNewEvaluationOpen: (arg0: boolean) => void
) => [
  {
    header: "Student",
    accessor: (row: Evaluation) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-caption text-muted-foreground">{row.matricNo}</p>
      </div>
    ),
  },
  {
    header: "Company",
    accessor: "company" as const,
    className: "hidden md:table-cell",
  },
  {
    header: "Progress",
    accessor: (row: Evaluation) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full"
            style={{ width: `${row.progress}%` }}
          />
        </div>
        <span className="text-caption">{row.progress}%</span>
      </div>
    ),
  },
  {
    header: "Last Evaluation",
    accessor: (row: Evaluation) =>
      row.lastEvaluation
        ? format(new Date(row.lastEvaluation), "MMM d, yyyy")
        : "None",
    className: "hidden lg:table-cell",
  },
  {
    header: "Due Date",
    accessor: (row: Evaluation) => (
      <span className={row.status === "due" ? "text-warning font-medium" : ""}>
        {format(new Date(row.nextDue), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    header: "",
    accessor: (row: Evaluation) => (
      <Button
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedStudent(row.id);
          setNewEvaluationOpen(true);
        }}
        className="text-primary-foreground"
      >
        <Star className="w-4 h-4" />
        Evaluate
      </Button>
    ),
    className: "text-right",
  },
];

export const completedColumns = (
  handleViewEvaluation: (arg0: CompletedEvaluation) => void
) => [
  {
    header: "Student",
    accessor: (row: CompletedEvaluation) => (
      <div>
        <p className="font-medium">{row.student_name}</p>
        <p className="text-caption text-muted-foreground">
          {row.student_matric}
        </p>
      </div>
    ),
  },
  {
    header: "Period",
    accessor: "period" as const,
  },
  {
    header: "Date",
    accessor: (row: CompletedEvaluation) =>
      format(new Date(row.date), "MMM d, yyyy"),
  },
  {
    header: "Overall Rating",
    accessor: (row: CompletedEvaluation) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-warning fill-warning" />
        <span className="font-medium">{row.overall_rating.toFixed(1)}</span>
        <span className="text-muted-foreground text-caption">/5</span>
      </div>
    ),
  },
  {
    header: "",
    accessor: (row: CompletedEvaluation) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleViewEvaluation(row);
        }}
      >
        <Eye className="w-4 h-4" />
      </Button>
    ),
    className: "text-right",
  },
];
