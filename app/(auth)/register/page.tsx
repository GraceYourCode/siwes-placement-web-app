"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import ProgressIndicator from "@/components/register/progress-indicator";
import SelectRole from "@/components/register/select-role";
import RegisterForm from "@/components/register/form";

export type UserRole = "student" | "supervisor" | "company" | "admin";

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">SIWES Portal</span>
        </div>

        <ProgressIndicator step={step} />

        {step === 1 && (
          <SelectRole role={role} setRole={setRole} setStep={setStep} />
        )}

        {step === 2 && (
          <RegisterForm role={role as UserRole} setStep={setStep} />
        )}
      </div>
    </div>
  );
}
