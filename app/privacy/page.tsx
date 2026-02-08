"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Introduction</h2>
            <p>
              FerresDB (&quot;we&quot;, &quot;our&quot;, or &quot;the product&quot;) is a self-hosted vector database. This Privacy Policy describes how we may collect and use information in connection with this website and related services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Information We Collect</h2>
            <p>
              When you use this website, we may collect limited technical information such as IP address, browser type, and pages visited. If you self-host FerresDB, your data remains on your infrastructure; we do not access or store your application data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Use of Information</h2>
            <p>
              We use collected information to improve the website, analyze usage patterns, and communicate with you if you have opted in. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Cookies and Similar Technologies</h2>
            <p>
              This site may use cookies or similar technologies for essential functionality and analytics. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Third-Party Services</h2>
            <p>
              Our website may link to or integrate with third-party services (e.g. GitHub, documentation hosts). Their privacy policies apply to your use of those services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">6. Changes</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">7. Contact</h2>
            <p>
              For questions about this Privacy Policy, please contact us through the channels provided on our website or GitHub repository.
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
