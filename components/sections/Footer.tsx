export function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        borderTop: "1px solid rgba(249,115,22,0.1)",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: branding */}
          <div className="text-center sm:text-left">
            <p className="font-mono text-base font-bold text-white">
              <span className="text-[#f97316]">●</span> FerresDB
            </p>
            <p className="mt-1 font-mono text-xs text-[#9CA3AF]">
              High-performance vector search in Rust
            </p>
            <p className="mt-0.5 font-mono text-xs text-[#9CA3AF]/60">
              MIT OR Apache-2.0
            </p>
          </div>

          {/* Right: links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
              {[
                { label: "GitHub", href: "https://github.com/ferres-db/ferres-db", external: true },
                { label: "Docs", href: "/docs" },
                { label: "SDK", href: "#sdks" },
                { label: "Contributing", href: "https://github.com/ferres-db/ferres-db/blob/main/CONTRIBUTING.md", external: true },
                { label: "License", href: "https://github.com/ferres-db/ferres-db/blob/main/LICENSE", external: true },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[#9CA3AF] transition-colors hover:text-[#f97316]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-[#9CA3AF]/50">
            © 2026 FerresDB. Built with Rust. ·{" "}
            <a href="/privacy" className="hover:text-[#f97316] transition-colors">Privacy</a>
            {" · "}
            <a href="/terms" className="hover:text-[#f97316] transition-colors">Terms</a>
            {" · "}
            <a href="/contact" className="hover:text-[#f97316] transition-colors">Contact</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
