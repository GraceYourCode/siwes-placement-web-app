import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function StudentField() {
  return (
    <div className="space-y-2">
      <Label htmlFor="matricNo">Matriculation Number</Label>
      <Input id="matricNo" placeholder="2020/123456" className="h-12" />
    </div>
  );
}
