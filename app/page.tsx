import Footer from "@/components/footer";
import CTASection from "@/components/home/cta";
import FeaturesSection from "@/components/home/features";
import HeroSection from "@/components/home/hero";
import Navigation from "@/components/home/navigation";
import RolesSection from "@/components/home/roles";
import StatSection from "@/components/home/stats";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatSection />
      <FeaturesSection />
      <RolesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
