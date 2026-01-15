import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  name: string;
  matricNo: string;
}
export default function Header({ name, matricNo }: HeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/supervisor/students">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </Button>
      <div className="flex-1">
        <h1 className="text-heading-1">{name}</h1>
        <p className="text-muted-foreground">{matricNo}</p>
      </div>
      <Button variant="outline" asChild>
        <Link href={`/supervisor/evaluations/new?student=2`}>
          <Star className="w-4 h-4" />
          Add Evaluation
        </Link>
      </Button>
    </div>
  );
}
