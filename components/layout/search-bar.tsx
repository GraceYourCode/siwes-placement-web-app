import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 w-64 lg:w-80">
      <Search className="w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground"
      />
    </div>
  );
}
