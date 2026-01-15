import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { DemoLogBookEntry } from "../type";
import SelectedEntryCard from "./selected-entry-card";

interface ReviewDialogProps {
  selectedEntry: DemoLogBookEntry | null;
  reviewDialogOpen: boolean;
  reviewComment: string;
  reviewRating: string;
  setReviewComment: React.Dispatch<React.SetStateAction<string>>;
  setReviewRating: React.Dispatch<React.SetStateAction<string>>;
  setReviewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ReviewDialog(props: ReviewDialogProps) {
  const {
    selectedEntry,
    reviewDialogOpen,
    setReviewDialogOpen,
    reviewComment,
    reviewRating,
    setReviewComment,
    setReviewRating,
  } = props;
  return (
    <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Logbook Entry</DialogTitle>
          <DialogDescription>
            {selectedEntry &&
              format(new Date(selectedEntry.entry_date), "EEEE, MMMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>

        {selectedEntry && (
          <SelectedEntryCard
            reviewComment={reviewComment}
            reviewRating={reviewRating}
            selectedEntry={selectedEntry}
            setReviewComment={setReviewComment}
            setReviewDialogOpen={setReviewDialogOpen}
            setReviewRating={setReviewRating}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
