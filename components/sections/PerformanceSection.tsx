"use client";
import { useReveal } from "@/hooks/use-reveal";

const INDEXING = [
  { size: "1K vectors", time: "~10–20ms", throughput: "50K–100K pts/s" },
  { size: "10K vectors", time: "~150–300ms", throughput: "30K–60K pts/s" },
  { size: "100K vectors", time: "~2.5–5s", throughput: "20K–40K pts/s" },
];

const LATENCY = [
  { percentile: "P50", range: "~100–500 μs" },
  { percentile: "P95", range: "~200–1000 μs" },
  { percentile: "P99", range: "~500–2000 μs" },
];

export function PerformanceSection() {
  const titleRef = useReveal();
  const tableRef = useReveal();

  return (
    <section
      id="performance"
      className="py-20"
      style={{ background: "#111111", borderTop: "1px solid rgba(249,115,22,0.08)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Benchmarks</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
            Numbers that matter
          </h2>
        </div>

        <div
          ref={tableRef}
          className="reveal mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
        >
          {/* Indexing throughput */}
          <div
            className="rounded-xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="mb-5 font-semibold text-white">Indexing Throughput</h3>
            <div className="space-y-4">
              {INDEXING.map((row) => (
                <div key={row.size} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{row.size}</p>
                    <p className="font-mono text-xs text-[#9CA3AF]">{row.time}</p>
                  </div>
                  <p className="font-mono text-sm font-bold text-[#f97316] text-right">{row.throughput}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search latency */}
          <div
            className="rounded-xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="mb-5 font-semibold text-white">Search Latency</h3>
            <div className="space-y-4">
              {LATENCY.map((row) => (
                <div key={row.percentile} className="flex items-center justify-between">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-xs font-bold"
                    style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
                  >
                    {row.percentile}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#f97316]">{row.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-xs text-[#9CA3AF]/60">
          Reference hardware: Intel i7 / AMD Ryzen, 16GB RAM. Results vary with HNSW config and vector dimension.
        </p>
      </div>
    </section>
  );
}
