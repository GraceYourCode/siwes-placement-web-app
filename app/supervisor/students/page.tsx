"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";
import Header from "@/components/supervisor/header";
import { columns, demoStudents } from "@/components/supervisor/students/data";
import StatSection from "@/components/supervisor/students/stats";
import Filters from "@/components/supervisor/students/filters";

export default function SupervisorStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = demoStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || student.department === departmentFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && student.pendingEntries > 0) ||
      (statusFilter === "reviewed" && student.pendingEntries === 0);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Header
            heading="My Students"
            subtitle="View and manage students assigned to you"
          />

          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button asChild>
              <Link href="/supervisor/logbooks">
                <BookOpen className="w-4 h-4" />
                Review Logbooks
              </Link>
            </Button>
          </div>
        </div>

        <StatSection demoStudents={demoStudents} />
        <Filters
          demoStudents={demoStudents}
          departmentFilter={departmentFilter}
          searchQuery={searchQuery}
          setDepartmentFilter={setDepartmentFilter}
          setSearchQuery={setSearchQuery}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
        />

        <DataTable
          columns={columns}
          data={filteredStudents}
          onRowClick={(student) => {
            window.location.href = `/supervisor/students/${student.user_id}`;
          }}
          emptyMessage="No students found"
        />
      </div>
    </DashboardLayout>
  );
}
