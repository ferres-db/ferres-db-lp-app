"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DISCORD_INVITE = "https://discord.gg/uudYmwjv7U";

export default function ContactPage() {
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

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-muted-foreground mb-10">
          Have questions, feedback, or want to join the community? Reach us below.
        </p>

        <div className="space-y-4">
          <Card className="p-6 border-border hover:border-primary/50 transition-colors">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 no-underline text-foreground group"
            >
              <div className="rounded-lg bg-[#5865F2]/10 p-3 text-[#5865F2] group-hover:bg-[#5865F2]/20 transition-colors">
                <MessageCircle className="h-8 w-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  Discord
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Join our server for support, discussions, and updates. This is the best way to get in touch.
                </p>
                <span className="text-sm font-medium text-primary">discord.gg/uudYmwjv7U →</span>
              </div>
            </a>
          </Card>

          <Card className="p-6 border-border hover:border-primary/50 transition-colors">
            <a
              href="https://github.com/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 no-underline text-foreground group"
            >
              <div className="rounded-lg bg-muted p-3 text-foreground group-hover:bg-muted/80 transition-colors">
                <Github className="h-8 w-8" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  GitHub
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Report issues, contribute code, or explore the repository.
                </p>
                <span className="text-sm font-medium text-primary">github.com/ferres-db →</span>
              </div>
            </a>
          </Card>

          <Card className="p-6 border-border hover:border-primary/50 transition-colors">
            <a
              href="https://www.producthunt.com/products/ferresdb?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ferresdb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 no-underline text-foreground group"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  Product Hunt
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Check out FerresDB on Product Hunt and support us with an upvote.
                </p>
                <span className="inline-block transition-opacity hover:opacity-90">
                  <img
                    alt="FerresDB - High-performance Vector Search Engine built in Rust | Product Hunt"
                    width={250}
                    height={54}
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1075967&theme=dark&t=1770641114547"
                  />
                </span>
              </div>
            </a>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 FerresDB. Built with Rust.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
