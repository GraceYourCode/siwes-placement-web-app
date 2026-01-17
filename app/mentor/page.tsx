"use client";

import { Button } from "@/components/ui/button";
import {
  Users,
  ClipboardCheck,
  Calendar,
  UserCheck,
  Building2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import Link from "next/link";

// Demo data
const stats = [
  {
    title: "Assigned Students",
    value: "7",
    change: "of 10 capacity",
    changeType: "neutral" as const,
    icon: Users,
    iconColor: "primary" as const,
  },
  {
    title: "Students Online",
    value: "5",
    change: "2 offline",
    changeType: "positive" as const,
    icon: Wifi,
    iconColor: "accent" as const,
  },
  {
    title: "Attendance Completion",
    value: "87%",
    change: "This month",
    changeType: "positive" as const,
    icon: Calendar,
    iconColor: "info" as const,
  },
  {
    title: "Logbook Reviews Pending",
    value: "4",
    change: "Action required",
    changeType: "negative" as const,
    icon: ClipboardCheck,
    iconColor: "warning" as const,
  },
];

const activities = [
  {
    id: "1",
    type: "logbook" as const,
    title: "New logbook entry",
    description: "Adewale Johnson submitted Week 6 entry",
    time: "30m ago",
  },
  {
    id: "2",
    type: "alert" as const,
    title: "Attendance marked",
    description: "5 students checked in today",
    time: "2h ago",
  },
  {
    id: "3",
    type: "logbook" as const,
    title: "Logbook reviewed",
    description: "Chioma Okonkwo - Week 5 approved",
    time: "4h ago",
  },
  {
    id: "4",
    type: "message" as const,
    title: "New message",
    description: "From: University Supervisor",
    time: "1d ago",
  },
];

const recentStudents = [
  {
    id: "1",
    name: "Adewale Johnson",
    institution: "University of Lagos",
    status: "online",
    pendingEntries: 2,
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    institution: "Covenant University",
    status: "online",
    pendingEntries: 0,
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    institution: "Ahmadu Bello University",
    status: "offline",
    pendingEntries: 1,
  },
  {
    id: "4",
    name: "Fatima Ahmed",
    institution: "University of Ibadan",
    status: "online",
    pendingEntries: 1,
  },
];

export default function CompanyDashboard() {
  const maxCapacity = 10;
  const assignedStudents = 7;
  const remainingSlots = maxCapacity - assignedStudents;
  const capacityPercentage = (assignedStudents / maxCapacity) * 100;

  return (
    <DashboardLayout
      role="company"
      userName="Mr. Tunde Bakare"
      userEmail="tunde@techcorp.ng"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <Building2 className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-heading-1">TechCorp Nigeria</h1>
              <p className="text-muted-foreground">Company Mentor Dashboard</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/mentor/attendance">
                <Calendar className="w-4 h-4" />
                Mark Attendance
              </Link>
            </Button>
            <Button asChild>
              <Link href="/mentor/logbooks">
                <ClipboardCheck className="w-4 h-4" />
                Review Logbooks
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Capacity Card */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Student Capacity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {assignedStudents} / {maxCapacity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Students assigned
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {remainingSlots}
                </p>
                <p className="text-sm text-muted-foreground">Slots remaining</p>
              </div>
            </div>
            <Progress value={capacityPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {capacityPercentage.toFixed(0)}% of your student capacity is
              utilized
            </p>
          </CardContent>
        </Card>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Students */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-heading-3">Your Students</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/mentor/students">View All</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recentStudents.map((student) => (
                <Card key={student.id} className="card-elevated">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-caption text-muted-foreground">
                            {student.institution}
                          </p>
                        </div>
                      </div>
                      {student.status === "online" ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <Wifi className="w-3 h-3" />
                          Online
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <WifiOff className="w-3 h-3" />
                          Offline
                        </div>
                      )}
                    </div>
                    {student.pendingEntries > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                          {student.pendingEntries} pending{" "}
                          {student.pendingEntries === 1 ? "entry" : "entries"}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <ActivityFeed activities={activities} />
        </div>
      </div>
    </DashboardLayout>
  );
}
