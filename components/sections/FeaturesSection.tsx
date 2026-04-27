"use client";
import { useReveal } from "@/hooks/use-reveal";
import { Zap, Layers, Cpu, HardDrive, Bot, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Sub-millisecond Search",
    desc: "HNSW index with Cosine, Euclidean, and Dot Product metrics. P50 latency under 500μs even at scale.",
  },
  {
    icon: Layers,
    title: "Hybrid Search (Vector + BM25)",
    desc: "Combine vector similarity with full-text BM25 scoring in a single query. Best of both worlds for RAG.",
  },
  {
    icon: Cpu,
    title: "Written in Rust",
    desc: "No GC pauses. Predictable latency. Thread-safe by design. SIMD acceleration (AVX2/SSE4.1) for distance kernels.",
  },
  {
    icon: HardDrive,
    title: "WAL Persistence + Crash Recovery",
    desc: "Write-Ahead Log, periodic snapshots every 1000 ops, and automatic crash recovery. Your data survives failures.",
  },
  {
    icon: Bot,
    title: "Native MCP Support",
    desc: "Connect Claude Desktop directly to FerresDB via the Model Context Protocol. Enable --mcp and start searching from your AI assistant.",
  },
  {
    icon: BarChart3,
    title: "Built-in Observability",
    desc: "Prometheus metrics at /metrics, health check at /health, query analytics with P95 latency, and a web dashboard included.",
  },
];

export function FeaturesSection() {
  const titleRef = useReveal();

  return (
    <section id="features" className="py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Core Features</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
            Everything You Need, Nothing You Don&apos;t
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal feature-card rounded-xl p-6"
      style={{
        transitionDelay: `${index * 80}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
        style={{ background: "rgba(249,115,22,0.1)" }}
      >
        <feature.icon className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-[#9CA3AF]">{feature.desc}</p>
    </div>
  );
}
