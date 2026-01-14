import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="card-elevated p-8 md:p-12 bg-primary text-primary-foreground text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Transform Your SIWES Experience?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
            Join institutions and organizations already using SIWES Portal to
            streamline industrial training.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="accent" className="h-12 px-8" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-primary-foreground/30 text-primary hover:text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/login">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
