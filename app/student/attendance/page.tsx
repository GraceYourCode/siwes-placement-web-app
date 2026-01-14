"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { LoadingState } from "@/components/dashboard/LoadingState";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  parseISO,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

interface AttendanceRecord {
  id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: "present" | "absent" | "late" | "excused";
  notes: string | null;
}

export default function Attendance() {
  const profile = {
    full_name: "Enoch Tofunmi",
    email: "me@mail.com",
  };
  const placement = "some";
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "absent":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "late":
        return <Clock className="w-4 h-4 text-warning" />;
      case "excused":
        return <AlertCircle className="w-4 h-4 text-info" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success/10 text-success border-success/20";
      case "absent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "late":
        return "bg-warning/10 text-warning border-warning/20";
      case "excused":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted";
    }
  };

  const getStats = () => {
    return {
      present: attendance.filter((a) => a.status === "present").length,
      absent: attendance.filter((a) => a.status === "absent").length,
      late: attendance.filter((a) => a.status === "late").length,
      excused: attendance.filter((a) => a.status === "excused").length,
    };
  };

  const stats = getStats();
  const attendanceRate =
    attendance.length > 0
      ? ((stats.present + stats.late) / attendance.length) * 100
      : 0;

  // Calendar generation
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getAttendanceForDate = (date: Date) => {
    return attendance.find((a) => a.date === format(date, "yyyy-MM-dd"));
  };

  //   if (loading) {
  //     return (
  //       <DashboardLayout
  //         role="student"
  //         userName={profile?.full_name}
  //         userEmail={profile?.email}
  //       >
  //         <LoadingState message="Loading attendance..." />
  //       </DashboardLayout>
  //     );
  //   }

  return (
    <DashboardLayout
      role="student"
      userName={profile?.full_name}
      userEmail={profile?.email}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-heading-1">Attendance</h1>
          <p className="text-muted-foreground">View your attendance records</p>
        </div>

        {!placement ? (
          <EmptyState
            icon={Calendar}
            title="No Active Placement"
            description="Attendance records will appear here once you have an active placement."
          />
        ) : (
          <>
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {attendanceRate.toFixed(0)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Attendance Rate
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-success" />
                    <div>
                      <p className="text-2xl font-semibold">{stats.present}</p>
                      <p className="text-sm text-muted-foreground">Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-destructive" />
                    <div>
                      <p className="text-2xl font-semibold">{stats.absent}</p>
                      <p className="text-sm text-muted-foreground">Absent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-warning" />
                    <div>
                      <p className="text-2xl font-semibold">{stats.late}</p>
                      <p className="text-sm text-muted-foreground">Late</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-info" />
                    <div>
                      <p className="text-2xl font-semibold">{stats.excused}</p>
                      <p className="text-sm text-muted-foreground">Excused</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar View */}
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-muted-foreground py-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the month starts */}
                  {Array.from({ length: (monthDays[0].getDay() + 6) % 7 }).map(
                    (_, i) => (
                      <div key={`empty-${i}`} className="h-12" />
                    )
                  )}
                  {monthDays.map((day) => {
                    const record = getAttendanceForDate(day);
                    return (
                      <div
                        key={day.toISOString()}
                        className={cn(
                          "h-12 rounded-lg flex flex-col items-center justify-center text-sm border",
                          isToday(day) && "ring-2 ring-primary",
                          record ? getStatusColor(record.status) : "bg-muted/50"
                        )}
                      >
                        <span
                          className={cn(
                            "font-medium",
                            isToday(day) && "text-primary"
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        {record && getStatusIcon(record.status)}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded bg-success/20" />
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded bg-destructive/20" />
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded bg-warning/20" />
                    <span>Late</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded bg-info/20" />
                    <span>Excused</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Records */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Records</CardTitle>
              </CardHeader>
              <CardContent>
                {attendance.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No attendance records for this month
                  </p>
                ) : (
                  <div className="space-y-2">
                    {attendance
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(record.status)}
                            <div>
                              <p className="font-medium">
                                {format(parseISO(record.date), "EEEE, MMM d")}
                              </p>
                              {(record.check_in || record.check_out) && (
                                <p className="text-sm text-muted-foreground">
                                  {record.check_in && `In: ${record.check_in}`}
                                  {record.check_in && record.check_out && " • "}
                                  {record.check_out &&
                                    `Out: ${record.check_out}`}
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium capitalize",
                              record.status === "present" && "text-success",
                              record.status === "absent" && "text-destructive",
                              record.status === "late" && "text-warning",
                              record.status === "excused" && "text-info"
                            )}
                          >
                            {record.status}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
