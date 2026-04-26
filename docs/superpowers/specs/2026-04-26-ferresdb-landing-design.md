# FerresDB Landing Page — Design Spec
**Date:** 2026-04-26  
**Status:** Approved

---

## Overview

Complete rewrite of the FerresDB landing page (`ferres-db-lp-app`). The existing `app/page.tsx` is replaced from scratch. The page communicates technical clarity, speed, and open-source credibility for FerresDB — a high-performance vector search engine written in Rust.

---

## Decisions

| Question | Decision |
|---|---|
| Approach | Complete rewrite (not incremental update) |
| Title font | Syne 800 |
| Body font | IBM Plex Sans |
| Code/metric font | JetBrains Mono |
| Component structure | Split into `components/sections/` files |
| Animation library | CSS `@keyframes` + `IntersectionObserver` for reveals; framer-motion for navbar + hero stagger only |
| Dark mode | Always dark — no light mode |

---

## File Structure

```
app/
  layout.tsx              ← fonts, metadata, GA
  globals.css             ← CSS vars, keyframes, .reveal / .is-visible, dot-grid
  page.tsx                ← composes all sections, no logic

components/
  sections/
    Navbar.tsx
    HeroSection.tsx
    OpenSourceBanner.tsx
    FeaturesSection.tsx
    PerformanceSection.tsx
    QuickStartSection.tsx
    SDKsSection.tsx
    UseCasesSection.tsx
    MCPSection.tsx
    OpenSourceCTA.tsx
    Footer.tsx
  CodeBlock.tsx           ← filename label + language badge + copy button + pre/code
  AnimatedCounter.tsx     ← IntersectionObserver + rAF count-up
```

---

## Visual Identity

| Element | Value |
|---|---|
| Accent / CTA / metrics | `#f97316` |
| Background primary | `#1A1A1A` |
| Background alternate sections | `#111111` |
| Secondary text | `#9CA3AF` |
| Borders | `rgba(249,115,22,0.15)` |
| Cards/badges bg | `rgba(255,255,255,0.04)` |

All colors defined as CSS variables in `globals.css` and mapped through Tailwind config.

---

## Fonts

Loaded via `next/font/google`, injected as CSS variables:

- `--font-heading`: Syne (weights 700, 800)
- `--font-mono`: JetBrains Mono (weights 400, 700)
- `--font-body`: IBM Plex Sans (weights 400, 500)

Applied in `tailwind.config.ts` as `fontFamily.heading`, `fontFamily.mono`, `fontFamily.sans`. Geist fonts removed from `layout.tsx`.

---

## Sections (in render order)

### 1. Navbar
- Sticky, `backdrop-blur-md`, bottom border `rgba(249,115,22,0.15)`
- Logo: `● FerresDB` in JetBrains Mono, orange dot
- Inline badge: `MIT OR Apache-2.0` pill (gray, small)
- Links: Docs · SDK · Benchmarks · GitHub (hidden on mobile, shown md+)
- CTA button: `⭐ Star on GitHub` — outline style, `#f97316` border, links to `https://github.com/ferres-db/ferres-db`
- framer-motion: `motion.nav initial={{ y: -100 }} animate={{ y: 0 }}`

### 2. Hero
- Background: dot-grid (CSS radial-gradient repeat, slow `drift` keyframe) + orange blob glow top-right
- Badge: `🔓 Open Source — MIT OR Apache-2.0` with GitHub icon, micro-glow, links to repo
- Headline (Syne 800, large): "Vector search. / Built in Rust. / Sub-millisecond."
- Subtitle (IBM Plex Sans): "FerresDB is a high-performance vector search engine for semantic search, RAG pipelines, and recommendation systems. REST API, hybrid search, WAL persistence — production-ready from day one."
- CTAs: filled orange `Get Started` (anchor `#quickstart`) + outline `View on GitHub →`
- Metric counters (3): `~500μs P50 Latency` · `100K+ vectors/s Ingest Throughput` · `3 SDKs Rust · Python · TypeScript`
  - Numbers in JetBrains Mono orange, animated via `AnimatedCounter`
  - framer-motion `staggerChildren: 0.15` on metrics row

### 3. Open Source Banner
- Background `#111111`
- Centered: "FerresDB is fully open source. / Licensed under MIT OR Apache-2.0."
- 3 pills: ⭐ Star on GitHub · 🍴 Fork & Contribute · 🐛 Open an Issue
- Pill hover: fills with `#f97316`, text goes dark

### 4. Features
- Section heading: "Everything You Need, Nothing You Don't"
- Grid: 3×2 (desktop), 2×3 (tablet), 1 col (mobile)
- 6 cards: Sub-millisecond Search · Hybrid Search (Vector + BM25) · Written in Rust · WAL Persistence + Crash Recovery · Native MCP Support · Built-in Observability
- Each card: icon (inline SVG or lucide), title, description
- Hover: `box-shadow: 0 0 0 1px #f97316` transition

### 5. Performance
- Section heading: "Numbers that matter"
- Two columns: Indexing Throughput table + Search Latency table
- All numeric values in JetBrains Mono `#f97316`
- Footnote: "Reference hardware: Intel i7 / AMD Ryzen, 16GB RAM. Results vary with HNSW config and vector dimension."

### 6. Quick Start
- Section heading: "Up and running in 3 steps"
- Step 1: Docker Compose (two `CodeBlock` variants — compose and individual)
- Step 2: Create collection (curl)
- Step 3: Insert + Search (two curl commands in one block)
- Each `CodeBlock` has filename label, language badge, copy button

### 7. SDKs
- Section heading: "Official SDKs" · subtitle "Rust · Python · TypeScript — pick your language"
- 3 tabs via `useState<'typescript' | 'python' | 'rust'>('typescript')`
- Each tab: install command block + usage snippet block
- Tab content swap: CSS `display: none / block` (instant, no animation)

### 8. Use Cases
- 3 horizontal cards: Semantic Search · RAG Pipelines · Recommendation Systems
- Icon + title + description per card

### 9. MCP / Claude Desktop
- Background `#111111`
- Heading: "Connect Claude Desktop to FerresDB"
- Subtitle explaining MCP support
- Two `CodeBlock` snippets: cargo build with mcp feature + env var launch
- Badge: "Compatible with Claude Desktop · MCP via STDIO"

### 10. Open Source CTA
- Centered layout, large Syne headline: "Built in the open. / For everyone."
- Body text about MIT OR Apache-2.0
- 3 CTAs: ⭐ Star on GitHub (filled orange) · 📖 Read the Docs (outline) · 🤝 Contribute (outline)
- License line: "Licensed MIT OR Apache-2.0 · Conventional Commits · DCO signed contributions"

### 11. Footer
- Left: `● FerresDB` + tagline "High-performance vector search in Rust" + "MIT OR Apache-2.0"
- Right: links — GitHub · Docs · SDK · Contributing · License
- Bottom strip: copyright + Privacy · Terms · Contact

---

## Shared Components

### `CodeBlock`
Props: `filename: string`, `language: string`, `raw: string`, `children: React.ReactNode`  
`raw` is the plain-text string used for clipboard copy. `children` is the pre-rendered JSX with `<span>` token coloring.  
Structure: dark bg div → top bar (filename + language badge + copy icon button) → `<pre><code>{children}</code></pre>`.  
Copy: `navigator.clipboard.writeText(raw)` with brief "Copied!" feedback state.  
No runtime syntax highlighting library — token coloring via `<span>` wraps authored directly in each section component.

### `AnimatedCounter`
Props: `value: number`, `suffix?: string`, `prefix?: string`, `duration?: number`  
Uses `IntersectionObserver` to trigger, then `requestAnimationFrame` loop counting from 0 to `value` over `duration` (~1.8s). Returns `<span>` with formatted number.

---

## Animation Strategy

### CSS reveals (all sections except navbar/hero)
`globals.css` defines:
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { transition: none; } }
```
`useReveal(ref)` hook attaches `IntersectionObserver` and adds `.is-visible` on entry.  
Card stagger: `animation-delay` on `nth-child` via inline style (`index * 100ms`).

### framer-motion (2 uses only)
- `Navbar.tsx`: `motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}`
- `HeroSection.tsx`: `motion.div` wrapper on metrics row with `staggerChildren: 0.15`

### Hover
- Feature/use-case cards: `transition: box-shadow 0.2s ease` → `box-shadow: 0 0 0 1px #f97316`
- Navbar links: `transition: color 0.15s` → `color: #f97316`
- Open Source Banner pills: `transition: background 0.15s, color 0.15s` → filled `#f97316` bg

---

## Responsiveness

Breakpoints: 640px · 768px · 1024px · 1280px (Tailwind defaults).  
Features grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.  
Performance tables: stack on mobile (`flex-col`), side-by-side on `md+`.  
Navbar links hidden on mobile; hamburger menu **not** in scope (links omitted on small screens).

---

## Accessibility

- `aria-label` on all icon-only buttons (copy, GitHub star)
- WCAG AA contrast minimum throughout
- `prefers-reduced-motion` disables all CSS transitions
- All external links: `target="_blank" rel="noopener noreferrer"`

---

## Out of Scope

- Light mode
- Hamburger/mobile nav menu
- Blog, changelog, or docs pages (links point to GitHub)
- Backend integration or CMS
