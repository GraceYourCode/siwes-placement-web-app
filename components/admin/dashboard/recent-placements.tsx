"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const recentPlacements = [
  {
    id: "1",
    student: "Adewale Johnson",
    matricNo: "2020/123456",
    company: "TechCorp Nigeria",
    department: "Computer Science",
    date: "Feb 10, 2024",
    status: "active" as const,
  },
  {
    id: "2",
    student: "Chioma Okonkwo",
    matricNo: "2020/123457",
    company: "First Bank",
    department: "Accounting",
    date: "Feb 9, 2024",
    status: "active" as const,
  },
  {
    id: "3",
    student: "Ibrahim Musa",
    matricNo: "2020/123458",
    company: "Dangote Industries",
    department: "Engineering",
    date: "Feb 8, 2024",
    status: "pending" as const,
  },
  {
    id: "4",
    student: "Fatima Ahmed",
    matricNo: "2020/123459",
    company: "MTN Nigeria",
    department: "Computer Science",
    date: "Feb 7, 2024",
    status: "active" as const,
  },
  {
    id: "5",
    student: "Emeka Nwosu",
    matricNo: "2020/123460",
    company: "Shell Petroleum",
    department: "Engineering",
    date: "Feb 6, 2024",
    status: "completed" as const,
  },
];

export default function RecentPlacements() {
  const placementColumns = [
    {
      header: "Student",
      accessor: (row: (typeof recentPlacements)[0]) => (
        <div>
          <p className="font-medium">{row.student}</p>
          <p className="text-caption text-muted-foreground">{row.matricNo}</p>
        </div>
      ),
    },
    { header: "Company", accessor: "company" as const },
    {
      header: "Department",
      accessor: "department" as const,
      className: "hidden lg:table-cell",
    },
    {
      header: "Date",
      accessor: "date" as const,
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      accessor: (row: (typeof recentPlacements)[0]) => (
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
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Recent Placements</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/placements">View All</Link>
        </Button>
      </div>
      <DataTable columns={placementColumns} data={recentPlacements} />
    </div>
  );
}
