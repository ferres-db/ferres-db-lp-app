"use client";
import { useReveal } from "@/hooks/use-reveal";

export function OpenSourceBanner() {
  const ref = useReveal();

  return (
    <section
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(249,115,22,0.1)",
        borderBottom: "1px solid rgba(249,115,22,0.1)",
      }}
      className="py-16"
    >
      <div ref={ref} className="reveal container mx-auto px-4 text-center">
        <p className="mb-1 text-xl font-semibold text-white">
          FerresDB is fully open source.
        </p>
        <p className="mb-8 text-[#9CA3AF]">Licensed under MIT OR Apache-2.0.</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/ferres-db/ferres-db"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            ⭐ Star on GitHub
          </a>
          <a
            href="https://github.com/ferres-db/ferres-db/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            🍴 Fork &amp; Contribute
          </a>
          <a
            href="https://github.com/ferres-db/ferres-db/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            🐛 Open an Issue
          </a>
        </div>
      </div>
    </section>
  );
}
