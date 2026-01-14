import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function ResultsCount({ length }: { length: number }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-muted-foreground">
        Showing <span className="font-medium text-foreground">{length}</span>{" "}
        companies
      </p>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          <Filter className="w-4 h-4 mr-1" />
          More Filters
        </Button>
      </div>
    </div>
  );
}
