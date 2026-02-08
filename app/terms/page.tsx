"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-muted/30 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="FerresDB" className="h-8 w-auto object-contain" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Acceptance</h2>
            <p>
              By accessing or using the FerresDB website, documentation, software, or related materials, you agree to these Terms of Use. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Use of FerresDB</h2>
            <p>
              FerresDB is provided for use in accordance with its license and documentation. You are responsible for how you deploy, configure, and use the software. Use must comply with applicable laws and must not infringe the rights of others or misuse the product (e.g. for illegal or harmful purposes).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Free Use and Pricing</h2>
            <p>
              Use of FerresDB is currently offered free of charge. We reserve the right to introduce fees, usage limits, or paid tiers in the future. Any such changes will be communicated in advance where reasonably possible. Continued use after any change may constitute acceptance of the new terms or pricing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. No Warranty</h2>
            <p>
              FerresDB and this website are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee uninterrupted access, accuracy, or suitability for any particular purpose. You use the software and site at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we and our contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of data or profits, arising from your use of FerresDB or this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">6. Intellectual Property</h2>
            <p>
              FerresDB, the FerresDB name, logo, and related materials are subject to their respective licenses and intellectual property rights. You may not use our trademarks or branding in a way that implies endorsement or misleads others without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">7. Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. The &quot;Last updated&quot; date at the top reflects the latest version. Your continued use of the website or software after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">8. Contact</h2>
            <p>
              For questions about these Terms of Use, please contact us through the channels provided on our website or GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 FerresDB. Built with Rust.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
