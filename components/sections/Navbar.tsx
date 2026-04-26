"use client";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 z-50 w-full"
      style={{
        background: "rgba(26,26,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(249,115,22,0.15)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + license badge */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold">
              <span className="text-[#f97316]">●</span>
              <span className="ml-1 text-white">FerresDB</span>
            </span>
          </a>
          <span
            className="hidden sm:inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] text-[#9CA3AF]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            MIT OR Apache-2.0
          </span>
        </div>

        {/* Nav links (hidden on mobile) */}
        <div className="hidden items-center gap-6 md:flex">
          {[
            { label: "Docs", href: "/docs" },
            { label: "SDK", href: "#sdks" },
            { label: "Benchmarks", href: "#performance" },
            { label: "GitHub", href: "https://github.com/ferres-db/ferres-db", external: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-[#9CA3AF] transition-colors hover:text-[#f97316]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://github.com/ferres-db/ferres-db"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star FerresDB on GitHub"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          style={{
            border: "1px solid #f97316",
            color: "#f97316",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#f97316";
            (e.currentTarget as HTMLAnchorElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#f97316";
          }}
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </motion.nav>
  );
}
