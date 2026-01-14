import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

const schedules = [
  {
    student: "Adewale Johnson",
    company: "TechCorp Nigeria",
    date: "Feb 15, 2024",
    time: "10:00 AM",
  },
  {
    student: "Ibrahim Musa",
    company: "Dangote Industries",
    date: "Feb 16, 2024",
    time: "2:00 PM",
  },
  {
    student: "Fatima Ahmed",
    company: "MTN Nigeria",
    date: "Feb 18, 2024",
    time: "11:00 AM",
  },
];

export default function UpcomingSchedule() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-3">Upcoming Site Visits</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/supervisor/schedule">
            <Calendar className="w-4 h-4 mr-1" />
            Full Schedule
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {schedules.map((visit, index) => (
          <div key={index} className="p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2 text-caption text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              {visit.date} at {visit.time}
            </div>
            <p className="font-medium">{visit.student}</p>
            <p className="text-caption text-muted-foreground">
              {visit.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
