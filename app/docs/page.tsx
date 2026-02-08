"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  Server,
  Key,
  Settings,
  BookOpen,
  Code2,
  Box,
  Shield,
  Search,
  Users,
  BarChart3,
  HardDrive,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Sidebar nav config                                                 */
/* ------------------------------------------------------------------ */
const sidebarSections = [
  { id: "getting-started", label: "Getting Started", icon: BookOpen },
  { id: "docker", label: "Docker Installation", icon: Server },
  { id: "configuration", label: "Configuration", icon: Settings },
  { id: "authentication", label: "Authentication", icon: Key },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Code2,
    children: [
      { id: "api-collections", label: "Collections" },
      { id: "api-reindex", label: "Reindex" },
      { id: "api-points", label: "Points" },
      { id: "api-search", label: "Search" },
      { id: "api-stats", label: "Stats & Metrics" },
      { id: "api-keys", label: "API Keys" },
      { id: "api-users", label: "Users" },
      { id: "api-audit", label: "Audit" },
      { id: "api-persistence", label: "Persistence" },
      { id: "api-tiered-storage", label: "Tiered Storage" },
      { id: "api-websocket", label: "WebSocket" },
      { id: "api-grpc", label: "gRPC" },
    ],
  },
  { id: "sdk-python", label: "Python SDK", icon: Code2 },
  { id: "sdk-typescript", label: "TypeScript SDK", icon: Code2 },
  { id: "data-model", label: "Data Model", icon: HardDrive },
];

/* ------------------------------------------------------------------ */
/*  Reusable code block component                                      */
/* ------------------------------------------------------------------ */
function CodeBlock({ children, filename }: { children: string; filename?: string }) {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      {filename && (
        <div className="border-b border-border bg-muted/50 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
          </div>
          <span className="text-xs text-muted-foreground ml-1">{filename}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          <code className="text-primary">{children}</code>
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable endpoint row component                                    */
/* ------------------------------------------------------------------ */
function Endpoint({
  method,
  path,
  description,
  auth,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  auth?: boolean;
}) {
  const colors: Record<string, string> = {
    GET: "bg-green-500/15 text-green-400 border-green-500/30",
    POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold shrink-0 ${colors[method]}`}>
          {method}
        </span>
        <code className="text-sm text-foreground break-all">{path}</code>
      </div>
      <div className="flex items-center gap-2 sm:ml-auto shrink-0">
        {auth !== false && (
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
            Auth
          </Badge>
        )}
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
      <div className="h-1 w-1 rounded-full bg-primary" />
      {children}
    </h2>
  );
}

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-xl font-bold mt-10 mb-4 scroll-mt-24">
      {children}
    </h3>
  );
}

/* ================================================================== */
/*  Main page                                                          */
/* ================================================================== */
export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top navigation ─────────────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="FerresDB" className="h-8 w-auto object-contain" />
            </a>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">Docs</Badge>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <a href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Home
            </a>
            <a href="#api-reference" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              API Reference
            </a>
            <a href="#sdk-python" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              SDKs
            </a>
          </div>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#docker">Get Started</a>
          </Button>
        </div>
      </nav>

      {/* ── Mobile sidebar overlay ────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Layout ────────────────────────────────────────────── */}
      <div className="container mx-auto flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 z-40 h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-border bg-background p-6 transition-transform lg:sticky lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-1">
            {sidebarSections.map((section) => (
              <div key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <section.icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </a>
                {section.children && (
                  <div className="ml-6 mt-1 space-y-0.5 border-l border-border pl-3">
                    {section.children.map((child) => (
                      <a
                        key={child.id}
                        href={`#${child.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ChevronRight className="h-3 w-3 shrink-0" />
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-10 lg:px-12">
          <div className="mx-auto max-w-4xl">
            {/* ── Hero ──────────────────────────────────────── */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">FerresDB Documentation</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Complete reference for the FerresDB high-performance vector search engine.
                Learn how to install, configure, and integrate FerresDB into your applications.
              </p>
            </div>

            {/* ============================================================ */}
            {/*  1. GETTING STARTED                                          */}
            {/* ============================================================ */}
            <SectionHeading id="getting-started">Getting Started</SectionHeading>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              FerresDB is a high-performance vector search engine written in Rust, designed for semantic search, RAG
              (Retrieval Augmented Generation), and recommendation systems. It features sub-millisecond search
              latency, HNSW-based approximate nearest-neighbor search, and hybrid BM25 text search.
            </p>

            <Card className="border-border bg-card p-6 mb-6">
              <h3 className="font-bold mb-4">Quick Start</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                  <span>Run FerresDB Core with Docker (see <a href="#docker" className="text-primary hover:underline">Docker Installation</a>)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                  <span>Optionally run the FerresDB Dashboard for a visual UI</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                  <span>Install an SDK (<a href="#sdk-typescript" className="text-primary hover:underline">TypeScript</a> or <a href="#sdk-python" className="text-primary hover:underline">Python</a>) or use the <a href="#api-reference" className="text-primary hover:underline">REST API</a> directly</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
                  <span>Create a collection, upsert vectors, and start searching</span>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <h3 className="font-bold mb-3">Key Features</h3>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary shrink-0" /> Sub-millisecond P50 search latency</div>
                <div className="flex items-center gap-2"><Box className="h-4 w-4 text-primary shrink-0" /> HNSW approximate nearest-neighbor</div>
                <div className="flex items-center gap-2"><Search className="h-4 w-4 text-primary shrink-0" /> Hybrid vector + BM25 text search</div>
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary shrink-0" /> API Key auth + RBAC + JWT dashboard</div>
                <div className="flex items-center gap-2"><HardDrive className="h-4 w-4 text-primary shrink-0" /> WAL + snapshots with crash recovery</div>
                <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary shrink-0" /> Prometheus metrics + query profiling</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary shrink-0" /> Dashboard with user management</div>
                <div className="flex items-center gap-2"><Code2 className="h-4 w-4 text-primary shrink-0" /> TypeScript, Python &amp; Rust SDKs</div>
                <div className="flex items-center gap-2"><Server className="h-4 w-4 text-primary shrink-0" /> Optional gRPC API (streaming, port 50051)</div>
                <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary shrink-0" /> Background reindex &amp; tiered storage (Hot/Warm/Cold)</div>
              </div>
            </Card>

            {/* ============================================================ */}
            {/*  2. DOCKER INSTALLATION                                      */}
            {/* ============================================================ */}
            <SectionHeading id="docker">Docker Installation</SectionHeading>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              The fastest way to get FerresDB running is with Docker. Official images are published to Docker Hub.
            </p>

            {/* Core */}
            <SubHeading id="docker-core">FerresDB Core (Backend API)</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              The Core image runs the FerresDB REST API server.
            </p>

            <CodeBlock filename="terminal">{`# Pull the latest image
docker pull ferresdb/ferres-db-core:latest

# Run the container
docker run -d \\
  -p 8080:8080 \\
  -e PORT=8080 \\
  -e CORS_ORIGINS=http://localhost:3000 \\
  -e FERRESDB_API_KEYS=sk-abcd1234 \\
  -v ferres-data:/data \\
  ferresdb/ferres-db-core:latest`}</CodeBlock>

            <div className="mt-4 rounded-lg bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Result:</span> API available at{" "}
              <code className="text-primary">http://localhost:8080</code>. Verify with{" "}
              <code className="text-primary">curl http://localhost:8080/health</code>
            </div>

            {/* Dashboard */}
            <SubHeading id="docker-dashboard">FerresDB Dashboard (Frontend)</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              The Dashboard provides a web UI for managing collections, browsing data, and monitoring performance.
            </p>

            <CodeBlock filename="terminal">{`# Pull the latest image
docker pull ferresdb/ferres-db-frontend:latest

# Run the container
docker run -d \\
  -p 3000:80 \\
  -e VITE_API_BASE_URL=http://localhost:8080 \\
  -e VITE_API_KEY=sk-abcd1234 \\
  ferresdb/ferres-db-frontend:latest`}</CodeBlock>

            <div className="mt-4 rounded-lg bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Result:</span> Dashboard available at{" "}
              <code className="text-primary">http://localhost:3000</code>. Default login:{" "}
              <code className="text-primary">root</code> / <code className="text-primary">ferresdb</code>
            </div>

            {/* Docker Compose */}
            <SubHeading id="docker-compose">Docker Compose (Full Stack)</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              Run both backend and frontend together with Docker Compose.
            </p>

            <CodeBlock filename="docker-compose.yml">{`version: "3.8"
services:
  backend:
    image: ferresdb/ferres-db-core:latest
    ports:
      - "\${BACKEND_PORT:-8080}:\${BACKEND_PORT:-8080}"
    volumes:
      - ferres-data:/data
    environment:
      - HOST=0.0.0.0
      - PORT=\${BACKEND_PORT:-8080}
      - STORAGE_PATH=/data
      - LOG_LEVEL=\${LOG_LEVEL:-info}
      - CORS_ORIGINS=\${CORS_ORIGINS:-http://localhost:3000}
      - FERRESDB_API_KEYS=\${FERRESDB_API_KEYS:-sk-abcd1234}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:\${BACKEND_PORT:-8080}/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  frontend:
    image: ferresdb/ferres-db-frontend:latest
    ports:
      - "\${FRONTEND_PORT:-3000}:80"
    environment:
      - VITE_API_BASE_URL=\${VITE_API_BASE_URL:-http://localhost:8080}
      - VITE_API_KEY=\${VITE_API_KEY:-sk-abcd1234}
    depends_on:
      backend:
        condition: service_healthy

volumes:
  ferres-data:`}</CodeBlock>

            <div className="mt-4 mb-2">
              <CodeBlock filename="terminal">{`docker compose up -d`}</CodeBlock>
            </div>

            {/* ============================================================ */}
            {/*  3. CONFIGURATION                                            */}
            {/* ============================================================ */}
            <SectionHeading id="configuration">Configuration</SectionHeading>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              FerresDB is configured through environment variables. These take precedence over values in{" "}
              <code className="text-primary">config.toml</code>.
            </p>

            <Card className="border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-semibold">Variable</th>
                      <th className="p-3 text-left font-semibold">Default</th>
                      <th className="p-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-3"><code className="text-primary text-xs">HOST</code></td><td className="p-3 text-muted-foreground text-xs">0.0.0.0</td><td className="p-3 text-muted-foreground text-xs">Server bind host</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">PORT</code></td><td className="p-3 text-muted-foreground text-xs">8080</td><td className="p-3 text-muted-foreground text-xs">Server port</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">STORAGE_PATH</code></td><td className="p-3 text-muted-foreground text-xs">/data</td><td className="p-3 text-muted-foreground text-xs">Path for persistent data (collections, WAL, indexes)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">LOG_LEVEL</code></td><td className="p-3 text-muted-foreground text-xs">info</td><td className="p-3 text-muted-foreground text-xs">Log level: trace, debug, info, warn, error</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">FERRESDB_API_KEYS</code></td><td className="p-3 text-muted-foreground text-xs">-</td><td className="p-3 text-muted-foreground text-xs">Comma-separated bootstrap API keys</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">FERRESDB_JWT_SECRET</code></td><td className="p-3 text-muted-foreground text-xs">(dev default)</td><td className="p-3 text-muted-foreground text-xs">JWT secret for dashboard sessions (change in production!)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">CORS_ORIGINS</code></td><td className="p-3 text-muted-foreground text-xs">localhost:*</td><td className="p-3 text-muted-foreground text-xs">Comma-separated allowed CORS origins</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">OTEL_EXPORTER_OTLP_ENDPOINT</code></td><td className="p-3 text-muted-foreground text-xs">localhost:4317</td><td className="p-3 text-muted-foreground text-xs">OpenTelemetry OTLP endpoint (when otel feature enabled)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">GRPC_PORT</code></td><td className="p-3 text-muted-foreground text-xs">50051</td><td className="p-3 text-muted-foreground text-xs">gRPC server port (when grpc feature enabled)</td></tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <p className="text-sm text-muted-foreground mb-4">
              <span className="text-foreground font-semibold">Precedence:</span> Environment variables &gt;{" "}
              <code className="text-primary">config.toml</code> &gt; defaults
            </p>

            <CodeBlock filename="config.toml">{`host = "0.0.0.0"
port = 8080
storage_path = "/data"
log_level = "info"
api_keys = "sk-my-secret-key"`}</CodeBlock>

            {/* ============================================================ */}
            {/*  4. AUTHENTICATION                                           */}
            {/* ============================================================ */}
            <SectionHeading id="authentication">Authentication</SectionHeading>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              FerresDB uses two authentication methods: <strong className="text-foreground">API Keys</strong> for programmatic
              access and <strong className="text-foreground">JWT tokens</strong> for the dashboard.
            </p>

            {/* API Key Auth */}
            <SubHeading id="auth-api-keys">API Key Authentication</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              All protected endpoints require an API key in the <code className="text-primary">Authorization</code> header.
            </p>

            <CodeBlock filename="HTTP request">{`Authorization: Bearer sk-abcd1234`}</CodeBlock>

            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">Bootstrap keys:</span> Set via{" "}
                <code className="text-primary">FERRESDB_API_KEYS</code> environment variable (comma-separated).
              </p>
              <p>
                <span className="text-foreground font-semibold">Managed keys:</span> Create/delete via the{" "}
                <a href="#api-keys" className="text-primary hover:underline">API Keys endpoints</a>.
                Keys are hashed with SHA-256 and stored in SQLite. The raw key is returned only once on creation.
              </p>
              <p>
                <span className="text-foreground font-semibold">Key format:</span>{" "}
                <code className="text-primary">ferres_sk_...</code> or <code className="text-primary">sk-...</code> (legacy).
              </p>
            </div>

            {/* JWT Auth */}
            <SubHeading id="auth-jwt">JWT Authentication (Dashboard)</SubHeading>

            <CodeBlock filename="POST /api/v1/auth/login">{`{
  "username": "root",
  "password": "ferresdb"
}

// Response:
{
  "token": "eyJhbGc...",
  "user": {
    "username": "root",
    "role": "admin"
  }
}`}</CodeBlock>

            <div className="mt-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-4 text-sm text-muted-foreground">
              <span className="text-yellow-400 font-semibold">Warning:</span> Change the default credentials
              (<code className="text-primary">root</code> / <code className="text-primary">ferresdb</code>) and{" "}
              <code className="text-primary">FERRESDB_JWT_SECRET</code> in production.
            </div>

            {/* RBAC */}
            <SubHeading id="auth-rbac">RBAC (Role-Based Access Control)</SubHeading>

            <Card className="border-border bg-card overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-semibold">Role</th>
                      <th className="p-3 text-left font-semibold">Permissions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-3"><Badge className="bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/20">Admin</Badge></td><td className="p-3 text-muted-foreground text-xs">Full access: users, audit, all collections, API keys</td></tr>
                    <tr><td className="p-3"><Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">Editor</Badge></td><td className="p-3 text-muted-foreground text-xs">Read, write, create collections</td></tr>
                    <tr><td className="p-3"><Badge className="bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/20">Viewer</Badge></td><td className="p-3 text-muted-foreground text-xs">Read-only: search, get, list</td></tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <p className="text-sm text-muted-foreground mb-4">
              Granular permissions can restrict access to specific collections and metadata fields:
            </p>

            <CodeBlock filename="RBAC permission example">{`{
  "username": "analyst",
  "role": "viewer",
  "permissions": [
    {
      "resource": { "type": "collection", "name": "sales-data" },
      "actions": ["read"],
      "metadata_restriction": {
        "field": "department",
        "allowed_values": ["sales"]
      }
    }
  ]
}`}</CodeBlock>

            {/* ============================================================ */}
            {/*  5. API REFERENCE                                            */}
            {/* ============================================================ */}
            <SectionHeading id="api-reference">API Reference</SectionHeading>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              Base URL: <code className="text-primary">http://localhost:8080/api/v1</code>. All protected endpoints
              require <code className="text-primary">Authorization: Bearer &lt;api-key&gt;</code>.
            </p>

            <div className="rounded-lg bg-muted/50 border border-border p-4 text-sm text-muted-foreground mb-8">
              <span className="text-foreground font-semibold">Public endpoints</span> (no auth required):{" "}
              <code className="text-primary">GET /health</code>,{" "}
              <code className="text-primary">GET /metrics</code>,{" "}
              <code className="text-primary">POST /api/v1/auth/login</code>
            </div>

            {/* ─── Collections ───────────────────────────────── */}
            <SubHeading id="api-collections">Collections</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="POST" path="/api/v1/collections" description="Create collection" />
              <Endpoint method="GET" path="/api/v1/collections" description="List all collections" />
              <Endpoint method="GET" path="/api/v1/collections/{name}" description="Get collection details" />
              <Endpoint method="DELETE" path="/api/v1/collections/{name}" description="Delete collection" />
            </Card>

            <Tabs defaultValue="create" className="mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="create">Create</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <CodeBlock filename="POST /api/v1/collections">{`{
  "name": "my_collection",
  "dimension": 384,
  "distance": "Cosine",
  "enable_bm25": false,
  "bm25_text_field": "text"
}

// distance options: "Cosine", "Euclidean", "DotProduct"
// enable_bm25: optional (default: false)
// bm25_text_field: optional (default: "text")`}</CodeBlock>
              </TabsContent>
              <TabsContent value="response">
                <CodeBlock filename="Response 200">{`{
  "name": "my_collection",
  "dimension": 384,
  "distance": "Cosine",
  "points_count": 0,
  "enable_bm25": false
}`}</CodeBlock>
              </TabsContent>
            </Tabs>

            {/* ─── Reindex ────────────────────────────────────── */}
            <SubHeading id="api-reindex">Reindex (Background)</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              Rebuild the ANN index in the background without downtime. Useful when tombstone count grows (e.g. after many
              deletions). Searches continue against the old index until the new one is built and swapped. Only one reindex
              job per collection at a time. Auto-reindex is triggered when tombstones exceed 20% of indexed points.
            </p>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="POST" path="/api/v1/collections/{name}/reindex" description="Start reindex job (returns 202 Accepted)" />
              <Endpoint method="GET" path="/api/v1/collections/{name}/reindex/{job_id}" description="Get reindex job status" />
              <Endpoint method="GET" path="/api/v1/collections/{name}/reindex" description="List reindex jobs for collection" />
            </Card>

            <CodeBlock filename="POST /api/v1/collections/{name}/reindex - Response 202">{`{
  "job_id": "uuid",
  "status": "building",
  "message": "Reindex started"
}`}</CodeBlock>

            {/* ─── Points ────────────────────────────────────── */}
            <SubHeading id="api-points">Points</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="POST" path="/api/v1/collections/{name}/points" description="Upsert points (max 1000/batch)" />
              <Endpoint method="GET" path="/api/v1/collections/{name}/points" description="List points (paginated)" />
              <Endpoint method="GET" path="/api/v1/collections/{name}/points/{id}" description="Get point by ID" />
              <Endpoint method="DELETE" path="/api/v1/collections/{name}/points" description="Delete points by IDs" />
            </Card>

            <Tabs defaultValue="upsert" className="mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="upsert">Upsert</TabsTrigger>
                <TabsTrigger value="delete">Delete</TabsTrigger>
              </TabsList>
              <TabsContent value="upsert">
                <CodeBlock filename="POST /api/v1/collections/{name}/points">{`{
  "points": [
    {
      "id": "doc-1",
      "vector": [0.1, 0.2, -0.1, ...],
      "metadata": {
        "text": "Hello world",
        "category": "greeting"
      }
    },
    {
      "id": "doc-2",
      "vector": [0.3, -0.1, 0.5, ...],
      "metadata": {
        "text": "Goodbye world",
        "category": "farewell"
      }
    }
  ]
}

// Max 1000 points per batch
// Vector dimension must match collection
// Existing IDs are updated (upsert)`}</CodeBlock>
              </TabsContent>
              <TabsContent value="delete">
                <CodeBlock filename="DELETE /api/v1/collections/{name}/points">{`{
  "ids": ["doc-1", "doc-2"]
}`}</CodeBlock>
              </TabsContent>
            </Tabs>

            {/* ─── Search ────────────────────────────────────── */}
            <SubHeading id="api-search">Search</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="POST" path="/api/v1/collections/{name}/search" description="Vector search" />
              <Endpoint method="POST" path="/api/v1/collections/{name}/search/hybrid" description="Hybrid search (vector + BM25)" />
              <Endpoint method="POST" path="/api/v1/collections/{name}/search/explain" description="Search with explanation" />
              <Endpoint method="POST" path="/api/v1/collections/{name}/search/estimate" description="Estimate search cost" />
            </Card>

            <Tabs defaultValue="vector" className="mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="vector">Vector Search</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid Search</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>
              <TabsContent value="vector">
                <CodeBlock filename="POST /api/v1/collections/{name}/search">{`{
  "vector": [0.1, 0.2, -0.1, ...],
  "limit": 5,
  "filter": {
    "category": "tech",
    "price": { "$gte": 10, "$lte": 100 }
  },
  "budget_ms": 50
}

// filter: optional metadata filter
// budget_ms: optional, fails with 422 if exceeded
// Filter operators: $eq, $ne, $in, $gt, $lt, $gte, $lte`}</CodeBlock>
              </TabsContent>
              <TabsContent value="hybrid">
                <CodeBlock filename="POST /api/v1/collections/{name}/search/hybrid">{`{
  "query_text": "how to deploy",
  "query_vector": [0.1, 0.2, -0.1, ...],
  "limit": 5,
  "fusion": "weighted",
  "alpha": 0.5,
  "rrf_k": 60
}

// fusion: "weighted" (default) or "rrf"
// weighted: alpha = weight vector (1.0) vs BM25 (0.0). Default alpha: 0.5
// rrf: Reciprocal Rank Fusion; rrf_k constant (default: 60). No alpha.
// Requires collection with enable_bm25: true`}</CodeBlock>
              </TabsContent>
              <TabsContent value="response">
                <CodeBlock filename="Response 200">{`{
  "results": [
    {
      "id": "doc-1",
      "score": 0.95,
      "metadata": {
        "text": "Hello world",
        "category": "greeting"
      }
    }
  ],
  "took_ms": 0.42
}`}</CodeBlock>
              </TabsContent>
            </Tabs>

            {/* ─── Stats & Metrics ───────────────────────────── */}
            <SubHeading id="api-stats">Stats &amp; Metrics</SubHeading>

            <Card className="border-border bg-card p-4 mb-6">
              <Endpoint method="GET" path="/health" description="Health check" auth={false} />
              <Endpoint method="GET" path="/metrics" description="Prometheus metrics" auth={false} />
              <Endpoint method="GET" path="/api/v1/stats/global" description="Global statistics" auth={false} />
              <Endpoint method="GET" path="/api/v1/stats/queries" description="Recent queries (24h)" auth={false} />
              <Endpoint method="GET" path="/api/v1/stats/slow-queries" description="Slow queries" auth={false} />
              <Endpoint method="GET" path="/api/v1/stats/feedback" description="Query feedback stats" auth={false} />
              <Endpoint method="GET" path="/api/v1/collections/{name}/stats" description="Collection statistics" />
              <Endpoint method="GET" path="/api/v1/debug/query-profile/{query_id}" description="Query execution profile" auth={false} />
            </Card>

            {/* ─── API Keys Management ───────────────────────── */}
            <SubHeading id="api-keys">API Keys Management</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="GET" path="/api/v1/keys" description="List API keys (metadata only)" />
              <Endpoint method="POST" path="/api/v1/keys" description="Create new API key" />
              <Endpoint method="DELETE" path="/api/v1/keys/{id}" description="Delete API key" />
            </Card>

            <CodeBlock filename="POST /api/v1/keys - Response">{`{
  "id": "key_abc123",
  "key": "ferres_sk_full_raw_key_shown_once",
  "prefix": "ferres_sk_full...",
  "created_at": "2026-02-07T12:00:00Z"
}

// The raw key is returned ONLY on creation.
// Store it securely - it cannot be retrieved later.`}</CodeBlock>

            {/* ─── Users ─────────────────────────────────────── */}
            <SubHeading id="api-users">Users Management</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="GET" path="/api/v1/users" description="List users (Admin only)" />
              <Endpoint method="POST" path="/api/v1/users" description="Create user (Admin only)" />
              <Endpoint method="DELETE" path="/api/v1/users/{id}" description="Delete user (Admin only)" />
              <Endpoint method="PUT" path="/api/v1/users/{username}/password" description="Update password (Admin only)" />
              <Endpoint method="PUT" path="/api/v1/users/{username}/permissions" description="Update permissions (Admin only)" />
            </Card>

            <CodeBlock filename="POST /api/v1/users">{`{
  "username": "analyst",
  "password": "secure-password",
  "role": "viewer",
  "permissions": [
    {
      "resource": { "type": "collection", "name": "sales" },
      "actions": ["read"]
    }
  ]
}

// Roles: "admin", "editor", "viewer"
// Passwords hashed with Argon2`}</CodeBlock>

            {/* ─── Audit ─────────────────────────────────────── */}
            <SubHeading id="api-audit">Audit Trail</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="GET" path="/api/v1/audit" description="Query audit trail (Admin only)" />
            </Card>

            <p className="text-sm text-muted-foreground mb-4">
              The audit trail logs all significant actions: logins, searches, data mutations, user management, and more.
              Logs are stored in daily-rotated JSONL files at{" "}
              <code className="text-primary">{"{STORAGE_PATH}"}/logs/audit-{"{date}"}.jsonl</code>.
            </p>

            <CodeBlock filename="Audit log entry example">{`{
  "timestamp": "2026-02-07T14:30:00Z",
  "user_id": "analyst",
  "action": "search",
  "resource": "collection:sales-data",
  "details": { "query_id": "...", "limit": 10 },
  "result": "success",
  "ip_address": "192.168.1.100",
  "duration_ms": 3
}`}</CodeBlock>

            {/* ─── Persistence ───────────────────────────────── */}
            <SubHeading id="api-persistence">Persistence</SubHeading>

            <Card className="border-border bg-card p-4 mb-6">
              <Endpoint method="POST" path="/api/v1/save" description="Force save all collections to disk" />
            </Card>

            <p className="text-sm text-muted-foreground mb-2">
              FerresDB automatically saves dirty collections every 30 seconds and on graceful shutdown.
              Use the save endpoint to force an immediate flush.
            </p>

            {/* ─── Tiered Storage ────────────────────────────── */}
            <SubHeading id="api-tiered-storage">Tiered Storage</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              Opt-in feature to move vectors between Hot (RAM), Warm (mmap), and Cold (disk) tiers based on access
              frequency. The HNSW graph stays in memory; only point data is tiered. Use this endpoint to inspect
              distribution and estimated memory per tier.
            </p>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="GET" path="/api/v1/collections/{name}/tiers" description="Get tier distribution and estimated memory" />
            </Card>

            {/* ─── WebSocket ─────────────────────────────────── */}
            <SubHeading id="api-websocket">WebSocket</SubHeading>

            <Card className="border-border bg-card p-4 mb-4">
              <Endpoint method="GET" path="/api/v1/ws" description="WebSocket endpoint (HTTP upgrade)" />
            </Card>

            <p className="text-sm text-muted-foreground mb-2">
              Authenticate via query parameter <code className="text-primary">?token=sk-xxx</code> or{" "}
              <code className="text-primary">Authorization</code> header. Limits: 100 max connections, 10 MB max
              message size, 30s heartbeat, 5 min inactivity timeout.
            </p>

            {/* ─── gRPC ─────────────────────────────────────── */}
            <SubHeading id="api-grpc">gRPC API</SubHeading>

            <p className="text-muted-foreground mb-4 text-sm">
              FerresDB can expose a native <strong className="text-foreground">gRPC</strong> API (feature flag <code className="text-primary">grpc</code>) as a
              high-performance alternative to REST, with bidirectional streaming. The gRPC server listens on port{" "}
              <code className="text-primary">50051</code> (configurable via <code className="text-primary">GRPC_PORT</code>). When enabled, it runs in
              parallel with the REST API. The same RPCs mirror the REST API: collections CRUD, points upsert/delete/list,
              Search, HybridSearch, ExplainSearch, plus <code className="text-primary">StreamUpsert</code> and{" "}
              <code className="text-primary">StreamSearch</code>. Metadata and filters are sent as JSON strings. See the
              core repo <code className="text-primary">docs/api.md</code> and <code className="text-primary">crates/server/proto/ferresdb.proto</code> for
              full mapping and client generation (Python, TypeScript, Go).
            </p>

            <Card className="border-border bg-card p-4 mb-4">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">Default port:</span> <code className="text-primary">50051</code> — set{" "}
                <code className="text-primary">GRPC_PORT</code> to override. Requires <code className="text-primary">protoc</code> at build time when the
                gRPC feature is enabled.
              </div>
            </Card>

            {/* ============================================================ */}
            {/*  6. PYTHON SDK                                               */}
            {/* ============================================================ */}
            <SectionHeading id="sdk-python">Python SDK</SectionHeading>

            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">PyPI</Badge>
              <code className="text-sm text-primary">pip install ferres-db-python</code>
            </div>

            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              The Python SDK provides an async client built on <code className="text-primary">httpx</code> with
              automatic retry, structured logging, and type hints. Includes <code className="text-primary">RealtimeClient</code> for
              WebSocket streaming (upsert, subscribe to collection events). Requires Python 3.8+. Optional dependency: <code className="text-primary">websockets&gt;=12.0</code> for RealtimeClient.
            </p>

            <Tabs defaultValue="setup" className="mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="collection">Collections</TabsTrigger>
                <TabsTrigger value="upsert">Upsert</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
                <TabsTrigger value="realtime">Realtime</TabsTrigger>
              </TabsList>
              <TabsContent value="setup">
                <CodeBlock filename="setup.py">{`import asyncio
from vector_db_client import VectorDBClient, Point, DistanceMetric

async def main():
    async with VectorDBClient(
        base_url="http://localhost:8080",
        api_key="ferres_sk_...",
        timeout=30,
    ) as client:
        # create_collection, upsert_points, search, etc.
        pass

asyncio.run(main())`}</CodeBlock>
              </TabsContent>
              <TabsContent value="collection">
                <CodeBlock filename="create_collection.py">{`# Create a collection (optional: enable_bm25, bm25_text_field,
# quantization=QuantizationConfig.scalar_int8(), tiered_storage=...)
collection = await client.create_collection(
    name="my-collection",
    dimension=384,
    distance=DistanceMetric.COSINE,
    enable_bm25=True,
)

# List / get / delete
collections = await client.list_collections()
detail = await client.get_collection("my-collection")
await client.delete_collection("my-collection")`}</CodeBlock>
              </TabsContent>
              <TabsContent value="upsert">
                <CodeBlock filename="upsert_points.py">{`from vector_db_client import Point

points = [
    Point(id="doc-1", vector=[0.1, 0.2, 0.3, ...], metadata={"text": "Hello world", "category": "greeting"}),
    Point(id="doc-2", vector=[0.4, 0.5, 0.6, ...], metadata={"text": "Goodbye world", "category": "farewell"}),
]

# Upsert (auto-batches if > 1000). Returns UpsertResult(upserted, failed)
result = await client.upsert_points("my-collection", points)

# Get / list points
point = await client.get_point("my-collection", "doc-1")
page = await client.list_points("my-collection", limit=100, offset=0)`}</CodeBlock>
              </TabsContent>
              <TabsContent value="search">
                <CodeBlock filename="search.py">{`# Vector search — returns SearchResponse(results, took_ms, query_id)
response = await client.search(
    collection="my-collection",
    vector=[0.1, 0.2, 0.3, ...],
    limit=10,
    filter={"category": "greeting"},
    budget_ms=50,  # optional; raises BudgetExceededError if exceeded
)

for result in response.results:
    print(f"{result.id}: {result.score}  {result.metadata}")

# Cost estimate (no search executed)
estimate = await client.estimate_search_cost("my-collection", limit=10, include_history=True)
# Explain (why each result was returned)
explanation = await client.search_explain("my-collection", vector=[...], limit=5)`}</CodeBlock>
              </TabsContent>
              <TabsContent value="hybrid">
                <CodeBlock filename="hybrid_search.py">{`# Hybrid search (vector + BM25). Collection must have enable_bm25=True
response = await client.hybrid_search(
    collection="my-collection",
    query_text="how to deploy",
    query_vector=[0.1, 0.2, ...],
    limit=5,
    fusion="weighted",  # or "rrf"
    alpha=0.5,         # for weighted: 0=BM25, 1=vector
    rrf_k=60,           # for fusion "rrf"
)
for result in response.results:
    print(f"{result.id}: {result.score}")`}</CodeBlock>
              </TabsContent>
              <TabsContent value="realtime">
                <CodeBlock filename="realtime.py">{`from vector_db_client import RealtimeClient, Point

# WebSocket client (requires: pip install websockets>=12.0)
async with RealtimeClient("http://localhost:8080", api_key="ferres_sk_...") as rt:
    # Upsert over WebSocket
    ack = await rt.upsert("my-collection", [Point("id-1", [0.1, 0.2], {"text": "hi"})])
    print(f"Upserted {ack.upserted} in {ack.took_ms}ms")

    # Subscribe to collection events (upsert/delete)
    rt.on_event(lambda evt: print(f"Event: {evt.action} on {evt.collection}"))
    await rt.subscribe("my-collection", events=["upsert", "delete"])
    await asyncio.sleep(60)`}</CodeBlock>
              </TabsContent>
            </Tabs>

            <Card className="border-border bg-card p-4">
              <h4 className="font-semibold mb-3 text-sm">SDK Features</h4>
              <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Full type hints</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Automatic retry with exponential backoff</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Structured logging (structlog)</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Auto-batching (&gt;1000 points)</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Async/await (httpx)</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Python 3.8+ support</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> RealtimeClient: WebSocket upsert + event subscription</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> estimate_search_cost, search_explain</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Quantization (SQ8) &amp; tiered storage (Hot/Warm/Cold)</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> API keys: list_keys, create_key, delete_key</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Reindex: start_reindex, get_reindex_job, list_reindex_jobs</div>
              </div>
            </Card>

            {/* ============================================================ */}
            {/*  7. TYPESCRIPT SDK                                           */}
            {/* ============================================================ */}
            <SectionHeading id="sdk-typescript">TypeScript SDK</SectionHeading>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge className="bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/20">npm</Badge>
              <code className="text-sm text-primary">pnpm add @ferresdb/typescript-sdk</code>
              <span className="text-muted-foreground text-xs">or npm / yarn</span>
            </div>

            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              The TypeScript SDK provides a fully-typed client with automatic retry, runtime validation via Zod,
              and <code className="text-primary">RealtimeClient</code> for WebSocket streaming (upsert, subscribe to collection events).
              Works with Node.js 18+, Deno, and browser environments.
            </p>

            <Tabs defaultValue="setup" className="mb-6">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="collection">Collections</TabsTrigger>
                <TabsTrigger value="upsert">Upsert</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
                <TabsTrigger value="realtime">Realtime</TabsTrigger>
              </TabsList>
              <TabsContent value="setup">
                <CodeBlock filename="setup.ts">{`import { VectorDBClient, DistanceMetric } from "@ferresdb/typescript-sdk";

const client = new VectorDBClient({
  baseUrl: "http://localhost:8080",
  apiKey: "ferres_sk_...",
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
});`}</CodeBlock>
              </TabsContent>
              <TabsContent value="collection">
                <CodeBlock filename="collections.ts">{`// Create a collection (optional: quantization, tiered_storage)
const collection = await client.createCollection({
  name: "documents",
  dimension: 384,
  distance: DistanceMetric.Cosine,
  enable_bm25: true,
});

// List / get / delete
const collections = await client.listCollections();
const detail = await client.getCollection("documents");
await client.deleteCollection("documents");`}</CodeBlock>
              </TabsContent>
              <TabsContent value="upsert">
                <CodeBlock filename="upsert.ts">{`// Upsert points (auto-batches if > 1000). Returns UpsertResult
const result = await client.upsertPoints("documents", [
  { id: "doc-1", vector: [0.1, 0.2, -0.1, ...], metadata: { text: "Hello world", category: "greeting" } },
  { id: "doc-2", vector: [0.3, -0.1, 0.5, ...], metadata: { text: "Goodbye world", category: "farewell" } },
]);

// Get point / list points (paginated)
const point = await client.getPoint("documents", "doc-1");
const page = await client.listPoints("documents", { limit: 100, offset: 0 });`}</CodeBlock>
              </TabsContent>
              <TabsContent value="search">
                <CodeBlock filename="search.ts">{`// Vector search — returns { results, took_ms, query_id? }
const response = await client.search("documents", {
  vector: [0.1, 0.2, -0.1, ...],
  limit: 5,
  filter: { category: "greeting" },
  budget_ms: 50,  // optional; throws BudgetExceededError if exceeded
});

for (const result of response.results) {
  console.log(\`\${result.id}: \${result.score}\`, result.metadata);
}

// Cost estimate (no search executed)
const estimate = await client.estimateSearchCost("documents", { limit: 10, include_history: true });
// Explain (why each result was returned)
const explanation = await client.searchExplain("documents", { vector: [...], limit: 5 });`}</CodeBlock>
              </TabsContent>
              <TabsContent value="hybrid">
                <CodeBlock filename="hybrid_search.ts">{`// Hybrid search (vector + BM25). Collection must have enable_bm25: true
const response = await client.hybridSearch("documents", {
  query_text: "how to deploy",
  query_vector: [0.1, 0.2, -0.1, ...],
  limit: 5,
  fusion: "weighted",
  alpha: 0.5,
  rrf_k: 60,
});
for (const result of response.results) {
  console.log(\`\${result.id}: \${result.score}\`);
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="realtime">
                <CodeBlock filename="realtime.ts">{`import { RealtimeClient } from "@ferresdb/typescript-sdk";

const rt = new RealtimeClient({ baseUrl: "http://localhost:8080", apiKey: "ferres_sk_..." });
await rt.connect();

// Upsert over WebSocket
const ack = await rt.upsert("documents", [{ id: "1", vector: [0.1, 0.2], metadata: { text: "hi" } }]);
console.log(\`Upserted \${ack.upserted} in \${ack.took_ms}ms\`);

// Subscribe to collection events
rt.on("event", (evt) => console.log(\`Event: \${evt.action} on \${evt.collection}\`));
await rt.subscribe("documents", ["upsert", "delete"]);
await rt.close();`}</CodeBlock>
              </TabsContent>
            </Tabs>

            <Card className="border-border bg-card p-4">
              <h4 className="font-semibold mb-3 text-sm">SDK Features</h4>
              <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Full TypeScript types</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Runtime validation with Zod</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Automatic retry with backoff</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Auto-batching (&gt;1000 points)</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> RealtimeClient: WebSocket upsert + event subscription</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> ESM and CJS exports</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> estimateSearchCost, searchExplain</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Quantization (SQ8) &amp; tiered storage config</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> API keys: listKeys, createKey, deleteKey</div>
                <div className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-primary" /> Reindex: startReindex, getReindexJob, listReindexJobs</div>
              </div>
            </Card>

            {/* ============================================================ */}
            {/*  8. DATA MODEL                                               */}
            {/* ============================================================ */}
            <SectionHeading id="data-model">Data Model</SectionHeading>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              FerresDB organizes data into <strong className="text-foreground">collections</strong> of{" "}
              <strong className="text-foreground">points</strong>. Each point contains a vector, a unique ID, and
              arbitrary JSON metadata.
            </p>

            {/* Collections */}
            <SubHeading id="dm-collections">Collections</SubHeading>

            <p className="text-sm text-muted-foreground mb-4">
              A collection is a named container with a fixed vector dimension and distance metric.
              All points in a collection must have vectors of the same dimension.
            </p>

            <Card className="border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-semibold">Property</th>
                      <th className="p-3 text-left font-semibold">Type</th>
                      <th className="p-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-3"><code className="text-primary text-xs">name</code></td><td className="p-3 text-muted-foreground text-xs">string</td><td className="p-3 text-muted-foreground text-xs">Unique name (a-zA-Z0-9_-)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">dimension</code></td><td className="p-3 text-muted-foreground text-xs">integer</td><td className="p-3 text-muted-foreground text-xs">Vector dimension (1 - 4096)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">distance</code></td><td className="p-3 text-muted-foreground text-xs">enum</td><td className="p-3 text-muted-foreground text-xs">Cosine, Euclidean, or DotProduct</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">enable_bm25</code></td><td className="p-3 text-muted-foreground text-xs">boolean</td><td className="p-3 text-muted-foreground text-xs">Enable BM25 text index (default: false)</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">bm25_text_field</code></td><td className="p-3 text-muted-foreground text-xs">string</td><td className="p-3 text-muted-foreground text-xs">Metadata field for BM25 indexing (default: &quot;text&quot;)</td></tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Points */}
            <SubHeading id="dm-points">Points</SubHeading>

            <CodeBlock filename="Point structure">{`{
  "id": "unique-string-id",
  "vector": [0.1, 0.2, -0.1, ...],  // f32 values, length = collection dimension
  "metadata": {                       // arbitrary JSON object
    "text": "content for BM25",
    "category": "example",
    "price": 42.5
  }
}`}</CodeBlock>

            {/* Distance Metrics */}
            <SubHeading id="dm-distance">Distance Metrics</SubHeading>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card className="border-border bg-card p-4">
                <h4 className="font-bold mb-2 text-sm">Cosine</h4>
                <p className="text-xs text-muted-foreground mb-2">Range: [0, 1] (1 = identical)</p>
                <p className="text-xs text-muted-foreground">Best for: NLP embeddings, semantic similarity. Vectors are L2-normalized internally.</p>
              </Card>
              <Card className="border-border bg-card p-4">
                <h4 className="font-bold mb-2 text-sm">Euclidean</h4>
                <p className="text-xs text-muted-foreground mb-2">{"Range: [0, ∞)"}</p>
                <p className="text-xs text-muted-foreground">Best for: Spatial data, image features. Measures straight-line distance.</p>
              </Card>
              <Card className="border-border bg-card p-4">
                <h4 className="font-bold mb-2 text-sm">Dot Product</h4>
                <p className="text-xs text-muted-foreground mb-2">{"Range: (-∞, ∞)"}</p>
                <p className="text-xs text-muted-foreground">Best for: Pre-normalized vectors, recommendation systems.</p>
              </Card>
            </div>

            {/* HNSW */}
            <SubHeading id="dm-hnsw">HNSW Index</SubHeading>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              FerresDB uses the <strong className="text-foreground">Hierarchical Navigable Small World (HNSW)</strong>{" "}
              algorithm for approximate nearest-neighbor search. It builds a multi-layer graph structure enabling
              sub-millisecond queries even on large datasets.
            </p>

            <Card className="border-border bg-card overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-semibold">Parameter</th>
                      <th className="p-3 text-left font-semibold">Default</th>
                      <th className="p-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-3"><code className="text-primary text-xs">m</code></td><td className="p-3 text-muted-foreground text-xs">16</td><td className="p-3 text-muted-foreground text-xs">Max connections per layer</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">ef_construction</code></td><td className="p-3 text-muted-foreground text-xs">200</td><td className="p-3 text-muted-foreground text-xs">Search width during index construction</td></tr>
                    <tr><td className="p-3"><code className="text-primary text-xs">ef_search</code></td><td className="p-3 text-muted-foreground text-xs">50</td><td className="p-3 text-muted-foreground text-xs">Search width during query</td></tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Persistence */}
            <SubHeading id="dm-persistence">Persistence Model</SubHeading>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              FerresDB uses a WAL (Write-Ahead Log) with periodic snapshots for durability. On crash recovery,
              the latest snapshot is loaded and the WAL is replayed.
            </p>

            <CodeBlock filename="Storage layout">{`{STORAGE_PATH}/
├── collections/
│   └── {name}/
│       ├── points.jsonl       # Current state
│       ├── wal.jsonl          # Write-ahead log (append-only)
│       ├── snapshot.jsonl     # Periodic snapshots (every 1000 ops)
│       └── index.bin          # HNSW index (binary)
├── api_keys.db                # SQLite: API keys (SHA-256 hashed)
├── users.db                   # SQLite: users (Argon2 passwords)
└── logs/
    ├── queries.log            # Query log (JSONL)
    └── audit-{date}.jsonl     # Daily audit trail`}</CodeBlock>

            <div className="mt-6 mb-16 rounded-lg bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Auto-save:</span> Dirty collections are saved every 30
              seconds in the background. All collections are saved on graceful shutdown. Snapshots are created
              every 1000 write operations to keep WAL size bounded.
            </div>

            {/* ── Footer ─────────────────────────────────────── */}
            <Separator className="my-8" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground pb-8">
              <p>&copy; 2024 FerresDB. Built with Rust.</p>
              <div className="flex gap-4">
                <a href="/" className="hover:text-primary">Home</a>
                <a href="https://github.com/ferres-db" target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Lucide icon used inline in features list ──────────────────────── */
function Zap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  );
}
