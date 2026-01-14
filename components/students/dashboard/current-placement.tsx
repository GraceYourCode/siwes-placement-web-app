import { StatusBadge } from "@/components/dashboard/status-badge";
import { Building2, Calendar, MapPin } from "lucide-react";
import ProgressBar from "./progress-bar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const currentPlacement = {
  company: "TechCorp Nigeria Ltd",
  position: "Software Development Intern",
  location: "Lagos, Nigeria",
  startDate: "Jan 15, 2024",
  endDate: "Apr 15, 2024",
  progress: 50,
};

export default function CurrentPlacement() {
  return (
    <div className="lg:col-span-2 card-elevated p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Current Placement</h2>
        <StatusBadge status="active" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0">
          <Building2 className="w-8 h-8 text-muted-foreground" />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              {currentPlacement.company}
            </h3>
            <p className="text-muted-foreground">{currentPlacement.position}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-caption">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {currentPlacement.location}
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {currentPlacement.startDate} - {currentPlacement.endDate}
            </div>
          </div>

          <ProgressBar progress={currentPlacement.progress} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/student/logbook">View Logbook</Link>
        </Button>
        <Button variant="outline" size="sm">
          Contact Supervisor
        </Button>
      </div>
    </div>
  );
}
