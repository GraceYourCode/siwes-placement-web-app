import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Alerts() {
  return (
    <div className="card-elevated p-4 flex items-center gap-4 border-l-4 border-warning">
      <div className="p-2 rounded-lg bg-warning/10">
        <AlertCircle className="w-5 h-5 text-warning" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Action Required</p>
        <p className="text-caption text-muted-foreground">
          You have 12 logbook entries pending review
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/supervisor/logbooks">Review Now</Link>
      </Button>
    </div>
  );
}
