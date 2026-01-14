"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SideBar from "./side-bar";
import MenuButton from "./menu-button";
import SearchBar from "./search-bar";
import ProfileDropdown from "./profile-dropdown";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "supervisor" | "company" | "admin";
  userName?: string;
  userEmail?: string;
}

export function DashboardLayout({
  children,
  role,
  userName = "John Doe",
  userEmail = "john@university.edu",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <SideBar
        mobileMenuOpen={mobileMenuOpen}
        role={role}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border shadow-soft">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <MenuButton
                setMobileMenuOpen={setMobileMenuOpen}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
              />
              <SearchBar />
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              <ProfileDropdown
                userEmail={userEmail}
                userName={userName}
                role={role}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
