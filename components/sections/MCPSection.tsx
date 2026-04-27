"use client";
import { useReveal } from "@/hooks/use-reveal";
import { CodeBlock } from "@/components/CodeBlock";

const BUILD_RAW = `cargo build -p ferres-db-server --features mcp --release`;
const ENV_RAW = `FERRESDB_ENABLE_MCP=true ./ferres-db-server --mcp`;

export function MCPSection() {
  const ref = useReveal();

  return (
    <section
      id="mcp"
      className="py-20"
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(249,115,22,0.08)",
      }}
    >
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="reveal mx-auto max-w-3xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">
            Claude Desktop Integration
          </p>
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-white md:text-3xl">
            Connect Claude Desktop to FerresDB
          </h2>
          <p className="mb-8 text-[#9CA3AF] leading-relaxed">
            FerresDB supports the Model Context Protocol (MCP). Use Claude Desktop to search,
            upsert, and explore your vector collections — directly from your AI assistant.
          </p>

          <div className="space-y-4 mb-8">
            <CodeBlock filename="terminal" language="bash" raw={BUILD_RAW}>
              <span className="text-[#6B7280]"># Build with MCP support</span>{"\n"}
              <span className="text-[#9CA3AF]">cargo build </span>
              <span className="text-[#f97316]">-p ferres-db-server</span>
              <span className="text-white"> --features mcp --release</span>
            </CodeBlock>

            <CodeBlock filename="terminal" language="bash" raw={ENV_RAW}>
              <span className="text-[#6B7280]"># Or enable via environment variable</span>{"\n"}
              <span className="text-[#34d399]">FERRESDB_ENABLE_MCP</span>
              <span className="text-white">=true ./ferres-db-server --mcp</span>
            </CodeBlock>
          </div>

          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs text-[#9CA3AF]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            Compatible with Claude Desktop · MCP via STDIO
          </span>
        </div>
      </div>
    </section>
  );
}
