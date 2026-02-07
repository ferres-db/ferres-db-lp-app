import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Zap, Database, Shield, BarChart3, Code2, Gauge } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Database className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FerresDB</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#performance" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Performance
            </a>
            <a href="#install" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Docs
            </a>
            <a href="#install" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Install
            </a>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#install">Get Started</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            Built with Rust
          </Badge>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span className="text-balance">High-Performance</span>
            <br />
            <span className="text-balance text-primary">Vector Search Engine</span>
          </h1>
          <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
            FerresDB delivers sub-millisecond search latency for semantic search, RAG, and recommendation systems.
            Built in Rust for uncompromising performance and reliability.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#install">
                Get Started with Docker
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent">
              <a href="#install">View Documentation</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-primary">{'<500μs'}</div>
              <div className="text-sm text-muted-foreground">P50 Search Latency</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Vectors/Second</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Rust Powered</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="text-3xl font-bold text-primary">HNSW</div>
              <div className="text-sm text-muted-foreground">ANN Algorithm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Built for Speed, Designed for Scale
            </h2>
            <p className="mb-12 text-pretty text-muted-foreground">
              FerresDB combines the performance of Rust with advanced vector search algorithms
              to deliver unmatched speed and reliability.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sub-millisecond search latency with P50 at ~100-500μs. No GC pauses,
                predictable low-latency execution with Rust.
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Persistent Storage</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                WAL (Write-Ahead Log) with periodic snapshots and automatic crash recovery.
                Your data is always safe.
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Production Ready</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thread-safe, type-safe, with API Keys, health checks, and Prometheus metrics.
                Built for production workloads.
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Hybrid Search</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vector search with Cosine, Euclidean, or Dot Product metrics. Plus BM25
                text search for hybrid retrieval.
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Official SDKs</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TypeScript and Python SDKs available. REST API for any language.
                Built for developer experience.
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Observability</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prometheus metrics, health checks, query profiling, and a web dashboard
                for monitoring and debugging.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Performance That Speaks for Itself
              </h2>
              <p className="text-pretty text-muted-foreground">
                Benchmarked with Criterion.rs on modern hardware
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Indexing Performance */}
              <Card className="border-border bg-card p-6">
                <h3 className="mb-6 text-2xl font-bold">Indexing Throughput</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <div className="font-semibold">1K vectors</div>
                      <div className="text-sm text-muted-foreground">Small collections</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">50K-100K</div>
                      <div className="text-sm text-muted-foreground">points/sec</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <div className="font-semibold">10K vectors</div>
                      <div className="text-sm text-muted-foreground">Medium collections</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">30K-60K</div>
                      <div className="text-sm text-muted-foreground">points/sec</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <div className="font-semibold">100K vectors</div>
                      <div className="text-sm text-muted-foreground">Large collections</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">20K-40K</div>
                      <div className="text-sm text-muted-foreground">points/sec</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Search Latency */}
              <Card className="border-border bg-card p-6">
                <h3 className="mb-6 text-2xl font-bold">Search Latency</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <div className="font-semibold">P50 Latency</div>
                      <div className="text-sm text-muted-foreground">Median performance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">100-500μs</div>
                      <div className="text-sm text-muted-foreground">microseconds</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <div className="font-semibold">P95 Latency</div>
                      <div className="text-sm text-muted-foreground">95th percentile</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">200-1000μs</div>
                      <div className="text-sm text-muted-foreground">microseconds</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <div className="font-semibold">P99 Latency</div>
                      <div className="text-sm text-muted-foreground">99th percentile</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">500-2000μs</div>
                      <div className="text-sm text-muted-foreground">microseconds</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Why It's Fast */}
            <Card className="mt-8 border-border bg-card p-8">
              <h3 className="mb-6 text-2xl font-bold">Why FerresDB is Fast</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-semibold">Rust Foundation</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No garbage collection pauses, predictable low-latency execution, and memory safety without runtime overhead.
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-semibold">HNSW Algorithm</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hierarchical Navigable Small World graphs optimized for fast approximate nearest-neighbor search with excellent recall.
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-semibold">Thread-Safe Design</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ready for multi-threaded servers and concurrent requests. Parallelized batch operations with Rayon.
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-semibold">Smart Caching</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Optional LRU cache reduces repeated work. Configurable search cache for common queries.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              FerresDB vs Conventional Vector Databases
            </h2>
            <Card className="border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="p-4 text-left font-semibold">Aspect</th>
                      <th className="p-4 text-left font-semibold">FerresDB</th>
                      <th className="p-4 text-left font-semibold">Conventional DBs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">Performance</td>
                      <td className="p-4 text-sm">
                        <span className="text-primary font-semibold">Rust + HNSW</span> with latency in microseconds (P50 ~100–500 μs)
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Many in Python/Go; typically higher latency
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">Persistence</td>
                      <td className="p-4 text-sm">
                        <span className="text-primary font-semibold">WAL + snapshots</span> with automatic crash recovery
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Not all offer WAL + recovery
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">Search</td>
                      <td className="p-4 text-sm">
                        Vector (Cosine, Euclidean, Dot) + <span className="text-primary font-semibold">hybrid BM25</span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Often vector-only focus
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">Operations</td>
                      <td className="p-4 text-sm">
                        <span className="text-primary font-semibold">Thread-safe, type-safe</span>, API Keys, dashboard, Prometheus
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Depends on the product
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="p-4 font-medium">Deploy</td>
                      <td className="p-4 text-sm">
                        <span className="text-primary font-semibold">Single stack</span> (Docker/API), no cloud lock-in
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Many are managed-only or heavier
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Get Started in Minutes
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Choose your preferred installation method
            </p>

            {/* Official Docker Images */}
            <Card className="border-border bg-card p-6 max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Official Docker Images</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pull and run official FerresDB images to get started quickly.
                </p>
              </div>

              <div className="space-y-6">
                {/* Backend */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Backend</Badge>
                    <h4 className="font-semibold">FerresDB Core API</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-md bg-background p-3">
                      <div className="text-xs text-muted-foreground mb-1">1. Pull the image:</div>
                      <code className="text-sm text-primary">docker pull ferresdb/ferres-db-core</code>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <div className="text-xs text-muted-foreground mb-1">2. Run the container:</div>
                      <code className="text-sm text-primary break-all">
                        docker run -d -p 8080:8080 -e PORT=8080 -e CORS_ORIGINS=http://localhost:3000 -e FERRESDB_API_KEYS=sk-abcd1234 -v ferres-data:/data ferresdb/ferres-db-core:latest
                      </code>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      API available at <span className="text-foreground font-semibold">http://localhost:8080</span>
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Frontend */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Frontend</Badge>
                    <h4 className="font-semibold">FerresDB Dashboard</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-md bg-background p-3">
                      <div className="text-xs text-muted-foreground mb-1">1. Pull the image:</div>
                      <code className="text-sm text-primary">docker pull ferresdb/ferres-db-frontend</code>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <div className="text-xs text-muted-foreground mb-1">2. Run the container:</div>
                      <code className="text-sm text-primary break-all">
                        docker run -d -p 3000:80 -e VITE_API_BASE_URL=http://localhost:8080 -e VITE_API_KEY=sk-abcd1234 ferresdb/ferres-db-frontend:latest
                      </code>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Dashboard available at <span className="text-foreground font-semibold">http://localhost:3000</span>
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="rounded-lg bg-muted/50 p-4">
                <h5 className="font-semibold text-sm mb-2">Environment Variables</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Customize with environment variables using <code className="text-primary">-e</code> flag: ports,
                  storage paths, API keys, and more. See documentation for full list.
                </p>
              </div>
            </Card>

            {/* SDKs */}
            <div className="mt-12">
              <h3 className="mb-6 text-center text-2xl font-bold">Official SDKs</h3>
              <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
                <Card className="border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-bold">TypeScript</h4>
                    <Badge variant="outline" className="text-primary border-primary">SDK</Badge>
                  </div>
                  <div className="rounded-md bg-background p-3 mb-4">
                    <code className="text-xs text-primary break-all">pnpm add @ferres-db/typescript-sdk</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Full type safety with async/await support. Perfect for Node.js and browser environments.
                  </p>
                </Card>

                <Card className="border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-bold">Python</h4>
                    <Badge variant="outline" className="text-primary border-primary">SDK</Badge>
                  </div>
                  <div className="rounded-md bg-background p-3 mb-4">
                    <code className="text-xs text-primary">pip install ferres-db-python</code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AsyncIO support for high performance. Ideal for ML and data science workflows.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Simple, Developer-Friendly API
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Get started with just a few lines of code
            </p>

            <Card className="border-border bg-card overflow-hidden">
              <div className="border-b border-border bg-muted/50 px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">example.ts</span>
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code className="text-muted-foreground">
                    <span className="text-primary">import</span> {'{'} VectorDBClient, DistanceMetric {'}'} <span className="text-primary">from</span> <span className="text-green-400">"@ferres-db/typescript-sdk"</span>;{'\n'}
                    {'\n'}
                    <span className="text-primary">const</span> client = <span className="text-primary">new</span> <span className="text-blue-400">VectorDBClient</span>({'{'}{'{'}{'\n'}
                    {'  '}baseUrl: <span className="text-green-400">"http://localhost:8080"</span>,{'\n'}
                    {'  '}apiKey: <span className="text-green-400">"ferres_sk_..."</span>,{'\n'}
                    {'}'});{'\n'}
                    {'\n'}
                    <span className="text-muted-foreground">{'// Create a collection'}</span>{'\n'}
                    <span className="text-primary">const</span> collection = <span className="text-primary">await</span> client.<span className="text-blue-400">createCollection</span>({'{'}{'{'}{'\n'}
                    {'  '}name: <span className="text-green-400">"documents"</span>,{'\n'}
                    {'  '}dimension: <span className="text-yellow-400">384</span>,{'\n'}
                    {'  '}distance: DistanceMetric.<span className="text-yellow-400">Cosine</span>,{'\n'}
                    {'}'});{'\n'}
                    {'\n'}
                    <span className="text-muted-foreground">{'// Insert vectors'}</span>{'\n'}
                    <span className="text-primary">await</span> client.<span className="text-blue-400">upsertPoints</span>(<span className="text-green-400">"documents"</span>, [{'\n'}
                    {'  '}{'{'} id: <span className="text-green-400">"doc-1"</span>, vector: [<span className="text-yellow-400">0.1</span>, <span className="text-yellow-400">0.2</span>, ...], metadata: {'{'} text: <span className="text-green-400">"Hello"</span> {'}'} {'}'},{'\n'}
                    ]);{'\n'}
                    {'\n'}
                    <span className="text-muted-foreground">{'// Search'}</span>{'\n'}
                    <span className="text-primary">const</span> results = <span className="text-primary">await</span> client.<span className="text-blue-400">search</span>(<span className="text-green-400">"documents"</span>, {'{'}{'\n'}
                    {'  '}vector: [<span className="text-yellow-400">0.1</span>, <span className="text-yellow-400">0.2</span>, ...],{'\n'}
                    {'  '}limit: <span className="text-yellow-400">5</span>,{'\n'}
                    {'}'});
                  </code>
                </pre>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Experience Blazing-Fast Vector Search?
            </h2>
            <p className="mb-8 text-pretty text-muted-foreground md:text-lg">
              Join developers building the next generation of semantic search and RAG applications with FerresDB.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#install">
                  Get Started with Docker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <a href="https://github.com/ferres-db" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Database className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">FerresDB</span>
              </div>
              <p className="text-sm text-muted-foreground">
                High-performance vector search engine built in Rust.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Getting Started</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Architecture</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">SDKs</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">TypeScript SDK</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Python SDK</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">REST API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">GitHub</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 FerresDB. Built with Rust.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
