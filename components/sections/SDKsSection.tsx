"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { CodeBlock } from "@/components/CodeBlock";

type Tab = "typescript" | "python" | "rust";

const TS_INSTALL_RAW = `pnpm add @ferres-db/typescript-sdk`;
const TS_USAGE_RAW = `import { VectorDBClient, DistanceMetric } from "@ferres-db/typescript-sdk";

const client = new VectorDBClient({
  baseUrl: "http://localhost:8080",
  apiKey: "ferres_sk_...",
});

await client.upsertPoints("documents", [
  { id: "doc-1", vector: [0.1, 0.2, 0.3], metadata: { text: "Hello" } },
]);

const results = await client.search("documents", {
  vector: [0.1, 0.2, 0.3],
  limit: 5,
});`;

const PY_INSTALL_RAW = `pip install ferres-db-python`;
const PY_USAGE_RAW = `from vector_db_client import VectorDBClient, Point, DistanceMetric
import asyncio

async def main():
    async with VectorDBClient(
        base_url="http://localhost:8080",
        api_key="ferres_sk_...",
    ) as client:
        await client.upsert_points("my-collection", [
            Point(id="1", vector=[0.1, 0.2, 0.3], metadata={"text": "hello"}),
        ])
        results = await client.search(
            collection="my-collection",
            vector=[0.1, 0.2, 0.3],
            limit=10,
        )

asyncio.run(main())`;

const RUST_INSTALL_RAW = `[dependencies]
ferres-db-sdk = "0.1"`;
const RUST_USAGE_RAW = `use ferres_db_sdk::FerresDbClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = FerresDbClient::new("http://localhost:8080");
    let response = client
        .hybrid_search("docs", "semantic query", &vec![0.1; 384], 5, 0.5)
        .await?;
    for item in response.results {
        println!("{} — score: {:.4}", item.id, item.score);
    }
    Ok(())
}`;

export function SDKsSection() {
  const [active, setActive] = useState<Tab>("typescript");
  const titleRef = useReveal();
  const contentRef = useReveal();

  return (
    <section
      id="sdks"
      className="py-20"
      style={{ background: "#111111", borderTop: "1px solid rgba(249,115,22,0.08)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Official SDKs</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
            Rust · Python · TypeScript
          </h2>
          <p className="mt-3 text-[#9CA3AF]">pick your language</p>
        </div>

        <div ref={contentRef} className="reveal mx-auto max-w-3xl">
          {/* Tab bar */}
          <div className="mb-6 flex gap-2">
            {(["typescript", "python", "rust"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`sdk-tab${active === tab ? " active" : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* TypeScript */}
          {active === "typescript" && (
            <div className="space-y-4">
              <CodeBlock filename="terminal" language="bash" raw={TS_INSTALL_RAW}>
                <span className="text-[#9CA3AF]">pnpm add </span>
                <span className="text-[#34d399]">@ferres-db/typescript-sdk</span>
              </CodeBlock>
              <CodeBlock filename="example.ts" language="typescript" raw={TS_USAGE_RAW}>
                <span className="text-[#60a5fa]">import</span>
                <span className="text-white">{" { VectorDBClient, DistanceMetric } "}</span>
                <span className="text-[#60a5fa]">from</span>
                <span className="text-[#34d399]"> "@ferres-db/typescript-sdk"</span>
                <span className="text-white">;</span>{"\n\n"}
                <span className="text-[#60a5fa]">const</span>
                <span className="text-white"> client = </span>
                <span className="text-[#60a5fa]">new</span>
                <span className="text-[#f97316]"> VectorDBClient</span>
                <span className="text-white">{"({"}</span>{"\n"}
                <span className="text-white">{"  baseUrl: "}</span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">{","}</span>{"\n"}
                <span className="text-white">{"  apiKey: "}</span>
                <span className="text-[#34d399]">"ferres_sk_..."</span>
                <span className="text-white">{","}</span>{"\n"}
                <span className="text-white">{"});"}</span>{"\n\n"}
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">upsertPoints</span>
                <span className="text-white">{"(\"documents\", ["}</span>{"\n"}
                <span className="text-white">{"  { id: "}</span>
                <span className="text-[#34d399]">"doc-1"</span>
                <span className="text-white">{", vector: [0.1, 0.2, 0.3], metadata: { text: "}</span>
                <span className="text-[#34d399]">"Hello"</span>
                <span className="text-white">{" } },"}</span>{"\n"}
                <span className="text-white">{"]);"}</span>{"\n\n"}
                <span className="text-[#60a5fa]">const</span>
                <span className="text-white"> results = </span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">search</span>
                <span className="text-white">{"(\"documents\", {"}</span>{"\n"}
                <span className="text-white">{"  vector: [0.1, 0.2, 0.3],"}</span>{"\n"}
                <span className="text-white">{"  limit: 5,"}</span>{"\n"}
                <span className="text-white">{"});"}</span>
              </CodeBlock>
            </div>
          )}

          {/* Python */}
          {active === "python" && (
            <div className="space-y-4">
              <CodeBlock filename="terminal" language="bash" raw={PY_INSTALL_RAW}>
                <span className="text-[#9CA3AF]">pip install </span>
                <span className="text-[#34d399]">ferres-db-python</span>
              </CodeBlock>
              <CodeBlock filename="example.py" language="python" raw={PY_USAGE_RAW}>
                <span className="text-[#60a5fa]">from</span>
                <span className="text-white"> vector_db_client </span>
                <span className="text-[#60a5fa]">import</span>
                <span className="text-white">{" VectorDBClient, Point, DistanceMetric\n"}</span>
                <span className="text-[#60a5fa]">import</span>
                <span className="text-white">{" asyncio\n\n"}</span>
                <span className="text-[#60a5fa]">async def</span>
                <span className="text-[#f97316]"> main</span>
                <span className="text-white">{"():\n"}</span>
                <span className="text-white">{"    "}</span>
                <span className="text-[#60a5fa]">async with</span>
                <span className="text-[#f97316]"> VectorDBClient</span>
                <span className="text-white">{"(\n"}</span>
                <span className="text-white">{"        base_url="}</span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">{",\n"}</span>
                <span className="text-white">{"        api_key="}</span>
                <span className="text-[#34d399]">"ferres_sk_..."</span>
                <span className="text-white">{",\n"}</span>
                <span className="text-white">{"    ) "}</span>
                <span className="text-[#60a5fa]">as</span>
                <span className="text-white">{" client:\n"}</span>
                <span className="text-white">{"        "}</span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white">{" client."}</span>
                <span className="text-[#f97316]">upsert_points</span>
                <span className="text-white">{"(\"my-collection\", [\n"}</span>
                <span className="text-white">{"            Point(id="}</span>
                <span className="text-[#34d399]">"1"</span>
                <span className="text-white">{", vector=[0.1, 0.2, 0.3], metadata={\"text\": \"hello\"}),\n"}</span>
                <span className="text-white">{"        ])\n"}</span>
                <span className="text-white">{"        results = "}</span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white">{" client."}</span>
                <span className="text-[#f97316]">search</span>
                <span className="text-white">{"(\n"}</span>
                <span className="text-white">{"            collection="}</span>
                <span className="text-[#34d399]">"my-collection"</span>
                <span className="text-white">{",\n            vector=[0.1, 0.2, 0.3],\n            limit="}</span>
                <span className="text-[#f97316]">10</span>
                <span className="text-white">{",\n        )\n\n"}</span>
                <span className="text-[#f97316]">asyncio</span>
                <span className="text-white">.</span>
                <span className="text-[#f97316]">run</span>
                <span className="text-white">(main())</span>
              </CodeBlock>
            </div>
          )}

          {/* Rust */}
          {active === "rust" && (
            <div className="space-y-4">
              <CodeBlock filename="Cargo.toml" language="toml" raw={RUST_INSTALL_RAW}>
                <span className="text-[#6B7280]">[dependencies]</span>{"\n"}
                <span className="text-[#34d399]">ferres-db-sdk</span>
                <span className="text-white"> = </span>
                <span className="text-[#34d399]">"0.1"</span>
              </CodeBlock>
              <CodeBlock filename="main.rs" language="rust" raw={RUST_USAGE_RAW}>
                <span className="text-[#60a5fa]">use</span>
                <span className="text-white"> ferres_db_sdk::FerresDbClient;</span>{"\n\n"}
                <span className="text-[#f97316]">#[tokio::main]</span>{"\n"}
                <span className="text-[#60a5fa]">async fn</span>
                <span className="text-[#f97316]"> main</span>
                <span className="text-white">{"() -> "}</span>
                <span className="text-[#34d399]">Result</span>
                <span className="text-white">{"<(), Box<dyn std::error::Error>> {"}</span>{"\n"}
                <span className="text-white">{"    "}</span>
                <span className="text-[#60a5fa]">let</span>
                <span className="text-white">{" client = FerresDbClient::new("}</span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">{");"}</span>{"\n"}
                <span className="text-white">{"    "}</span>
                <span className="text-[#60a5fa]">let</span>
                <span className="text-white">{" response = client"}</span>{"\n"}
                <span className="text-white">{"        ."}</span>
                <span className="text-[#f97316]">hybrid_search</span>
                <span className="text-white">{"("}</span>
                <span className="text-[#34d399]">"docs"</span>
                <span className="text-white">{", "}</span>
                <span className="text-[#34d399]">"semantic query"</span>
                <span className="text-white">{", &vec![0.1; 384], 5, 0.5)"}</span>{"\n"}
                <span className="text-white">{"        .await?;"}</span>{"\n"}
                <span className="text-[#60a5fa]">{"    for"}</span>
                <span className="text-white">{" item "}</span>
                <span className="text-[#60a5fa]">in</span>
                <span className="text-white">{" response.results {"}</span>{"\n"}
                <span className="text-white">{"        println!("}</span>
                <span className="text-[#34d399]">{`"{} — score: {:.4}"`}</span>
                <span className="text-white">{", item.id, item.score);"}</span>{"\n"}
                <span className="text-white">{"    }"}</span>{"\n"}
                <span className="text-[#f97316]">{"    Ok"}</span>
                <span className="text-white">{"(())"}</span>{"\n"}
                <span className="text-white">{"}"}</span>
              </CodeBlock>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
