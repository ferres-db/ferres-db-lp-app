"use client";
import { useReveal } from "@/hooks/use-reveal";
import { CodeBlock } from "@/components/CodeBlock";

const DOCKER_COMPOSE_RAW = `docker-compose up -d
# Backend: http://localhost:8080
# Dashboard: http://localhost:3000`;

const DOCKER_INDIVIDUAL_RAW = `docker pull ferresdb/ferres-db-core
docker run -d \\
  --name ferres-db-core \\
  -p 8080:8080 \\
  -e FERRESDB_API_KEYS=ferres_sk_your_key_here \\
  -v ferres-data:/data \\
  ferresdb/ferres-db-core`;

const CREATE_COLLECTION_RAW = `curl -X POST http://localhost:8080/api/v1/collections \\
  -H "Content-Type: application/json" \\
  -d '{"name":"docs","dimension":384,"distance":"Cosine"}'`;

const INSERT_SEARCH_RAW = `# Insert
curl -X POST http://localhost:8080/api/v1/collections/docs/points \\
  -H "Content-Type: application/json" \\
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,-0.1],"metadata":{"text":"Hello FerresDB"}}]}'

# Search
curl -X POST http://localhost:8080/api/v1/collections/docs/search \\
  -H "Content-Type: application/json" \\
  -d '{"vector":[0.1,0.2,-0.1],"limit":5}'`;

export function QuickStartSection() {
  const titleRef = useReveal();
  const stepsRef = useReveal();

  return (
    <section
      id="quickstart"
      className="scroll-mt-20 py-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Quick Start</p>
          <h2 className="font-heading text-2xl font-extrabold text-white md:text-3xl">
            Up and running in 3 steps
          </h2>
        </div>

        <div ref={stepsRef} className="reveal mx-auto max-w-3xl space-y-10">
          {/* Step 1 */}
          <div>
            <StepLabel number={1} title="Start with Docker Compose (recommended)" />
            <CodeBlock filename="terminal" language="bash" raw={DOCKER_COMPOSE_RAW}>
              <span className="text-[#f97316]">docker-compose up -d</span>{"\n"}
              <span className="text-[#6B7280]"># Backend: http://localhost:8080</span>{"\n"}
              <span className="text-[#6B7280]"># Dashboard: http://localhost:3000</span>
            </CodeBlock>

            <p className="mt-3 text-center text-xs text-[#9CA3AF]">— or run individual containers —</p>

            <div className="mt-3">
              <CodeBlock filename="terminal" language="bash" raw={DOCKER_INDIVIDUAL_RAW}>
                <span className="text-[#9CA3AF]">docker pull ferresdb/ferres-db-core</span>{"\n"}
                <span className="text-[#f97316]">docker run</span>
                <span className="text-white"> -d \</span>{"\n"}
                <span className="text-white">  --name ferres-db-core \</span>{"\n"}
                <span className="text-white">  -p 8080:8080 \</span>{"\n"}
                <span className="text-white">  -e </span>
                <span className="text-[#34d399]">FERRESDB_API_KEYS</span>
                <span className="text-white">=ferres_sk_your_key_here \</span>{"\n"}
                <span className="text-white">  -v ferres-data:/data \</span>{"\n"}
                <span className="text-[#9CA3AF]">  ferresdb/ferres-db-core</span>
              </CodeBlock>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <StepLabel number={2} title="Create a collection" />
            <CodeBlock filename="terminal" language="bash" raw={CREATE_COLLECTION_RAW}>
              <span className="text-[#f97316]">curl</span>
              <span className="text-white"> -X POST http://localhost:8080/api/v1/collections \</span>{"\n"}
              <span className="text-white">  -H </span>
              <span className="text-[#34d399]">"Content-Type: application/json"</span>
              <span className="text-white"> \</span>{"\n"}
              <span className="text-white">  -d </span>
              <span className="text-[#34d399]">{`'{"name":"docs","dimension":384,"distance":"Cosine"}'`}</span>
            </CodeBlock>
          </div>

          {/* Step 3 */}
          <div>
            <StepLabel number={3} title="Insert vectors and search" />
            <CodeBlock filename="terminal" language="bash" raw={INSERT_SEARCH_RAW}>
              <span className="text-[#6B7280]"># Insert</span>{"\n"}
              <span className="text-[#f97316]">curl</span>
              <span className="text-white"> -X POST http://localhost:8080/api/v1/collections/docs/points \</span>{"\n"}
              <span className="text-white">  -H </span>
              <span className="text-[#34d399]">"Content-Type: application/json"</span>
              <span className="text-white"> \</span>{"\n"}
              <span className="text-white">  -d </span>
              <span className="text-[#34d399]">{`'{"points":[{"id":"doc-1","vector":[0.1,0.2,-0.1],"metadata":{"text":"Hello FerresDB"}}]}'`}</span>
              {"\n\n"}
              <span className="text-[#6B7280]"># Search</span>{"\n"}
              <span className="text-[#f97316]">curl</span>
              <span className="text-white"> -X POST http://localhost:8080/api/v1/collections/docs/search \</span>{"\n"}
              <span className="text-white">  -H </span>
              <span className="text-[#34d399]">"Content-Type: application/json"</span>
              <span className="text-white"> \</span>{"\n"}
              <span className="text-white">  -d </span>
              <span className="text-[#34d399]">{`'{"vector":[0.1,0.2,-0.1],"limit":5}'`}</span>
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-black"
        style={{ background: "#f97316" }}
      >
        {number}
      </span>
      <span className="font-medium text-white">{title}</span>
    </div>
  );
}
