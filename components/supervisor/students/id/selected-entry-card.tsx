import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { DemoLogBookEntry } from "../type";

interface SelectedEntryCardProps {
  selectedEntry: DemoLogBookEntry;
  reviewComment: string;
  reviewRating: string;
  setReviewComment: React.Dispatch<React.SetStateAction<string>>;
  setReviewRating: React.Dispatch<React.SetStateAction<string>>;
  setReviewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SelectedEntryCard(props: SelectedEntryCardProps) {
  const {
    reviewComment,
    reviewRating,
    selectedEntry,
    setReviewComment,
    setReviewRating,
    setReviewDialogOpen,
  } = props;

  const handleSubmitReview = (isApproved: boolean) => {
    setReviewDialogOpen(false);
  };
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-1">Activity Summary</h4>
        <p className="text-sm text-muted-foreground">
          {selectedEntry.activity_summary}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Hours Worked</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEntry.hours_worked} hours
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Status</h4>
          <StatusBadge status={selectedEntry.status} />
        </div>
      </div>

      {selectedEntry.skills_learned && (
        <div>
          <h4 className="text-sm font-medium mb-1">Skills Learned</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEntry.skills_learned}
          </p>
        </div>
      )}

      {selectedEntry.challenges && (
        <div>
          <h4 className="text-sm font-medium mb-1">Challenges</h4>
          <p className="text-sm text-muted-foreground">
            {selectedEntry.challenges}
          </p>
        </div>
      )}

      {selectedEntry.status === "pending" && (
        <>
          <div className="border-t pt-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <Select value={reviewRating} onValueChange={setReviewRating}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Review Comment
              </label>
              <Textarea
                placeholder="Add your feedback for this entry..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleSubmitReview(false)}>
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
            <Button onClick={() => handleSubmitReview(true)}>
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
          </DialogFooter>
        </>
      )}
    </div>
  );
}
