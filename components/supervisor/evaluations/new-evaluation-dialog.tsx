import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { FileText } from "lucide-react";
import React, { useState } from "react";
import RatingSlider from "./rating-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Evaluation } from "./type";

interface NewEvaluationDialogProps {
  newEvaluationOpen: boolean;
  selectedStudent: string;
  studentsForEvaluation: Evaluation[];
  setSelectedStudent: React.Dispatch<React.SetStateAction<string>>;
  setNewEvaluationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NewEvaluationDialog(props: NewEvaluationDialogProps) {
  const {
    newEvaluationOpen,
    selectedStudent,
    setNewEvaluationOpen,
    setSelectedStudent,
    studentsForEvaluation,
  } = props;
  const [technicalSkills, setTechnicalSkills] = useState([4]);
  const [communication, setCommunication] = useState([4]);
  const [teamwork, setTeamwork] = useState([4]);
  const [punctuality, setPunctuality] = useState([4]);
  const [initiative, setInitiative] = useState([4]);
  const [strengths, setStrengths] = useState("");
  const [areasForImprovement, setAreasForImprovement] = useState("");
  const [comments, setComments] = useState("");
  const [evaluationPeriod, setEvaluationPeriod] = useState("mid-term");

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
  return (
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
          <Button variant="outline" onClick={() => setNewEvaluationOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitEvaluation} disabled={!selectedStudent}>
            <FileText className="w-4 h-4" />
            Submit Evaluation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
