import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function RatingSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-medium">{value[0]}/5</span>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        max={5}
        min={1}
        step={1}
        className="w-full"
      />
    </div>
  );
}
