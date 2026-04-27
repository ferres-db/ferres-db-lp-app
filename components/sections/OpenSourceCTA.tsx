"use client";
import { useReveal } from "@/hooks/use-reveal";

export function OpenSourceCTA() {
  const ref = useReveal();

  return (
    <section
      className="py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 font-heading font-extrabold text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            Built in the open.<br />
            <span className="text-[#f97316]">For everyone.</span>
          </h2>
          <p className="mb-8 text-[#9CA3AF] leading-relaxed">
            FerresDB is open source under the MIT OR Apache-2.0 license.
            Contributions, issues, and feedback are welcome.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#f97316] px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              ⭐ Star on GitHub
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-7 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              📖 Read the Docs
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-7 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              🤝 Contribute
            </a>
          </div>

          <p className="mt-8 font-mono text-xs text-[#9CA3AF]/60">
            Licensed MIT OR Apache-2.0 · Conventional Commits · DCO signed contributions
          </p>
        </div>
      </div>
    </section>
  );
}
