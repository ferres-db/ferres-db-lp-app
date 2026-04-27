"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Navbar() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.25, 0.4, 0.25, 1] }}
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
          <a href="/" aria-label="FerresDB home" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FerresDB"
              width={140}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </a>
          <span
            className="hidden sm:inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] text-[#9CA3AF]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            MIT OR Apache-2.0
          </span>
        </div>

        {/* Nav links (hidden on mobile — hamburger menu out of scope) */}
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
          className="flex items-center gap-2 rounded-md border border-[#f97316] px-4 py-2 text-sm font-medium text-[#f97316] transition-colors hover:bg-[#f97316] hover:text-black"
        >
          <span aria-hidden="true">⭐</span> Star on GitHub
        </a>
      </div>
    </motion.nav>
  );
}
