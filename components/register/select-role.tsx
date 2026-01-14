import { UserRole } from "@/app/(auth)/register/page";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Shield, User, Users } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SelectRoleProps {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole | null>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ElementType;
}

const roleOptions: RoleOption[] = [
  {
    id: "student",
    label: "Student",
    description: "Looking for placement",
    icon: User,
  },
  {
    id: "supervisor",
    label: "Supervisor",
    description: "Coordinate & evaluate",
    icon: Users,
  },
  {
    id: "company",
    label: "Company",
    description: "Offer placements",
    icon: Building2,
  },
  {
    id: "admin",
    label: "Institution",
    description: "Manage program",
    icon: Shield,
  },
];

export default function SelectRole(props: SelectRoleProps) {
  const { role, setRole, setStep } = props;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-heading-1">Choose your role</h2>
        <p className="text-muted-foreground">
          Select how you&apos;ll be using the SIWES Portal
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {roleOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setRole(option.id)}
              className={cn(
                "card-elevated p-5 text-left transition-all hover:shadow-card-hover cursor-pointer",
                role === option.id && "ring-2 ring-accent border-accent"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                  role === option.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-medium">{option.label}</p>
              <p className="text-caption text-muted-foreground">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <Button
        className="w-full h-12 text-primary-foreground"
        size="lg"
        disabled={!role}
        onClick={() => setStep(2)}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </Button>

      <p className="text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-accent font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
