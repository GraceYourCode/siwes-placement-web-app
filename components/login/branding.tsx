import { Briefcase, CheckCircle } from "lucide-react";

export default function Branding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cg%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2240%22%20fill%3D%22white%22/%3E%3C/g%3E%3C/svg%3E')] bg-size-[80px_80px]" />

      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-semibold text-primary-foreground">
            SIWES Portal
          </span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-primary-foreground leading-tight">
            Industrial Training
            <br />
            Made Simple
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Streamline your SIWES placement, monitoring, and evaluation
            processes with our comprehensive platform.
          </p>

          <div className="space-y-4 pt-4">
            {[
              "Find placement opportunities",
              "Track logbook entries",
              "Connect with supervisors",
              "Complete evaluations online",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} SIWES Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}
