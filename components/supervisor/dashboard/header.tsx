import { Button } from "@/components/ui/button";
import { CheckCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-heading-1">Supervisor Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor student progress and review logbook entries
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/supervisor/logbooks">
            <FileText className="w-4 h-4" />
            Review Logbooks
          </Link>
        </Button>
        <Button asChild>
          <Link href="/supervisor/evaluations">
            <CheckCircle className="w-4 h-4" />
            Evaluations
          </Link>
        </Button>
      </div>
    </div>
  );
}
