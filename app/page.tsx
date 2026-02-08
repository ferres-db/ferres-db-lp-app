"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Zap,
  Database,
  Shield,
  BarChart3,
  Code2,
  Gauge,
  Layers,
  Radio,
  FileSearch,
  Lock,
  GitBranch,
  Terminal,
  Globe,
  Cpu,
  Search,
  Box,
  Users,
  HardDrive,
  Server,
  Activity,
  ChevronRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Animated section wrapper                                           */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                    */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered card wrapper                                              */
/* ------------------------------------------------------------------ */
function StaggeredCards({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggeredCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated progress bar                                               */
/* ------------------------------------------------------------------ */
function AnimatedBar({
  width,
  color = "bg-primary",
  delay = 0,
}: {
  width: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: "0%" }}
        animate={isInView ? { width } : { width: "0%" }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }}
      />
    </div>
  );
}

/* ================================================================== */
/*  Main page                                                          */
/* ================================================================== */
export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="FerresDB" className="h-8 w-auto object-contain" />
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#architecture" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Architecture
            </a>
            <a href="#performance" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Performance
            </a>
            <a href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Docs
            </a>
            <a href="#install" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Install
            </a>
            <a href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#install">Get Started</a>
          </Button>
        </div>
      </motion.nav>

      {/* ================================================================ */}
      {/*  HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section className="relative container mx-auto px-4 pt-32 pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />
        <div className="hero-glow-secondary top-1/4 right-0 translate-x-1/3" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary pulse-dot" />
              Built with Rust — Zero GC Pauses
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-balance">The</span>{" "}
            <span className="text-shimmer">Fastest</span>
            <br />
            <span className="text-balance">Vector Search Engine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-10 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl"
          >
            FerresDB delivers sub-millisecond vector search with hybrid BM25 retrieval, 
            gRPC streaming, tiered storage, and enterprise-grade RBAC — all powered by Rust
            for uncompromising performance in RAG, semantic search, and recommendation systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              <a href="#install">
                Get Started with Docker
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-border hover:bg-muted">
              <a href="/docs">View Documentation</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {[
              { value: "<500μs", label: "P50 Search Latency", sub: "Sub-millisecond" },
              { value: "50K+", label: "Vectors/Second", sub: "Indexing throughput" },
              { value: "3 APIs", label: "REST + gRPC + WS", sub: "Multi-protocol" },
              { value: "HNSW", label: "ANN Algorithm", sub: "High recall rate" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.2 }}
                className="gradient-border rounded-xl p-5"
              >
                <div className="text-2xl font-bold text-primary md:text-3xl">{stat.value}</div>
                <div className="text-sm font-medium text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  USE CASES                                                        */}
      {/* ================================================================ */}
      <section className="border-t border-border py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Use Cases</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Built for AI-Native Applications
              </h2>
              <p className="text-pretty text-muted-foreground">
                From RAG pipelines to real-time recommendations, FerresDB powers the most demanding vector workloads.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredCards className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <StaggeredCard>
              <Card className="border-border bg-card p-6 h-full group hover:border-primary/30 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Semantic Search</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Transform user queries into meaning-based results with Cosine, Euclidean, or Dot Product 
                  similarity. Combine with metadata filters for precision retrieval.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">Vector Search</Badge>
                  <Badge variant="outline" className="text-xs">Metadata Filters</Badge>
                  <Badge variant="outline" className="text-xs">Budget-aware</Badge>
                </div>
              </Card>
            </StaggeredCard>

            <StaggeredCard>
              <Card className="border-border bg-card p-6 h-full group hover:border-primary/30 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                  <FileSearch className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">RAG Pipelines</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Hybrid vector + BM25 search in a single query with weighted or RRF fusion.
                  Ground your LLM responses with the most relevant context from your knowledge base.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">Hybrid Search</Badge>
                  <Badge variant="outline" className="text-xs">BM25 Fusion</Badge>
                  <Badge variant="outline" className="text-xs">RRF & Weighted</Badge>
                </div>
              </Card>
            </StaggeredCard>

            <StaggeredCard>
              <Card className="border-border bg-card p-6 h-full group hover:border-primary/30 transition-colors">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Recommendations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Real-time similarity matching with WebSocket streaming. Dot Product distance 
                  optimized for recommendation models. Auto-batching up to 1000 points/request.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">WebSocket</Badge>
                  <Badge variant="outline" className="text-xs">Dot Product</Badge>
                  <Badge variant="outline" className="text-xs">Auto-batch</Badge>
                </div>
              </Card>
            </StaggeredCard>
          </StaggeredCards>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CORE FEATURES                                                    */}
      {/* ================================================================ */}
      <section id="features" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Core Features</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Everything You Need, Nothing You Don&apos;t
              </h2>
              <p className="mb-12 text-pretty text-muted-foreground">
                A complete vector database with enterprise-grade features, built from the ground up in Rust 
                for maximum performance and reliability.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredCards className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Sub-Millisecond Latency",
                description:
                  "P50 search at 100-500μs, P95 at 200-1000μs. No GC pauses — Rust delivers predictable, low-latency execution with zero runtime overhead.",
                color: "bg-yellow-500/10 text-yellow-400",
              },
              {
                icon: Layers,
                title: "Hybrid Vector + BM25",
                description:
                  "Combine dense vector search with BM25 text retrieval using weighted fusion or Reciprocal Rank Fusion (RRF). Tunable alpha parameter for precision control.",
                color: "bg-green-500/10 text-green-400",
              },
              {
                icon: Radio,
                title: "Multi-Protocol: REST, gRPC, WebSocket",
                description:
                  "REST API for simplicity, gRPC with bidirectional streaming for high-throughput, and WebSocket for real-time applications. All protocols run in parallel.",
                color: "bg-blue-500/10 text-blue-400",
              },
              {
                icon: HardDrive,
                title: "Tiered Storage (Hot/Warm/Cold)",
                description:
                  "Automatically move vectors between RAM (Hot), memory-mapped (Warm), and disk (Cold) tiers based on access frequency. HNSW graph stays in memory for speed.",
                color: "bg-purple-500/10 text-purple-400",
              },
              {
                icon: Shield,
                title: "RBAC + Audit Trail",
                description:
                  "Role-based access control with Admin, Editor, and Viewer roles. Granular per-collection permissions with metadata restrictions. Daily-rotated audit logs.",
                color: "bg-red-500/10 text-red-400",
              },
              {
                icon: GitBranch,
                title: "Zero-Downtime Reindex",
                description:
                  "Rebuild HNSW indexes in the background. Searches continue on the old index until the new one is ready. Auto-triggers when tombstones exceed 20%.",
                color: "bg-cyan-500/10 text-cyan-400",
              },
              {
                icon: Database,
                title: "WAL + Snapshots",
                description:
                  "Write-Ahead Log with periodic snapshots every 1000 ops. Automatic crash recovery replays the WAL from the latest snapshot. Auto-save every 30 seconds.",
                color: "bg-orange-500/10 text-orange-400",
              },
              {
                icon: BarChart3,
                title: "Full Observability",
                description:
                  "Prometheus metrics endpoint, query profiling with /search/explain, slow query tracking, cost estimation with budget_ms, and a built-in web dashboard.",
                color: "bg-emerald-500/10 text-emerald-400",
              },
              {
                icon: Code2,
                title: "Official TypeScript & Python SDKs",
                description:
                  "Fully-typed TypeScript SDK with Zod validation and WebSocket support. Async Python SDK with httpx. Both feature auto-retry, auto-batching, and structured logging.",
                color: "bg-indigo-500/10 text-indigo-400",
              },
            ].map((feature) => (
              <StaggeredCard key={feature.title}>
                <Card className="border-border bg-card p-6 h-full group hover:border-primary/20 transition-all duration-300">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.color.split(" ")[0]} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </StaggeredCard>
            ))}
          </StaggeredCards>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  ARCHITECTURE                                                     */}
      {/* ================================================================ */}
      <section id="architecture" className="border-t border-border py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Architecture</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Engineered for Production
              </h2>
              <p className="text-pretty text-muted-foreground">
                Every layer of FerresDB is designed for performance, safety, and operational excellence.
              </p>
            </div>
          </AnimatedSection>

          <div className="mx-auto max-w-6xl">
            <StaggeredCards className="grid gap-6 md:grid-cols-2">
              {/* Left: Architecture layers */}
              <StaggeredCard>
                <Card className="border-border bg-card p-8 h-full">
                  <h3 className="mb-6 text-xl font-bold">System Layers</h3>
                  <div className="space-y-4">
                    {[
                      {
                        layer: "API Layer",
                        tech: "Actix-Web + Tonic gRPC",
                        desc: "REST, gRPC (port 50051), WebSocket — all running in parallel",
                        icon: Globe,
                      },
                      {
                        layer: "Auth Layer",
                        tech: "API Keys (SHA-256) + JWT (Argon2)",
                        desc: "RBAC with Admin/Editor/Viewer roles, per-collection permissions",
                        icon: Lock,
                      },
                      {
                        layer: "Search Engine",
                        tech: "HNSW + BM25 + LRU Cache",
                        desc: "Cosine/Euclidean/DotProduct metrics, metadata filters, hybrid fusion",
                        icon: Search,
                      },
                      {
                        layer: "Storage Engine",
                        tech: "WAL + Snapshots + Tiered Storage",
                        desc: "Hot (RAM) / Warm (mmap) / Cold (disk), auto-save every 30s",
                        icon: HardDrive,
                      },
                      {
                        layer: "Observability",
                        tech: "Prometheus + OpenTelemetry",
                        desc: "Metrics, query profiling, slow queries, daily audit trail (JSONL)",
                        icon: Activity,
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.layer}
                        className="flex gap-4 rounded-lg border border-border bg-background/50 p-4 hover:border-primary/30 transition-colors"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{item.layer}</span>
                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.tech}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </StaggeredCard>

              {/* Right: Technical highlights */}
              <StaggeredCard>
                <div className="space-y-6 h-full flex flex-col">
                  <Card className="border-border bg-card p-6 flex-1">
                    <h3 className="mb-4 text-xl font-bold">HNSW Parameters</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      The Hierarchical Navigable Small World index is tuned for an optimal 
                      balance of speed and recall.
                    </p>
                    <div className="space-y-4">
                      {[
                        { param: "m", value: "16", desc: "Max connections per layer", bar: "55%" },
                        { param: "ef_construction", value: "200", desc: "Index build quality", bar: "85%" },
                        { param: "ef_search", value: "50", desc: "Query search width", bar: "40%" },
                      ].map((p, i) => (
                        <div key={p.param}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <code className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{p.param}</code>
                              <span className="text-xs text-muted-foreground">{p.desc}</span>
                            </div>
                            <span className="text-sm font-bold text-foreground">{p.value}</span>
                          </div>
                          <AnimatedBar width={p.bar} delay={i * 0.15} />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="border-border bg-card p-6 flex-1">
                    <h3 className="mb-4 text-xl font-bold">Storage Layout</h3>
                    <div className="rounded-lg bg-background p-4 font-mono text-xs leading-relaxed">
                      <div className="text-muted-foreground">
                        <span className="text-primary">{"{STORAGE_PATH}"}/</span>
                        <br />
                        <span className="text-muted-foreground ml-4">├── collections/</span>
                        <br />
                        <span className="text-muted-foreground ml-8">├── points.jsonl</span>
                        <span className="text-muted-foreground/60 ml-2">{'# Current state'}</span>
                        <br />
                        <span className="text-muted-foreground ml-8">├── wal.jsonl</span>
                        <span className="text-muted-foreground/60 ml-6">{'# Write-ahead log'}</span>
                        <br />
                        <span className="text-muted-foreground ml-8">├── snapshot.jsonl</span>
                        <span className="text-muted-foreground/60 ml-2">{'# Every 1000 ops'}</span>
                        <br />
                        <span className="text-muted-foreground ml-8">└── index.bin</span>
                        <span className="text-muted-foreground/60 ml-5">{'# HNSW index'}</span>
                        <br />
                        <span className="text-muted-foreground ml-4">├── api_keys.db</span>
                        <span className="text-muted-foreground/60 ml-5">{'# SHA-256 hashed'}</span>
                        <br />
                        <span className="text-muted-foreground ml-4">├── users.db</span>
                        <span className="text-muted-foreground/60 ml-8">{'# Argon2 passwords'}</span>
                        <br />
                        <span className="text-muted-foreground ml-4">└── logs/</span>
                        <br />
                        <span className="text-muted-foreground ml-8">└── audit-*.jsonl</span>
                        <span className="text-muted-foreground/60 ml-2">{'# Daily rotation'}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </StaggeredCard>
            </StaggeredCards>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  PERFORMANCE                                                      */}
      {/* ================================================================ */}
      <section id="performance" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Benchmarks</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Performance That Speaks for Itself
              </h2>
              <p className="text-pretty text-muted-foreground">
                Benchmarked with Criterion.rs — real numbers, not marketing claims
              </p>
            </div>
          </AnimatedSection>

          <div className="mx-auto max-w-6xl">
            <StaggeredCards className="grid gap-6 md:grid-cols-2">
              {/* Indexing Performance */}
              <StaggeredCard>
                <Card className="border-border bg-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <Cpu className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold">Indexing Throughput</h3>
                  </div>
                  <div className="space-y-5">
                    {[
                      { size: "1K vectors", label: "Small", value: "50K–100K", bar: "95%", color: "bg-green-500" },
                      { size: "10K vectors", label: "Medium", value: "30K–60K", bar: "70%", color: "bg-green-500/80" },
                      { size: "100K vectors", label: "Large", value: "20K–40K", bar: "45%", color: "bg-green-500/60" },
                    ].map((bench, i) => (
                      <div key={bench.size}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm font-medium">{bench.size}</span>
                            <span className="text-xs text-muted-foreground ml-2">({bench.label})</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">{bench.value}</span>
                            <span className="text-xs text-muted-foreground ml-1">pts/s</span>
                          </div>
                        </div>
                        <AnimatedBar width={bench.bar} color={bench.color} delay={i * 0.2} />
                      </div>
                    ))}
                  </div>
                </Card>
              </StaggeredCard>

              {/* Search Latency */}
              <StaggeredCard>
                <Card className="border-border bg-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Gauge className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">Search Latency</h3>
                  </div>
                  <div className="space-y-5">
                    {[
                      { percentile: "P50", label: "Median", value: "100–500μs", bar: "25%", color: "bg-blue-500" },
                      { percentile: "P95", label: "95th", value: "200–1000μs", bar: "50%", color: "bg-blue-500/80" },
                      { percentile: "P99", label: "99th", value: "500–2000μs", bar: "75%", color: "bg-blue-500/60" },
                    ].map((bench, i) => (
                      <div key={bench.percentile}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm font-medium">{bench.percentile}</span>
                            <span className="text-xs text-muted-foreground ml-2">({bench.label})</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">{bench.value}</span>
                          </div>
                        </div>
                        <AnimatedBar width={bench.bar} color={bench.color} delay={i * 0.2} />
                      </div>
                    ))}
                  </div>
                </Card>
              </StaggeredCard>
            </StaggeredCards>

            {/* Why It's Fast */}
            <AnimatedSection delay={0.2} className="mt-8">
              <Card className="border-border bg-card p-8">
                <h3 className="mb-6 text-2xl font-bold">Why FerresDB is Fast</h3>
                <StaggeredCards className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Rust Foundation",
                      desc: "No GC pauses, zero-cost abstractions, memory safety without runtime overhead. Compiled to native machine code.",
                    },
                    {
                      title: "HNSW Algorithm",
                      desc: "Multi-layer graph with O(log N) search complexity. Optimized for high recall with configurable ef_search.",
                    },
                    {
                      title: "Parallel with Rayon",
                      desc: "Thread-safe design with parallelized batch operations. Ready for multi-threaded servers and concurrent requests.",
                    },
                    {
                      title: "LRU Search Cache",
                      desc: "Optional caching for repeated queries. Configurable cache size eliminates redundant computation on hot queries.",
                    },
                  ].map((item) => (
                    <StaggeredCard key={item.title}>
                      <div className="group">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                          <span className="font-semibold text-sm">{item.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </StaggeredCard>
                  ))}
                </StaggeredCards>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  COMPARISON TABLE                                                 */}
      {/* ================================================================ */}
      <section className="border-t border-border py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                FerresDB vs The Rest
              </h2>
              <p className="text-muted-foreground">
                See how FerresDB compares to conventional vector databases
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mx-auto max-w-5xl">
              <Card className="border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="bg-muted/50">
                        <th className="p-4 text-left font-semibold">Aspect</th>
                        <th className="p-4 text-left font-semibold">
                          <span className="text-primary">FerresDB</span>
                        </th>
                        <th className="p-4 text-left font-semibold text-muted-foreground">Others</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        {
                          aspect: "Language",
                          ferres: "Pure Rust — zero GC, native performance",
                          others: "Python, Go, or Java with GC overhead",
                        },
                        {
                          aspect: "Search Latency",
                          ferres: "P50: 100–500μs (sub-millisecond)",
                          others: "Typically 1–50ms per query",
                        },
                        {
                          aspect: "Search Types",
                          ferres: "Vector + BM25 hybrid (weighted & RRF fusion)",
                          others: "Often vector-only focus",
                        },
                        {
                          aspect: "Protocols",
                          ferres: "REST + gRPC (streaming) + WebSocket",
                          others: "Usually REST or gRPC only",
                        },
                        {
                          aspect: "Storage",
                          ferres: "WAL + snapshots + tiered (Hot/Warm/Cold)",
                          others: "Not all offer WAL + crash recovery",
                        },
                        {
                          aspect: "Security",
                          ferres: "RBAC + API Keys + JWT + Audit Trail",
                          others: "Varies — often basic API keys only",
                        },
                        {
                          aspect: "Deployment",
                          ferres: "Single Docker container, no cloud lock-in",
                          others: "Many are managed-only or heavier",
                        },
                        {
                          aspect: "Observability",
                          ferres: "Prometheus + query profiling + dashboard",
                          others: "Depends on the product",
                        },
                      ].map((row) => (
                        <tr key={row.aspect} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-medium text-sm">{row.aspect}</td>
                          <td className="p-4 text-sm">
                            <span className="text-primary font-medium">{row.ferres}</span>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{row.others}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  INSTALLATION                                                     */}
      {/* ================================================================ */}
      <section id="install" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Quick Start</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Up and Running in 60 Seconds
              </h2>
              <p className="text-muted-foreground">
                Deploy the full stack with Docker Compose or run individual containers
              </p>
            </div>
          </AnimatedSection>

          <div className="mx-auto max-w-5xl">
            {/* Docker Compose - the recommended way */}
            <AnimatedSection delay={0.1}>
              <Card className="border-border bg-card p-6 mb-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Docker Compose</h3>
                    <p className="text-xs text-muted-foreground">Recommended — runs Backend + Dashboard together</p>
                  </div>
                  <Badge className="ml-auto bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/20">
                    Recommended
                  </Badge>
                </div>

                <div className="rounded-lg bg-background border border-border overflow-hidden">
                  <div className="border-b border-border bg-muted/50 px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">terminal</span>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm leading-relaxed overflow-x-auto">
                      <code className="text-primary">
                        <span className="text-muted-foreground"># 1. Pull both images</span>{'\n'}
                        docker pull ferresdb/ferres-db-core:latest{'\n'}
                        docker pull ferresdb/ferres-db-frontend:latest{'\n'}
                        {'\n'}
                        <span className="text-muted-foreground"># 2. Run the backend</span>{'\n'}
                        docker run -d -p 8080:8080 \{'\n'}
                        {'  '}-e FERRESDB_API_KEYS=sk-your-key \{'\n'}
                        {'  '}-e CORS_ORIGINS=http://localhost:3000 \{'\n'}
                        {'  '}-v ferres-data:/data \{'\n'}
                        {'  '}ferresdb/ferres-db-core:latest{'\n'}
                        {'\n'}
                        <span className="text-muted-foreground"># 3. Run the dashboard</span>{'\n'}
                        docker run -d -p 3000:80 \{'\n'}
                        {'  '}-e VITE_API_BASE_URL=http://localhost:8080 \{'\n'}
                        {'  '}-e VITE_API_KEY=sk-your-key \{'\n'}
                        {'  '}ferresdb/ferres-db-frontend:latest
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0 pulse-dot" />
                    <span className="text-muted-foreground">
                      API: <span className="text-foreground font-semibold">http://localhost:8080</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0 pulse-dot" />
                    <span className="text-muted-foreground">
                      Dashboard: <span className="text-foreground font-semibold">http://localhost:3000</span>
                    </span>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* SDKs */}
            <AnimatedSection delay={0.2}>
              <h3 className="mb-6 text-center text-2xl font-bold">Install an SDK</h3>
              <StaggeredCards className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
                <StaggeredCard>
                  <Card className="border-border bg-card p-6 hover:border-primary/20 transition-colors">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                          <Code2 className="h-4 w-4 text-blue-400" />
                        </div>
                        <h4 className="text-lg font-bold">TypeScript</h4>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">npm</Badge>
                    </div>
                    <div className="rounded-md bg-background border border-border p-3 mb-4">
                      <code className="text-xs text-primary">pnpm add @ferresdb/typescript-sdk</code>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Full type safety + Zod validation</div>
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> WebSocket support + auto-retry</div>
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> ESM & CJS exports</div>
                    </div>
                  </Card>
                </StaggeredCard>

                <StaggeredCard>
                  <Card className="border-border bg-card p-6 hover:border-primary/20 transition-colors">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                          <Terminal className="h-4 w-4 text-green-400" />
                        </div>
                        <h4 className="text-lg font-bold">Python</h4>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">PyPI</Badge>
                    </div>
                    <div className="rounded-md bg-background border border-border p-3 mb-4">
                      <code className="text-xs text-primary">pip install ferres-db-python</code>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> AsyncIO with httpx</div>
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Auto-batching + structured logs</div>
                      <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Python 3.8+ support</div>
                    </div>
                  </Card>
                </StaggeredCard>
              </StaggeredCards>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CODE EXAMPLE                                                     */}
      {/* ================================================================ */}
      <section className="border-t border-border py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Developer Experience</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Simple, Powerful API
              </h2>
              <p className="text-muted-foreground">
                From zero to vector search in under 10 lines of code
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mx-auto max-w-4xl">
              <Card className="border-border bg-card overflow-hidden">
                <div className="border-b border-border bg-muted/50 px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/20" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                      <div className="h-3 w-3 rounded-full bg-green-500/20" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">example.ts — TypeScript SDK</span>
                  </div>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm leading-relaxed">
                    <code className="text-muted-foreground">
                      <span className="text-primary">import</span> {'{'} VectorDBClient, DistanceMetric {'}'} <span className="text-primary">from</span> <span className="text-green-400">&quot;@ferresdb/typescript-sdk&quot;</span>;{'\n'}
                      {'\n'}
                      <span className="text-muted-foreground/60">{'// Initialize client with auto-retry and timeout'}</span>{'\n'}
                      <span className="text-primary">const</span> client = <span className="text-primary">new</span> <span className="text-blue-400">VectorDBClient</span>({'{'}{'{'}{'\n'}
                      {'  '}baseUrl: <span className="text-green-400">&quot;http://localhost:8080&quot;</span>,{'\n'}
                      {'  '}apiKey: <span className="text-green-400">&quot;ferres_sk_...&quot;</span>,{'\n'}
                      {'  '}maxRetries: <span className="text-yellow-400">3</span>,{'\n'}
                      {'}'});{'\n'}
                      {'\n'}
                      <span className="text-muted-foreground/60">{'// Create a collection with hybrid search enabled'}</span>{'\n'}
                      <span className="text-primary">await</span> client.<span className="text-blue-400">createCollection</span>({'{'}{'{'}{'\n'}
                      {'  '}name: <span className="text-green-400">&quot;documents&quot;</span>,{'\n'}
                      {'  '}dimension: <span className="text-yellow-400">384</span>,{'\n'}
                      {'  '}distance: DistanceMetric.<span className="text-yellow-400">Cosine</span>,{'\n'}
                      {'  '}enable_bm25: <span className="text-yellow-400">true</span>,{'\n'}
                      {'}'});{'\n'}
                      {'\n'}
                      <span className="text-muted-foreground/60">{'// Upsert vectors with metadata (auto-batches > 1000)'}</span>{'\n'}
                      <span className="text-primary">await</span> client.<span className="text-blue-400">upsertPoints</span>(<span className="text-green-400">&quot;documents&quot;</span>, [{'\n'}
                      {'  '}{'{'} id: <span className="text-green-400">&quot;doc-1&quot;</span>, vector: [<span className="text-yellow-400">0.1</span>, <span className="text-yellow-400">0.2</span>, ...], metadata: {'{'} text: <span className="text-green-400">&quot;Hello&quot;</span> {'}'} {'}'},{'\n'}
                      ]);{'\n'}
                      {'\n'}
                      <span className="text-muted-foreground/60">{'// Hybrid search: vector + BM25 with weighted fusion'}</span>{'\n'}
                      <span className="text-primary">const</span> results = <span className="text-primary">await</span> client.<span className="text-blue-400">hybridSearch</span>(<span className="text-green-400">&quot;documents&quot;</span>, {'{'}{'\n'}
                      {'  '}query_text: <span className="text-green-400">&quot;how to deploy&quot;</span>,{'\n'}
                      {'  '}query_vector: [<span className="text-yellow-400">0.1</span>, <span className="text-yellow-400">0.2</span>, ...],{'\n'}
                      {'  '}limit: <span className="text-yellow-400">5</span>,{'\n'}
                      {'  '}alpha: <span className="text-yellow-400">0.5</span>, <span className="text-muted-foreground/60">{'// 0 = BM25 only, 1 = vector only'}</span>{'\n'}
                      {'}'});
                    </code>
                  </pre>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  ENTERPRISE FEATURES                                              */}
      {/* ================================================================ */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Enterprise Ready</Badge>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Production-Grade from Day One
              </h2>
              <p className="text-pretty text-muted-foreground">
                Security, compliance, and operational features built-in — not bolted on.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredCards className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Dual Authentication",
                desc: "API Keys (SHA-256 hashed, stored in SQLite) for programmatic access. JWT tokens (Argon2 passwords) for dashboard sessions.",
              },
              {
                icon: Shield,
                title: "Granular RBAC",
                desc: "Admin, Editor, Viewer roles with per-collection permissions. Restrict access to specific metadata fields and allowed values.",
              },
              {
                icon: FileSearch,
                title: "Audit Trail",
                desc: "Every action logged: searches, mutations, logins, user management. Daily-rotated JSONL files with user, IP, duration, and result.",
              },
              {
                icon: Activity,
                title: "Query Profiling",
                desc: "Use /search/explain to understand query execution. /search/estimate for cost prediction. Slow query tracking for optimization.",
              },
              {
                icon: Box,
                title: "Metadata Filters",
                desc: "Rich filter operators: $eq, $ne, $in, $gt, $lt, $gte, $lte. Combine with vector search for precise, scoped retrieval.",
              },
              {
                icon: Gauge,
                title: "Budget-Aware Search",
                desc: "Set budget_ms on any search query. Automatically fails with 422 if the latency budget is exceeded — perfect for SLA enforcement.",
              },
            ].map((item) => (
              <StaggeredCard key={item.title}>
                <Card className="border-border bg-card p-6 h-full group hover:border-primary/20 transition-all duration-300">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              </StaggeredCard>
            ))}
          </StaggeredCards>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA SECTION                                                      */}
      {/* ================================================================ */}
      <section className="border-t border-border py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative container mx-auto px-4">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-5xl">
                Ready for <span className="text-shimmer">Blazing-Fast</span> Vector Search?
              </h2>
              <p className="mb-8 text-pretty text-muted-foreground md:text-lg">
                Join developers building the next generation of AI applications with FerresDB.
                Self-hosted, no cloud lock-in.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  <a href="#install">
                    Get Started with Docker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-border hover:bg-muted">
                  <a href="https://github.com/ferres-db" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <img src="/logo.png" alt="FerresDB" className="h-8 w-auto object-contain" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                High-performance vector search engine built in Rust. 
                Self-hosted, enterprise-ready.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/docs#getting-started" className="text-muted-foreground hover:text-primary transition-colors">Getting Started</a></li>
                <li><a href="/docs#api-reference" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="/docs#data-model" className="text-muted-foreground hover:text-primary transition-colors">Architecture</a></li>
                <li><a href="/docs#docker" className="text-muted-foreground hover:text-primary transition-colors">Installation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">SDKs & APIs</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/docs#sdk-typescript" className="text-muted-foreground hover:text-primary transition-colors">TypeScript SDK</a></li>
                <li><a href="/docs#sdk-python" className="text-muted-foreground hover:text-primary transition-colors">Python SDK</a></li>
                <li><a href="/docs#api-reference" className="text-muted-foreground hover:text-primary transition-colors">REST API</a></li>
                <li><a href="/docs#api-grpc" className="text-muted-foreground hover:text-primary transition-colors">gRPC API</a></li>
                <li><a href="/docs#api-websocket" className="text-muted-foreground hover:text-primary transition-colors">WebSocket</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/ferres-db" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="https://discord.gg/uudYmwjv7U" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2026 FerresDB. Built with Rust.</p>
            <div className="flex gap-4">
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
