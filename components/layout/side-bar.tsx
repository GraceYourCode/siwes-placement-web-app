import { cn } from "@/lib/utils";
import { Briefcase, Settings, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import NavigationItems from "./navigation-items";

interface SideBarProps {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  role: "student" | "supervisor" | "company" | "admin";
}

export default function SideBar(props: SideBarProps) {
  const { sidebarOpen, mobileMenuOpen, setMobileMenuOpen, role } = props;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-full bg-sidebar transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-20",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <span className="text-lg font-semibold text-sidebar-foreground">
              SIWES Portal
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <NavigationItems role={role} sidebarOpen={sidebarOpen} />

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
        <Link href="/settings" className="nav-link">
          <Settings className="w-5 h-5" />
          {sidebarOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
