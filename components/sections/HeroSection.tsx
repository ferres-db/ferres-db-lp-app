"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      style={{ background: "#1A1A1A" }}
    >
      {/* Dot grid background */}
      <div className="dot-grid" />
      {/* Orange blob glow */}
      <div className="blob-glow" />

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Open source badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.1 }}
          >
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View FerresDB on GitHub (MIT OR Apache-2.0)"
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm text-[#9CA3AF] transition-all hover:border-[#f97316]/50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(249,115,22,0.25)",
                boxShadow: "0 0 20px rgba(249,115,22,0.08)",
              }}
            >
              <span aria-hidden="true">🔓</span>
              <span>Open Source —</span>
              <span className="font-semibold text-[#f97316]">MIT OR Apache-2.0</span>
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline text-[#9CA3AF]/60">github.com/ferres-db/ferres-db</span>
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.7, delay: prefersReduced ? 0 : 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-6 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Vector search.<br />
            Built in Rust.<br />
            <span className="text-[#f97316]">Sub-millisecond.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.45 }}
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg"
          >
            FerresDB is a high-performance vector search engine for semantic search,
            RAG pipelines, and recommendation systems. REST API, hybrid search,
            WAL persistence — production-ready from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.6 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#quickstart"
              className="rounded-md bg-[#f97316] px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-8 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              View on GitHub →
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: prefersReduced ? 0 : 0.75 } } }}
            className="mx-auto grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { staticVal: "~500μs", label: "P50 Latency", sublabel: "sub-millisecond" },
              { value: 100, suffix: "K+", label: "Ingest Throughput", sublabel: "vectors/s" },
              { value: 3, suffix: " SDKs", label: "Rust · Python · TypeScript", sublabel: "" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5 } },
                }}
                className="rounded-lg p-4 text-center sm:p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                <div className="mb-1 font-mono text-2xl font-bold text-[#f97316] sm:text-3xl">
                  {"staticVal" in metric ? (
                    metric.staticVal
                  ) : (
                    <AnimatedCounter value={metric.value!} suffix={metric.suffix} />
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9CA3AF] sm:text-xs">
                  {metric.label}
                </div>
                {metric.sublabel && (
                  <div className="mt-0.5 text-[10px] text-[#9CA3AF]/60">{metric.sublabel}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
