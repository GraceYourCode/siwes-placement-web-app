"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const students = [
  {
    id: "1",
    name: "Adewale Johnson",
    matricNo: "2020/123456",
    company: "TechCorp Nigeria",
    progress: 50,
    pendingEntries: 3,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    matricNo: "2020/123457",
    company: "First Bank",
    progress: 65,
    pendingEntries: 0,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    matricNo: "2020/123458",
    company: "Dangote Industries",
    progress: 40,
    pendingEntries: 5,
    status: "active" as const,
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    matricNo: "2020/123459",
    company: "MTN Nigeria",
    progress: 75,
    pendingEntries: 1,
    status: "active" as const,
  },
  {
    id: "5",
    name: "Emeka Nwosu",
    matricNo: "2020/123460",
    company: "Shell Petroleum",
    progress: 30,
    pendingEntries: 0,
    status: "active" as const,
  },
];

export default function AssignedStudents() {
  const columns = [
    {
      header: "Student",
      accessor: (row: (typeof students)[0]) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-caption text-muted-foreground">{row.matricNo}</p>
        </div>
      ),
    },
    { header: "Company", accessor: "company" as const },
    {
      header: "Progress",
      accessor: (row: (typeof students)[0]) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${row.progress}%` }}
            />
          </div>
          <span className="text-caption text-muted-foreground">
            {row.progress}%
          </span>
        </div>
      ),
    },
    {
      header: "Pending",
      accessor: (row: (typeof students)[0]) =>
        row.pendingEntries > 0 ? (
          <span className="status-badge bg-warning/10 text-warning">
            {row.pendingEntries} entries
          </span>
        ) : (
          <span className="text-caption text-muted-foreground">None</span>
        ),
    },
    {
      header: "Status",
      accessor: (row: (typeof students)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: "",
      accessor: (row: (typeof students)[0]) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/supervisor/students/${row.id}`}>
            <Eye className="w-4 h-4 mr-1" />
            View
          </Link>
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-heading-3">Assigned Students</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/supervisor/students">View All</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={students} />
    </div>
  );
}
