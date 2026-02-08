# ferres-db-lp-app

Landing page and documentation site for [FerresDB](https://github.com/ferres-db): a high-performance vector search engine for semantic search, RAG, and recommendations.

## Contents

- **Home** ? product overview and quick links
- **Docs** (`/docs`) ? full documentation:
  - Getting Started, Docker, Configuration, Authentication
  - API Reference (REST): Collections, Reindex, Points, Search (vector + hybrid with fusion strategies), Stats, API Keys, Users, Audit, Persistence, Tiered Storage, WebSocket, gRPC
  - Python and TypeScript SDKs
  - Data model (collections, points, distance metrics, HNSW, persistence)

## Tech stack

- [Next.js](https://nextjs.org/), React, TypeScript
- [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)

## Development

```bash
pnpm install
pnpm dev
```

```bash
  npm install
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Docs: [http://localhost:3000/docs](http://localhost:3000/docs).

## Changelog

Documentation is kept in sync with [FerresDB Core CHANGELOG](../ferres-db-core/CHANGELOG.md). Recent doc updates reflect: gRPC API, background reindex, hybrid search fusion strategies (weighted vs RRF), and tiered storage (Hot/Warm/Cold).
