"use client";

import { useState } from "react";
import Entries from "./entries";
import WeekSelectorSidebar from "./week-selector-sidebar";

interface LogbookEntry {
  id: string;
  date: string;
  weekNumber: number;
  title: string;
  description: string;
  hours: number;
  status: "draft" | "pending" | "approved" | "rejected";
  supervisorComment?: string;
}

const entries: LogbookEntry[] = [
  {
    id: "1",
    date: "2024-02-12",
    weekNumber: 6,
    title: "Database Design Implementation",
    description:
      "Worked on designing the database schema for the new inventory management system. Created ER diagrams and normalized tables.",
    hours: 8,
    status: "approved",
    supervisorComment: "Excellent work on the normalization.",
  },
  {
    id: "2",
    date: "2024-02-11",
    weekNumber: 6,
    title: "Frontend Development",
    description:
      "Implemented responsive UI components using React and Tailwind CSS. Focused on the dashboard layout.",
    hours: 7,
    status: "approved",
  },
  {
    id: "3",
    date: "2024-02-09",
    weekNumber: 6,
    title: "API Integration",
    description:
      "Connected frontend components to backend REST APIs. Implemented error handling and loading states.",
    hours: 8,
    status: "pending",
  },
  {
    id: "4",
    date: "2024-02-08",
    weekNumber: 6,
    title: "Code Review Session",
    description:
      "Participated in team code review. Learned about best practices for clean code and documentation.",
    hours: 4,
    status: "pending",
  },
  {
    id: "5",
    date: "2024-02-07",
    weekNumber: 5,
    title: "Testing & Debugging",
    description:
      "Wrote unit tests for utility functions. Fixed bugs identified during QA testing.",
    hours: 6,
    status: "rejected",
    supervisorComment: "Please add more details about the specific bugs fixed.",
  },
];

export default function MainContent() {
  const [selectedWeek, setSelectedWeek] = useState(6);

  const weekEntries = entries.filter((e) => e.weekNumber === selectedWeek);
  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <WeekSelectorSidebar
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        weekEntries={weekEntries}
      />

      <Entries
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        weekEntries={weekEntries}
      />
    </div>
  );
}
