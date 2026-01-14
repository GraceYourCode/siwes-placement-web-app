import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
          <Building2 className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-heading-1">TechCorp Nigeria</h1>
          <p className="text-muted-foreground">Employer Dashboard</p>
        </div>
      </div>
      <Button asChild>
        <Link href="/company/listings/new">
          <Plus className="w-4 h-4" />
          Post New Position
        </Link>
      </Button>
    </div>
  );
}
