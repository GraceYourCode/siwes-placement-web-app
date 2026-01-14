import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Header from "@/components/layout/header";
import MainContent from "@/components/students/logbook/main-content";

export default function Logbook() {
  return (
    <DashboardLayout
      role="student"
      userName="Adewale Johnson"
      userEmail="adewale@university.edu"
    >
      <div className="space-y-6">
        <Header
          header="Digital Logbook"
          description="Record and track your daily training activities"
          addDialogue
        />

        <MainContent />
      </div>
    </DashboardLayout>
  );
}
