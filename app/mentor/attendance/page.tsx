"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, Users, Clock, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/dashboard/data-table";

interface AttendanceRecord {
  id: string;
  studentId: string;
  name: string;
  matricNumber: string;
  status: string | null;
  checkIn: string | null;
  checkOut: string | null;
  remarks: string;
}
// Demo students
const students = [
  {
    id: "1",
    name: "Adewale Johnson",
    matricNumber: "2020/12345",
    institution: "University of Lagos",
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    matricNumber: "2020/23456",
    institution: "Covenant University",
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    matricNumber: "2020/34567",
    institution: "Ahmadu Bello University",
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    matricNumber: "2020/45678",
    institution: "University of Ibadan",
  },
  {
    id: "5",
    name: "Emeka Nwosu",
    matricNumber: "2020/56789",
    institution: "University of Nigeria",
  },
  {
    id: "6",
    name: "Amina Bello",
    matricNumber: "2020/67890",
    institution: "Bayero University",
  },
  {
    id: "7",
    name: "Oluwaseun Adeyemi",
    matricNumber: "2020/78901",
    institution: "Obafemi Awolowo University",
  },
];

// Demo attendance records for today
const initialAttendance: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "1",
    name: "Adewale Johnson",
    matricNumber: "2020/12345",
    status: "present",
    checkIn: "08:45",
    checkOut: null,
    remarks: "",
  },
  {
    id: "2",
    studentId: "2",
    name: "Chioma Okonkwo",
    matricNumber: "2020/23456",
    status: "present",
    checkIn: "09:00",
    checkOut: null,
    remarks: "",
  },
  {
    id: "3",
    studentId: "3",
    name: "Ibrahim Musa",
    matricNumber: "2020/34567",
    status: null,
    checkIn: null,
    checkOut: null,
    remarks: "",
  },
  {
    id: "4",
    studentId: "4",
    name: "Fatima Ahmed",
    matricNumber: "2020/45678",
    status: "late",
    checkIn: "10:15",
    checkOut: null,
    remarks: "Traffic delay",
  },
  {
    id: "5",
    studentId: "5",
    name: "Emeka Nwosu",
    matricNumber: "2020/56789",
    status: "present",
    checkIn: "08:50",
    checkOut: null,
    remarks: "",
  },
  {
    id: "6",
    studentId: "6",
    name: "Amina Bello",
    matricNumber: "2020/67890",
    status: null,
    checkIn: null,
    checkOut: null,
    remarks: "",
  },
  {
    id: "7",
    studentId: "7",
    name: "Oluwaseun Adeyemi",
    matricNumber: "2020/78901",
    status: "absent",
    checkIn: null,
    checkOut: null,
    remarks: "Sick leave",
  },
];

export default function CompanyAttendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [markDialogOpen, setMarkDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<AttendanceRecord | null>(null);
  const [markStatus, setMarkStatus] = useState<string>("");
  const [remarks, setRemarks] = useState("");

  const filteredAttendance = attendance.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.matricNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAttendance = (student: AttendanceRecord, status: string) => {
    if (status === "absent") {
      setSelectedStudent(student);
      setMarkStatus(status);
      setRemarks("");
      setMarkDialogOpen(true);
    } else {
      confirmMarkAttendance(student, status, "");
    }
  };

  const confirmMarkAttendance = (
    student: AttendanceRecord,
    status: string,
    remarkText: string
  ) => {
    const currentTime = format(new Date(), "HH:mm");
    setAttendance((prev) =>
      prev.map((record) =>
        record.studentId === student.studentId
          ? {
              ...record,
              status,
              checkIn: status !== "absent" ? currentTime : null,
              remarks: remarkText || record.remarks,
            }
          : record
      )
    );
    toast.success(`Marked ${student.name} as ${status}`);
    setMarkDialogOpen(false);
  };

  const handleCheckOut = (studentId: string) => {
    const currentTime = format(new Date(), "HH:mm");
    setAttendance((prev) =>
      prev.map((record) =>
        record.studentId === studentId
          ? { ...record, checkOut: currentTime }
          : record
      )
    );
    toast.success("Check-out time recorded");
  };

  const getStatusBadge = (status: string | null) => {
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
        return <Badge variant="secondary">Not Marked</Badge>;
    }
  };

  // Stats
  const presentCount = attendance.filter((a) => a.status === "present").length;
  const lateCount = attendance.filter((a) => a.status === "late").length;
  const absentCount = attendance.filter((a) => a.status === "absent").length;
  const notMarkedCount = attendance.filter((a) => a.status === null).length;

  const columns = [
    {
      header: "Student",
      accessor: (row: AttendanceRecord) => (
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
      header: "Status",
      accessor: (row: AttendanceRecord) => getStatusBadge(row.status),
    },
    {
      header: "Check In",
      accessor: (row: AttendanceRecord) => (
        <span className="text-muted-foreground">{row.checkIn || "-"}</span>
      ),
    },
    {
      header: "Check Out",
      accessor: (row: AttendanceRecord) => (
        <span className="text-muted-foreground">{row.checkOut || "-"}</span>
      ),
    },
    {
      header: "Remarks",
      accessor: (row: AttendanceRecord) => (
        <span className="text-muted-foreground text-sm">
          {row.remarks || "-"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: AttendanceRecord) => (
        <div className="flex items-center gap-2">
          {!row.status && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={() => handleMarkAttendance(row, "present")}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                onClick={() => handleMarkAttendance(row, "late")}
              >
                <Clock className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={() => handleMarkAttendance(row, "absent")}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
          {(row.status === "present" || row.status === "late") &&
            !row.checkOut && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCheckOut(row.studentId)}
              >
                Check Out
              </Button>
            )}
        </div>
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-heading-1">Attendance Management</h1>
            <p className="text-muted-foreground">
              Mark and manage student attendance records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {presentCount}
              </p>
              <p className="text-sm text-muted-foreground">Present</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              <p className="text-sm text-muted-foreground">Late</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">
                {absentCount}
              </p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{notMarkedCount}</p>
              <p className="text-sm text-muted-foreground">Not Marked</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Attendance for{" "}
              {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={filteredAttendance}
              emptyMessage="No students found"
            />
          </CardContent>
        </Card>
      </div>

      {/* Mark Absent Dialog */}
      <Dialog open={markDialogOpen} onOpenChange={setMarkDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Mark as Absent</DialogTitle>
            <DialogDescription>
              Add a remark for {selectedStudent?.name}&apos;s absence (optional)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter reason for absence (e.g., Sick leave, Personal emergency)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMarkDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedStudent &&
                confirmMarkAttendance(selectedStudent, markStatus, remarks)
              }
            >
              Mark Absent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
