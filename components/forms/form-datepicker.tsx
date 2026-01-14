import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FormDatePickerProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
  name?: string;
}

export function FormDatePicker({
  label,
  error,
  hint,
  value,
  onChange,
  required,
  disabled,
  placeholder = "Select date",
  minDate,
  maxDate,
  id,
  name,
}: FormDatePickerProps) {
  const [open, setOpen] = useState(false);
  const pickerId = id || name;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={pickerId} className={error ? "text-destructive" : ""}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={pickerId}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full h-12 justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive focus:ring-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {hint && !error && (
        <p className="text-caption text-muted-foreground">{hint}</p>
      )}
      {error && <p className="text-caption text-destructive">{error}</p>}
    </div>
  );
}
