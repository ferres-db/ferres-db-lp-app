import { MessageCircle, Github } from "lucide-react";
import { SecondaryNavbar } from "@/components/sections/SecondaryNavbar";
import { Footer } from "@/components/sections/Footer";

const DISCORD_INVITE = "https://discord.gg/uudYmwjv7U";

export default function ContactPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#1A1A1A", color: "#f9fafb" }}
    >
      <SecondaryNavbar badge="Contact" />

      <main className="container mx-auto max-w-2xl px-4 pb-16 pt-32">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">
          Get in touch
        </p>
        <h1
          className="mb-3 font-heading font-extrabold text-white"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Contact
        </h1>
        <p className="mb-10 leading-relaxed text-[#9CA3AF]">
          Have questions, feedback, or want to join the community? Reach us below.
        </p>

        <div className="space-y-4">
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="feature-card flex items-start gap-4 rounded-xl p-6 no-underline"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(88,101,242,0.12)" }}
            >
              <MessageCircle className="h-6 w-6 text-[#5865F2]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-1 font-heading text-lg font-bold text-white">Discord</h2>
              <p className="mb-3 text-sm leading-relaxed text-[#9CA3AF]">
                Join our server for support, discussions, and updates. This is the best way to get in touch.
              </p>
              <span className="font-mono text-xs font-semibold text-[#f97316]">
                discord.gg/uudYmwjv7U →
              </span>
            </div>
          </a>

          <a
            href="https://github.com/ferres-db"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-card flex items-start gap-4 rounded-xl p-6 no-underline"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(249,115,22,0.1)" }}
            >
              <Github className="h-6 w-6 text-[#f97316]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-1 font-heading text-lg font-bold text-white">GitHub</h2>
              <p className="mb-3 text-sm leading-relaxed text-[#9CA3AF]">
                Report issues, contribute code, or explore the repository.
              </p>
              <span className="font-mono text-xs font-semibold text-[#f97316]">
                github.com/ferres-db →
              </span>
            </div>
          </a>

          <a
            href="https://www.producthunt.com/products/ferresdb?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ferresdb"
            target="_blank"
            rel="noopener noreferrer"
            className="feature-card flex items-start gap-4 rounded-xl p-6 no-underline"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="min-w-0 flex-1">
              <h2 className="mb-1 font-heading text-lg font-bold text-white">Product Hunt</h2>
              <p className="mb-3 text-sm leading-relaxed text-[#9CA3AF]">
                Check out FerresDB on Product Hunt and support us with an upvote.
              </p>
              <span className="inline-block transition-opacity hover:opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="FerresDB - High-performance Vector Search Engine built in Rust | Product Hunt"
                  width={250}
                  height={54}
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1075967&theme=dark&t=1770641114547"
                />
              </span>
            </div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
