import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Trusted by 50+ Institutions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Streamline Your{" "}
            <span className="text-accent">Industrial Training</span> Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for managing SIWES placements, logbooks,
            evaluations, and supervision workflows. Connect students with
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-white" asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <Link href="/login">View Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
