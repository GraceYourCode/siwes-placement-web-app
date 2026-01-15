export interface Evaluation {
  id: string;
  name: string;
  matricNo: string;
  company: string;
  progress: number;
  lastEvaluation: string | null;
  nextDue: string;
  status: "due" | "upcoming";
}

export interface CompletedEvaluation {
  id: string;
  student_id: string;
  student_name: string;
  student_matric: string;
  period: string;
  date: string;
  technical_skills: number;
  communication: number;
  teamwork: number;
  punctuality: number;
  initiative: number;
  overall_rating: number;
  strengths: string;
  areas_for_improvement: string;
  comments: string;
}
