import { cn } from "@/lib/utils";

export default function ProgressIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2].map((s) => (
        <div
          key={s}
          className={cn(
            "h-1.5 rounded-full transition-all",
            s === step
              ? "w-8 bg-accent"
              : s < step
              ? "w-8 bg-accent/50"
              : "w-8 bg-muted"
          )}
        />
      ))}
    </div>
  );
}
