"use client";
import { useReveal } from "@/hooks/use-reveal";
import { Search, Brain, Target } from "lucide-react";

const CASES = [
  {
    icon: Search,
    title: "Semantic Search",
    desc: "Index documents, articles, or product descriptions. Find the most relevant results using vector similarity — no keyword matching required.",
  },
  {
    icon: Brain,
    title: "RAG Pipelines",
    desc: "Connect FerresDB to your LLM pipeline. Retrieve the most relevant context chunks before generation. Works with LangChain, LlamaIndex, and custom pipelines.",
  },
  {
    icon: Target,
    title: "Recommendation Systems",
    desc: "Store user embeddings and item vectors. Query the nearest neighbors in microseconds to power real-time recommendations.",
  },
];

export function UseCasesSection() {
  const titleRef = useReveal();

  return (
    <section className="py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Use Cases</p>
          <h2 className="font-heading text-2xl font-extrabold text-white md:text-3xl">
            Built for AI-native applications
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <UseCaseCard key={c.title} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({
  item,
  index,
}: {
  item: (typeof CASES)[number];
  index: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal feature-card rounded-xl p-6"
      style={{
        transitionDelay: `${index * 100}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
        style={{ background: "rgba(249,115,22,0.1)" }}
      >
        <item.icon className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
      <p className="text-sm leading-relaxed text-[#9CA3AF]">{item.desc}</p>
    </div>
  );
}
