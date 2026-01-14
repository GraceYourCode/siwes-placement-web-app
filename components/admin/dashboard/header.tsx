import { Button } from "@/components/ui/button";
import { BarChart3, Download } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-heading-1">Institution Dashboard</h1>
        <p className="text-muted-foreground">
          SIWES Program Administration Overview
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button asChild>
          <Link href="/admin/reports">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
}
