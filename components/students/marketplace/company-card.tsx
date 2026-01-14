import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  ChevronRight,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  openings: number;
  rating: number;
  logo?: string;
  verified: boolean;
}

interface CompanyCardProps {
  company: Company;
  favorites: string[];
  toggleFavorite: (e: string) => void;
}

export default function CompanyCard(props: CompanyCardProps) {
  const { company, favorites, toggleFavorite } = props;
  return (
    <div className="card-elevated p-5 space-y-4 hover:shadow-card-hover transition-shadow group">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{company.name}</h3>
              {company.verified && (
                <span className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-accent-foreground"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-caption text-muted-foreground">
              {company.industry}
            </p>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(company.id)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              favorites.includes(company.id)
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      <div className="flex items-center gap-4 text-caption">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {company.location}
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Briefcase className="w-4 h-4" />
          {company.openings} openings
        </div>
        <div className="flex items-center gap-1 text-warning">
          <Star className="w-4 h-4 fill-current" />
          {company.rating}
        </div>
      </div>

      <Button className="w-full" variant="outline">
        View Opportunities
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
