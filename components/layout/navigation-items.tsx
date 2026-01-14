import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const roleNavItems: Record<string, NavItem[]> = {
  student: [
    { label: "Dashboard", href: "/student", icon: LayoutDashboard },
    { label: "Marketplace", href: "/student/marketplace", icon: Building2 },
    { label: "Applications", href: "/student/applications", icon: Briefcase },
    { label: "Logbook", href: "/student/logbook", icon: BookOpen },
    { label: "Schedule", href: "/student/schedule", icon: Calendar },
    { label: "Messages", href: "/student/messages", icon: MessageSquare },
  ],
  supervisor: [
    { label: "Dashboard", href: "/supervisor", icon: LayoutDashboard },
    { label: "Students", href: "/supervisor/students", icon: Users },
    {
      label: "Logbook Reviews",
      href: "/supervisor/logbooks",
      icon: ClipboardCheck,
    },
    { label: "Evaluations", href: "/supervisor/evaluations", icon: FileText },
    { label: "Schedule", href: "/supervisor/schedule", icon: Calendar },
    { label: "Reports", href: "/supervisor/reports", icon: BarChart3 },
  ],
  company: [
    { label: "Dashboard", href: "/company", icon: LayoutDashboard },
    { label: "Job Listings", href: "/company/listings", icon: Briefcase },
    { label: "Applications", href: "/company/applications", icon: FileText },
    { label: "Interns", href: "/company/interns", icon: Users },
    {
      label: "Evaluations",
      href: "/company/evaluations",
      icon: ClipboardCheck,
    },
    { label: "Messages", href: "/company/messages", icon: MessageSquare },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Companies", href: "/admin/companies", icon: Building2 },
    { label: "Supervisors", href: "/admin/supervisors", icon: Users },
    { label: "Placements", href: "/admin/placements", icon: Briefcase },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  ],
};

interface NavigationItemsProps {
  sidebarOpen: boolean;
  role: "student" | "supervisor" | "company" | "admin";
}

export default function NavigationItems(props: NavigationItemsProps) {
  const { role, sidebarOpen } = props;

  const navItems = roleNavItems[role];
  const pathname = usePathname();
  return (
    <nav className="p-3 space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("nav-link", isActive && "nav-link-active")}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
