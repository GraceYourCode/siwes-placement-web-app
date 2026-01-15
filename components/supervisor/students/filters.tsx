import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { Student } from "./type";

interface FiltersProps {
  demoStudents: Student[];
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setDepartmentFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}
export default function Filters(props: FiltersProps) {
  const {
    demoStudents,
    departmentFilter,
    searchQuery,
    setDepartmentFilter,
    setSearchQuery,
    setStatusFilter,
    statusFilter,
  } = props;

  const departments = [...new Set(demoStudents.map((s) => s.department))];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, matric no, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Students</SelectItem>
          <SelectItem value="pending">Has Pending</SelectItem>
          <SelectItem value="reviewed">All Reviewed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
