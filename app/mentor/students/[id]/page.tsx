"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Building2,
  Calendar,
  BookOpen,
  MapPin,
  Wifi,
  WifiOff,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { DataTable } from "@/components/dashboard/data-table";

// Demo student data
const studentData = {
  id: "1",
  name: "Adewale Johnson",
  matricNumber: "2020/12345",
  email: "adewale.johnson@student.unilag.edu.ng",
  phone: "+234 801 234 5678",
  institution: "University of Lagos",
  department: "Computer Science",
  level: "400 Level",
  isOnline: true,
  placement: {
    company: "TechCorp Nigeria",
    position: "Software Developer Intern",
    department: "Engineering",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "verified" as const,
  },
};

// Demo attendance data
const attendanceData = [
  {
    id: "1",
    date: "2024-02-12",
    checkIn: "08:45",
    checkOut: "17:00",
    status: "present" as const,
    remarks: "",
  },
  {
    id: "2",
    date: "2024-02-11",
    checkIn: "09:00",
    checkOut: "17:30",
    status: "present" as const,
    remarks: "",
  },
  {
    id: "3",
    date: "2024-02-10",
    checkIn: null,
    checkOut: null,
    status: "absent" as const,
    remarks: "Sick leave",
  },
  {
    id: "4",
    date: "2024-02-09",
    checkIn: "08:30",
    checkOut: "17:00",
    status: "present" as const,
    remarks: "",
  },
  {
    id: "5",
    date: "2024-02-08",
    checkIn: "10:15",
    checkOut: "17:00",
    status: "late" as const,
    remarks: "Traffic",
  },
  {
    id: "6",
    date: "2024-02-07",
    checkIn: "08:50",
    checkOut: "17:00",
    status: "present" as const,
    remarks: "",
  },
  {
    id: "7",
    date: "2024-02-06",
    checkIn: "09:00",
    checkOut: "17:00",
    status: "present" as const,
    remarks: "",
  },
];

// Demo logbook data
const logbookData = [
  {
    id: "1",
    date: "2024-02-12",
    title: "API Integration",
    description:
      "Worked on integrating third-party payment API with the e-commerce platform. Implemented error handling and transaction logging.",
    hoursWorked: 8,
    status: "pending" as const,
    skillsLearned: "REST API, Error Handling, Payment Integration",
  },
  {
    id: "2",
    date: "2024-02-11",
    title: "Database Optimization",
    description:
      "Optimized database queries for the user dashboard. Reduced query time by 40% using proper indexing.",
    hoursWorked: 7,
    status: "approved" as const,
    skillsLearned: "PostgreSQL, Query Optimization, Indexing",
  },
  {
    id: "3",
    date: "2024-02-09",
    title: "Code Review Session",
    description:
      "Participated in team code review. Learned about best practices for clean code and documentation.",
    hoursWorked: 6,
    status: "approved" as const,
    skillsLearned: "Code Review, Clean Code, Documentation",
  },
  {
    id: "4",
    date: "2024-02-08",
    title: "Frontend Development",
    description:
      "Built responsive components for the admin dashboard using React and Tailwind CSS.",
    hoursWorked: 8,
    status: "pending" as const,
    skillsLearned: "React, Tailwind CSS, Responsive Design",
  },
  {
    id: "5",
    date: "2024-02-07",
    title: "Team Meeting & Sprint Planning",
    description:
      "Attended weekly sprint planning meeting. Assigned tasks for the upcoming sprint.",
    hoursWorked: 5,
    status: "rejected" as const,
    skillsLearned: "Agile, Sprint Planning, Team Collaboration",
  },
];

type AttendanceRecord = (typeof attendanceData)[0];
type LogbookEntry = (typeof logbookData)[0];

export default function CompanyStudentDetail() {
  const [activeTab, setActiveTab] = useState("attendance");

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Present
          </Badge>
        );
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      case "late":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            Late
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const attendanceColumns = [
    {
      header: "Date",
      accessor: (row: AttendanceRecord) =>
        format(new Date(row.date), "EEE, MMM d, yyyy"),
    },
    {
      header: "Check In",
      accessor: (row: AttendanceRecord) => row.checkIn || "-",
    },
    {
      header: "Check Out",
      accessor: (row: AttendanceRecord) => row.checkOut || "-",
    },
    {
      header: "Status",
      accessor: (row: AttendanceRecord) => getAttendanceStatusBadge(row.status),
    },
    {
      header: "Remarks",
      accessor: (row: AttendanceRecord) => (
        <span className="text-muted-foreground">{row.remarks || "-"}</span>
      ),
    },
  ];

  const logbookColumns = [
    {
      header: "Date",
      accessor: (row: LogbookEntry) =>
        format(new Date(row.date), "MMM d, yyyy"),
    },
    {
      header: "Title",
      accessor: (row: LogbookEntry) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-caption text-muted-foreground line-clamp-1">
            {row.description}
          </p>
        </div>
      ),
    },
    {
      header: "Hours",
      accessor: (row: LogbookEntry) => (
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted-foreground" />
          {row.hoursWorked}h
        </div>
      ),
    },
    {
      header: "Skills",
      accessor: (row: LogbookEntry) => (
        <p className="text-caption text-muted-foreground line-clamp-1">
          {row.skillsLearned}
        </p>
      ),
    },
    {
      header: "Status",
      accessor: (row: LogbookEntry) => <StatusBadge status={row.status} />,
    },
    {
      header: "",
      accessor: (row: LogbookEntry) => (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/mentor/logbooks?entry=${row.id}`}>Review</Link>
        </Button>
      ),
      className: "text-right",
    },
  ];

  // Calculate attendance stats
  const presentDays = attendanceData.filter(
    (a) => a.status === "present"
  ).length;
  const lateDays = attendanceData.filter((a) => a.status === "late").length;
  const absentDays = attendanceData.filter((a) => a.status === "absent").length;
  const attendancePercentage = Math.round(
    ((presentDays + lateDays) / attendanceData.length) * 100
  );

  // Calculate logbook stats
  const totalHours = logbookData.reduce(
    (acc, entry) => acc + entry.hoursWorked,
    0
  );
  const pendingEntries = logbookData.filter(
    (e) => e.status === "pending"
  ).length;

  return (
    <DashboardLayout
      role="company"
      userName="Mr. Tunde Bakare"
      userEmail="tunde@techcorp.ng"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/mentor/students">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Link>
        </Button>

        {/* Student Profile Header */}
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-heading-1">{studentData.name}</h1>
                      {studentData.isOnline ? (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Wifi className="w-4 h-4" />
                          Online
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <WifiOff className="w-4 h-4" />
                          Offline
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {studentData.matricNumber}
                    </p>
                  </div>
                  <StatusBadge status={studentData.placement.status} />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {studentData.institution}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {studentData.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {studentData.placement.position}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {studentData.placement.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {format(
                          new Date(studentData.placement.startDate),
                          "MMM d"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(studentData.placement.endDate),
                          "MMM d, yyyy"
                        )}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        Placement Duration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{studentData.level}</p>
                      <p className="text-caption text-muted-foreground">
                        Academic Level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="attendance">
              <Calendar className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="logbook">
              <BookOpen className="w-4 h-4 mr-2" />
              Logbook
            </TabsTrigger>
            <TabsTrigger value="placement">
              <Building2 className="w-4 h-4 mr-2" />
              Placement Info
            </TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            {/* Attendance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{attendancePercentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    Attendance Rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {presentDays}
                  </p>
                  <p className="text-sm text-muted-foreground">Present</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {lateDays}
                  </p>
                  <p className="text-sm text-muted-foreground">Late</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-destructive">
                    {absentDays}
                  </p>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{attendanceData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Days</p>
                </CardContent>
              </Card>
            </div>

            <DataTable
              columns={attendanceColumns}
              data={attendanceData}
              emptyMessage="No attendance records found"
            />
          </TabsContent>

          {/* Logbook Tab */}
          <TabsContent value="logbook" className="space-y-4">
            {/* Logbook Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{logbookData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold">{totalHours}h</p>
                  <p className="text-sm text-muted-foreground">Hours Logged</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-warning">
                    {pendingEntries}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pending Review
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {logbookData.filter((e) => e.status === "approved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </CardContent>
              </Card>
            </div>

            <DataTable
              columns={logbookColumns}
              data={logbookData}
              emptyMessage="No logbook entries found"
            />
          </TabsContent>

          {/* Placement Info Tab */}
          <TabsContent value="placement" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">
                      {studentData.placement.company}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">
                      {studentData.placement.position}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">
                      {studentData.placement.department}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">
                      {format(
                        new Date(studentData.placement.startDate),
                        "MMMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">
                      {format(
                        new Date(studentData.placement.endDate),
                        "MMMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={studentData.placement.status} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Full Name</span>
                    <span className="font-medium">{studentData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Matric Number</span>
                    <span className="font-medium">
                      {studentData.matricNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{studentData.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{studentData.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Institution</span>
                    <span className="font-medium">
                      {studentData.institution}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">
                      {studentData.department}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
