import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

const listings = [
  {
    id: "1",
    title: "Software Developer Intern",
    department: "Engineering",
    applicants: 15,
    status: "active" as const,
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    department: "Analytics",
    applicants: 8,
    status: "active" as const,
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    department: "Design",
    applicants: 5,
    status: "active" as const,
  },
  {
    id: "4",
    title: "Project Management Intern",
    department: "Operations",
    applicants: 0,
    status: "draft" as const,
  },
];

export default function ActiveListing() {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Active Listings</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/company/listings">Manage All</Link>
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="card-elevated p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-caption text-muted-foreground">
                  {listing.department}
                </p>
              </div>
              <StatusBadge status={listing.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-foreground">
                {listing.applicants} applicants
              </span>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
