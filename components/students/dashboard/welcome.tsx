/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Building2, FileText } from "lucide-react";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-heading-1">Welcome back, Adewale</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your SIWES placement
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/student/logbook">
            <FileText className="w-4 h-4" />
            New Entry
          </Link>
        </Button>
        <Button asChild>
          <Link href="/student/marketplace">
            <Building2 className="w-4 h-4" />
            Browse Companies
          </Link>
        </Button>
      </div>
    </div>
  );
}
