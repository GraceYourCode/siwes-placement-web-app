"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Header from "@/components/layout/header";
import SearchBar from "@/components/students/marketplace/search-bar";
import Filters from "@/components/students/marketplace/filter";
import ResultsCount from "@/components/students/marketplace/results-counts";
import { Company } from "@/components/students/marketplace/company-card";
import CompanyGrid from "@/components/students/marketplace/company-grid";

const companies: Company[] = [
  {
    id: "1",
    name: "TechCorp Nigeria",
    industry: "Information Technology",
    location: "Lagos",
    openings: 5,
    rating: 4.8,
    verified: true,
  },
  {
    id: "2",
    name: "First Bank Nigeria",
    industry: "Banking & Finance",
    location: "Lagos",
    openings: 8,
    rating: 4.5,
    verified: true,
  },
  {
    id: "3",
    name: "Dangote Industries",
    industry: "Manufacturing",
    location: "Abuja",
    openings: 12,
    rating: 4.6,
    verified: true,
  },
  {
    id: "4",
    name: "MTN Nigeria",
    industry: "Telecommunications",
    location: "Lagos",
    openings: 6,
    rating: 4.7,
    verified: true,
  },
  {
    id: "5",
    name: "Shell Petroleum",
    industry: "Oil & Gas",
    location: "Port Harcourt",
    openings: 4,
    rating: 4.9,
    verified: true,
  },
  {
    id: "6",
    name: "Andela",
    industry: "Information Technology",
    location: "Lagos",
    openings: 10,
    rating: 4.4,
    verified: true,
  },
  {
    id: "7",
    name: "PwC Nigeria",
    industry: "Consulting",
    location: "Lagos",
    openings: 7,
    rating: 4.3,
    verified: true,
  },
  {
    id: "8",
    name: "Nestle Nigeria",
    industry: "FMCG",
    location: "Lagos",
    openings: 3,
    rating: 4.5,
    verified: true,
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      company.industry === selectedIndustry;
    const matchesLocation =
      selectedLocation === "All Locations" ||
      company.location === selectedLocation;
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout
      role="student"
      userName="Adewale Johnson"
      userEmail="adewale@university.edu"
    >
      <div className="space-y-6">
        <Header
          header="Company Marketplace"
          description="Discover placement opportunities from verified organizations"
        />

        <div className="card-elevated p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <Filters
              selectedIndustry={selectedIndustry}
              selectedLocation={selectedLocation}
              setSelectedIndustry={setSelectedIndustry}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </div>

        <ResultsCount length={filteredCompanies.length} />
        <CompanyGrid
          filteredCompanies={filteredCompanies}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </DashboardLayout>
  );
}
