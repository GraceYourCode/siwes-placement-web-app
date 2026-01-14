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
import {
  Search,
  Eye,
  Download,
  Users,
  Filter,
  BookOpen,
  Calendar,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";

// Demo data for students
const demoStudents = [
  {
    id: "1",
    user_id: "user-1",
    name: "Adewale Johnson",
    matricNo: "2020/123456",
    email: "adewale.johnson@student.edu",
    company: "TechCorp Nigeria Ltd",
    department: "Computer Science",
    progress: 65,
    pendingEntries: 3,
    totalEntries: 24,
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "active" as const,
  },
  {
    id: "2",
    user_id: "user-2",
    name: "Chioma Okonkwo",
    matricNo: "2020/123457",
    email: "chioma.okonkwo@student.edu",
    company: "First Bank Nigeria Plc",
    department: "Computer Science",
    progress: 78,
    pendingEntries: 0,
    totalEntries: 28,
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    status: "active" as const,
  },
  {
    id: "3",
    user_id: "user-3",
    name: "Ibrahim Musa",
    matricNo: "2020/123458",
    email: "ibrahim.musa@student.edu",
    company: "Dangote Industries",
    department: "Electrical Engineering",
    progress: 45,
    pendingEntries: 5,
    totalEntries: 18,
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    status: "active" as const,
  },
  {
    id: "4",
    user_id: "user-4",
    name: "Fatima Ahmed",
    matricNo: "2020/123459",
    email: "fatima.ahmed@student.edu",
    company: "MTN Nigeria Communications",
    department: "Electrical Engineering",
    progress: 82,
    pendingEntries: 1,
    totalEntries: 32,
    startDate: "2024-01-08",
    endDate: "2024-06-08",
    status: "active" as const,
  },
  {
    id: "5",
    user_id: "user-5",
    name: "Emeka Nwosu",
    matricNo: "2020/123460",
    email: "emeka.nwosu@student.edu",
    company: "Shell Petroleum Development",
    department: "Chemical Engineering",
    progress: 35,
    pendingEntries: 0,
    totalEntries: 14,
    startDate: "2024-02-15",
    endDate: "2024-07-15",
    status: "active" as const,
  },
  {
    id: "6",
    user_id: "user-6",
    name: "Amina Bello",
    matricNo: "2020/123461",
    email: "amina.bello@student.edu",
    company: "Nestle Nigeria Plc",
    department: "Food Technology",
    progress: 55,
    pendingEntries: 2,
    totalEntries: 22,
    startDate: "2024-01-20",
    endDate: "2024-06-20",
    status: "active" as const,
  },
  {
    id: "7",
    user_id: "user-7",
    name: "Oluwaseun Adeyemi",
    matricNo: "2020/123462",
    email: "oluwaseun.adeyemi@student.edu",
    company: "Chevron Nigeria Limited",
    department: "Mechanical Engineering",
    progress: 90,
    pendingEntries: 0,
    totalEntries: 36,
    startDate: "2024-01-05",
    endDate: "2024-06-05",
    status: "completed" as const,
  },
  {
    id: "8",
    user_id: "user-8",
    name: "Grace Eze",
    matricNo: "2020/123463",
    email: "grace.eze@student.edu",
    company: "Nigerian Breweries Plc",
    department: "Microbiology",
    progress: 60,
    pendingEntries: 4,
    totalEntries: 24,
    startDate: "2024-01-25",
    endDate: "2024-06-25",
    status: "active" as const,
  },
];

export default function SupervisorStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const departments = [...new Set(demoStudents.map((s) => s.department))];

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

  const columns = [
    {
      header: "Student",
      accessor: (row: (typeof demoStudents)[0]) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-caption text-muted-foreground">{row.matricNo}</p>
        </div>
      ),
    },
    {
      header: "Company",
      accessor: "company" as const,
      className: "hidden md:table-cell",
    },
    {
      header: "Department",
      accessor: "department" as const,
      className: "hidden lg:table-cell",
    },
    {
      header: "Progress",
      accessor: (row: (typeof demoStudents)[0]) => (
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
      accessor: (row: (typeof demoStudents)[0]) =>
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
      accessor: (row: (typeof demoStudents)[0]) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: "",
      accessor: (row: (typeof demoStudents)[0]) => (
        <div className="flex items-center gap-1 justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/supervisor/students/${row.user_id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/supervisor/students/${row.user_id}/logbook`}>
              <BookOpen className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  const totalPending = demoStudents.reduce(
    (sum, s) => sum + s.pendingEntries,
    0
  );
  const totalEntries = demoStudents.reduce((sum, s) => sum + s.totalEntries, 0);

  return (
    <DashboardLayout
      role="supervisor"
      userName="Dr. Ngozi Adebayo"
      userEmail="ngozi.adebayo@university.edu"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-heading-1">My Students</h1>
            <p className="text-muted-foreground">
              View and manage students assigned to you
            </p>
          </div>
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

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">
                Total Students
              </p>
              <p className="text-heading-3">{demoStudents.length}</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <BookOpen className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">
                Pending Reviews
              </p>
              <p className="text-heading-3">{totalPending}</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">
                Total Entries
              </p>
              <p className="text-heading-3">{totalEntries}</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Calendar className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Site Visits</p>
              <p className="text-heading-3">3</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, matric no, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="pending">Has Pending</SelectItem>
              <SelectItem value="reviewed">All Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
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
