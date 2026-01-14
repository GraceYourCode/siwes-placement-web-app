"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const applications = [
  {
    id: "1",
    name: "Adewale Johnson",
    university: "University of Lagos",
    position: "Software Developer Intern",
    date: "Feb 10, 2024",
    status: "pending" as const,
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    university: "Covenant University",
    position: "Data Analyst Intern",
    date: "Feb 9, 2024",
    status: "pending" as const,
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    university: "Ahmadu Bello University",
    position: "Software Developer Intern",
    date: "Feb 8, 2024",
    status: "approved" as const,
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    university: "University of Ibadan",
    position: "UI/UX Design Intern",
    date: "Feb 7, 2024",
    status: "rejected" as const,
  },
  {
    id: "5",
    name: "Emeka Nwosu",
    university: "University of Nigeria",
    position: "Software Developer Intern",
    date: "Feb 6, 2024",
    status: "approved" as const,
  },
];

export default function RecentApplications() {
  const applicationColumns = [
    {
      header: "Applicant",
      accessor: (row: (typeof applications)[0]) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-caption text-muted-foreground">{row.university}</p>
        </div>
      ),
    },
    { header: "Position", accessor: "position" as const },
    {
      header: "Date",
      accessor: "date" as const,
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      accessor: (row: (typeof applications)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: "",
      accessor: () => (
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4" />
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Recent Applications</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/company/applications">View All</Link>
        </Button>
      </div>
      <DataTable columns={applicationColumns} data={applications} />
    </div>
  );
}
