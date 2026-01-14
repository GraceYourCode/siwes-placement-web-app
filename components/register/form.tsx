import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import StudentField from "./student-field";
import CompanyField from "./company-field";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PasswordField from "./password-field";
import { UserRole } from "@/app/(auth)/register/page";

interface RegisterFormProps {
  role: UserRole;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function RegisterForm(props: RegisterFormProps) {
  const { role, setStep } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-heading-1">Create your account</h2>
        <p className="text-muted-foreground">
          Fill in your details to get started
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="John" className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Doe" className="h-12" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@university.edu"
            className="h-12"
          />
        </div>

        {role === "student" && <StudentField />}

        {role === "company" && <CompanyField />}

        <PasswordField
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />

        <Button
          type="button"
          className="w-full h-12 text-primary-foreground"
          size="lg"
          asChild
        >
          <Link href={`/${role}`}>
            Create account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </form>

      <button
        onClick={() => setStep(1)}
        className="w-full text-center text-muted-foreground hover:text-foreground flex items-center gap-2 justify-center"
      >
        <ArrowLeft className="w-4 h-4" /> Back to role selection
      </button>
    </div>
  );
}
