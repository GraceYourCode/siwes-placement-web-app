"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Eye,
  Star,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { DataTable } from "@/components/dashboard/data-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

// Demo students for evaluation
const studentsForEvaluation = [
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

// Demo completed evaluations
const completedEvaluations = [
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

const RatingSlider = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label>{label}</Label>
      <span className="text-sm font-medium">{value[0]}/5</span>
    </div>
    <Slider
      value={value}
      onValueChange={onChange}
      max={5}
      min={1}
      step={1}
      className="w-full"
    />
  </div>
);

export default function SupervisorEvaluations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvaluationOpen, setNewEvaluationOpen] = useState(false);
  const [viewEvaluationOpen, setViewEvaluationOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<
    (typeof completedEvaluations)[0] | null
  >(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [evaluationPeriod, setEvaluationPeriod] = useState("mid-term");

  // Evaluation form state
  const [technicalSkills, setTechnicalSkills] = useState([4]);
  const [communication, setCommunication] = useState([4]);
  const [teamwork, setTeamwork] = useState([4]);
  const [punctuality, setPunctuality] = useState([4]);
  const [initiative, setInitiative] = useState([4]);
  const [strengths, setStrengths] = useState("");
  const [areasForImprovement, setAreasForImprovement] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmitEvaluation = () => {
    setNewEvaluationOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedStudent("");
    setEvaluationPeriod("mid-term");
    setTechnicalSkills([4]);
    setCommunication([4]);
    setTeamwork([4]);
    setPunctuality([4]);
    setInitiative([4]);
    setStrengths("");
    setAreasForImprovement("");
    setComments("");
  };

  const handleViewEvaluation = (
    evaluation: (typeof completedEvaluations)[0]
  ) => {
    setSelectedEvaluation(evaluation);
    setViewEvaluationOpen(true);
  };

  const dueStudents = studentsForEvaluation.filter((s) => s.status === "due");

  const pendingColumns = [
    {
      header: "Student",
      accessor: (row: (typeof studentsForEvaluation)[0]) => (
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
      accessor: (row: (typeof studentsForEvaluation)[0]) => (
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
      accessor: (row: (typeof studentsForEvaluation)[0]) =>
        row.lastEvaluation
          ? format(new Date(row.lastEvaluation), "MMM d, yyyy")
          : "None",
      className: "hidden lg:table-cell",
    },
    {
      header: "Due Date",
      accessor: (row: (typeof studentsForEvaluation)[0]) => (
        <span
          className={row.status === "due" ? "text-warning font-medium" : ""}
        >
          {format(new Date(row.nextDue), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      header: "",
      accessor: (row: (typeof studentsForEvaluation)[0]) => (
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

  const completedColumns = [
    {
      header: "Student",
      accessor: (row: (typeof completedEvaluations)[0]) => (
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
      accessor: (row: (typeof completedEvaluations)[0]) =>
        format(new Date(row.date), "MMM d, yyyy"),
    },
    {
      header: "Overall Rating",
      accessor: (row: (typeof completedEvaluations)[0]) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="font-medium">{row.overall_rating.toFixed(1)}</span>
          <span className="text-muted-foreground text-caption">/5</span>
        </div>
      ),
    },
    {
      header: "",
      accessor: (row: (typeof completedEvaluations)[0]) => (
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

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-heading-1">Evaluations</h1>
            <p className="text-muted-foreground">
              Evaluate student performance and provide feedback
            </p>
          </div>
          <Button onClick={() => setNewEvaluationOpen(true)}>
            <Plus className="w-4 h-4" />
            New Evaluation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Due Now</p>
              <p className="text-heading-3">{dueStudents.length}</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Completed</p>
              <p className="text-heading-3">{completedEvaluations.length}</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Students</p>
              <p className="text-heading-3">{studentsForEvaluation.length}</p>
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
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
                columns={pendingColumns}
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
                columns={completedColumns}
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
      </div>

      {/* New Evaluation Dialog */}
      <Dialog open={newEvaluationOpen} onOpenChange={setNewEvaluationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Student Evaluation</DialogTitle>
            <DialogDescription>
              Evaluate student performance across multiple criteria
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <Select
                  value={selectedStudent}
                  onValueChange={setSelectedStudent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentsForEvaluation.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Evaluation Period</Label>
                <Select
                  value={evaluationPeriod}
                  onValueChange={setEvaluationPeriod}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid-term">Mid-term</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium">Performance Ratings</h4>
              <RatingSlider
                label="Technical Skills"
                value={technicalSkills}
                onChange={setTechnicalSkills}
              />
              <RatingSlider
                label="Communication"
                value={communication}
                onChange={setCommunication}
              />
              <RatingSlider
                label="Teamwork"
                value={teamwork}
                onChange={setTeamwork}
              />
              <RatingSlider
                label="Punctuality"
                value={punctuality}
                onChange={setPunctuality}
              />
              <RatingSlider
                label="Initiative"
                value={initiative}
                onChange={setInitiative}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Strengths</Label>
                <Textarea
                  placeholder="What are the student's key strengths?"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Areas for Improvement</Label>
                <Textarea
                  placeholder="What areas need improvement?"
                  value={areasForImprovement}
                  onChange={(e) => setAreasForImprovement(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="Any additional feedback or observations..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewEvaluationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitEvaluation}
              disabled={!selectedStudent}
            >
              <FileText className="w-4 h-4" />
              Submit Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Evaluation Dialog */}
      <Dialog open={viewEvaluationOpen} onOpenChange={setViewEvaluationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Evaluation Details</DialogTitle>
            <DialogDescription>
              {selectedEvaluation && (
                <span>
                  {selectedEvaluation.student_name} •{" "}
                  {selectedEvaluation.period}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedEvaluation && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">
                    {selectedEvaluation.student_name}
                  </p>
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
                  <p className="text-caption text-muted-foreground">
                    Overall Rating
                  </p>
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
                  <div
                    key={item.label}
                    className="p-2 bg-secondary/30 rounded-lg"
                  >
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-caption text-muted-foreground">
                      {item.label}
                    </p>
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
                  <h4 className="text-sm font-medium mb-1">
                    Areas for Improvement
                  </h4>
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
                Submitted on{" "}
                {format(new Date(selectedEvaluation.date), "MMMM d, yyyy")}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
