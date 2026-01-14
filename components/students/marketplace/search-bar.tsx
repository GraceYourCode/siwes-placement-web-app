import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        placeholder="Search companies..."
        value={props.searchQuery}
        onChange={(e) => props.setSearchQuery(e.target.value)}
        className="pl-10 h-12"
      />
    </div>
  );
}
