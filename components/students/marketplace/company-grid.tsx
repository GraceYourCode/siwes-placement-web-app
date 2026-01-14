import CompanyCard, { Company } from "./company-card";

interface CompanyGridProps {
  favorites: string[];
  toggleFavorite: (e: string) => void;
  filteredCompanies: Company[];
}

export default function CompanyGrid(props: CompanyGridProps) {
  const { filteredCompanies, favorites, toggleFavorite } = props;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCompanies.map((company) => (
        <CompanyCard
          company={company}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          key={company.id}
        />
      ))}
    </div>
  );
}
