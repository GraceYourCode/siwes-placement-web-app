const industries = [
  "All Industries",
  "Information Technology",
  "Banking & Finance",
  "Manufacturing",
  "Telecommunications",
  "Oil & Gas",
  "Consulting",
  "FMCG",
];
const locations = [
  "All Locations",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
];

interface FiltersProps {
  selectedIndustry: string;
  setSelectedIndustry: React.Dispatch<React.SetStateAction<string>>;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}
export default function Filters(props: FiltersProps) {
  const {
    setSelectedIndustry,
    selectedIndustry,
    selectedLocation,
    setSelectedLocation,
  } = props;

  return (
    <div className="flex max-sm:flex-col gap-3">
      <select
        value={selectedIndustry}
        onChange={(e) => setSelectedIndustry(e.target.value)}
        className="h-12 px-4 rounded-lg border border-input bg-card text-body focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {industries.map((industry) => (
          <option key={industry} value={industry}>
            {industry}
          </option>
        ))}
      </select>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="h-12 px-4 rounded-lg border border-input bg-card text-body focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}
