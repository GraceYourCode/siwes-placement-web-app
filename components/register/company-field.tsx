import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CompanyField() {
  return (
    <div className="space-y-2">
      <Label htmlFor="companyName">Company Name</Label>
      <Input id="companyName" placeholder="Acme Corporation" className="h-12" />
    </div>
  );
}
