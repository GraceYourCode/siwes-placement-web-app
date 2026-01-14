import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Send } from "lucide-react";

export interface NewEntryDialogueProps {
  isNewEntryOpen: boolean;
  setIsNewEntryOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewEntryDialogue(props: NewEntryDialogueProps) {
  const { isNewEntryOpen, setIsNewEntryOpen } = props;

  return (
    <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Logbook Entry</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours Worked</Label>
              <Input
                id="hours"
                type="number"
                placeholder="8"
                className="h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title</Label>
            <Input
              id="title"
              placeholder="What did you work on?"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your activities in detail..."
              className="min-h-30 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsNewEntryOpen(false)}
            >
              Save Draft
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4" />
              Submit Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
