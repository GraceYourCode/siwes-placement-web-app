"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search, Wifi, WifiOff, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";

// Demo data
const students = [
  {
    id: "1",
    name: "Adewale Johnson",
    matricNumber: "2020/12345",
    institution: "University of Lagos",
    department: "Computer Science",
    placementStatus: "verified" as const,
    attendancePercentage: 95,
    logbookStatus: "pending" as const,
    isOnline: true,
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    matricNumber: "2020/23456",
    institution: "Covenant University",
    department: "Information Technology",
    placementStatus: "verified" as const,
    attendancePercentage: 88,
    logbookStatus: "approved" as const,
    isOnline: true,
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    matricNumber: "2020/34567",
    institution: "Ahmadu Bello University",
    department: "Computer Engineering",
    placementStatus: "verified" as const,
    attendancePercentage: 72,
    logbookStatus: "pending" as const,
    isOnline: false,
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    matricNumber: "2020/45678",
    institution: "University of Ibadan",
    department: "Software Engineering",
    placementStatus: "verified" as const,
    attendancePercentage: 90,
    logbookStatus: "rejected" as const,
    isOnline: true,
  },
  {
    id: "5",
    name: "Emeka Nwosu",
    matricNumber: "2020/56789",
    institution: "University of Nigeria",
    department: "Computer Science",
    placementStatus: "verified" as const,
    attendancePercentage: 85,
    logbookStatus: "approved" as const,
    isOnline: true,
  },
  {
    id: "6",
    name: "Amina Bello",
    matricNumber: "2020/67890",
    institution: "Bayero University",
    department: "Information Systems",
    placementStatus: "verified" as const,
    attendancePercentage: 92,
    logbookStatus: "pending" as const,
    isOnline: false,
  },
  {
    id: "7",
    name: "Oluwaseun Adeyemi",
    matricNumber: "2020/78901",
    institution: "Obafemi Awolowo University",
    department: "Computer Science",
    placementStatus: "verified" as const,
    attendancePercentage: 78,
    logbookStatus: "approved" as const,
    isOnline: true,
  },
];

type Student = (typeof students)[0];

export default function CompanyStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "online" && student.isOnline) ||
      (statusFilter === "offline" && !student.isOnline);

    return matchesSearch && matchesStatus;
  });

  const getAttendanceBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return "default";
    if (percentage >= 75) return "secondary";
    return "destructive";
  };

  const columns = [
    {
      header: "Student",
      accessor: (row: Student) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-caption text-muted-foreground">
              {row.matricNumber}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Institution",
      accessor: (row: Student) => (
        <div>
          <p className="font-medium">{row.institution}</p>
          <p className="text-caption text-muted-foreground">{row.department}</p>
        </div>
      ),
    },
    {
      header: "Placement",
      accessor: (row: Student) => <StatusBadge status={row.placementStatus} />,
    },
    {
      header: "Attendance",
      accessor: (row: Student) => (
        <Badge variant={getAttendanceBadgeVariant(row.attendancePercentage)}>
          {row.attendancePercentage}%
        </Badge>
      ),
    },
    {
      header: "Logbook",
      accessor: (row: Student) => <StatusBadge status={row.logbookStatus} />,
    },
    {
      header: "Status",
      accessor: (row: Student) =>
        row.isOnline ? (
          <div className="flex items-center gap-1 text-sm text-green-600">
            <Wifi className="w-4 h-4" />
            Online
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <WifiOff className="w-4 h-4" />
            Offline
          </div>
        ),
    },
    {
      header: "",
      accessor: (row: Student) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/mentor/students/${row.id}`}>
            <Eye className="w-4 h-4" />
          </Link>
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <DashboardLayout
      role="company"
      userName="Mr. Tunde Bakare"
      userEmail="tunde@techcorp.ng"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-heading-1">Assigned Students</h1>
          <p className="text-muted-foreground">
            Manage and monitor students placed under your supervision
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, institution, or matric number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold">{students.length}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">
              {students.filter((s) => s.isOnline).length}
            </p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-warning">
              {students.filter((s) => s.logbookStatus === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Logbooks</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold">
              {Math.round(
                students.reduce((acc, s) => acc + s.attendancePercentage, 0) /
                  students.length
              )}
              %
            </p>
            <p className="text-sm text-muted-foreground">Avg. Attendance</p>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredStudents}
          emptyMessage="No students found matching your criteria"
        />
      </div>
    </DashboardLayout>
  );
}
