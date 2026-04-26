# FerresDB Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete rewrite of the FerresDB landing page into 11 section components with Syne/JetBrains Mono/IBM Plex Sans fonts, CSS-driven scroll reveals, and framer-motion only for navbar/hero.

**Architecture:** `app/page.tsx` composes 11 stateless section components from `components/sections/`. Two shared components (`CodeBlock`, `AnimatedCounter`) and a `useReveal` hook are extracted. Scroll animations use CSS `.reveal`/`.is-visible` with `IntersectionObserver`; framer-motion is used only in `Navbar` and `HeroSection`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, framer-motion 12, lucide-react, next/font/google (Syne + JetBrains Mono + IBM Plex Sans)

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `app/layout.tsx` | Replace Geist with 3 new fonts, apply CSS vars |
| Modify | `app/globals.css` | Remove Arial, add `.reveal`, `.dot-grid`, `.blob-glow` |
| Modify | `tailwind.config.ts` | Add `fontFamily.heading`, override `sans` and `mono` |
| Modify | `app/page.tsx` | Replace with section composition |
| Create | `hooks/use-reveal.ts` | IntersectionObserver hook → adds `.is-visible` |
| Create | `components/AnimatedCounter.tsx` | Count-up on scroll |
| Create | `components/CodeBlock.tsx` | Filename + lang badge + copy button + pre |
| Create | `components/sections/Navbar.tsx` | Sticky nav with framer slide-in |
| Create | `components/sections/HeroSection.tsx` | Hero: dot-grid, badge, headline, CTAs, metrics |
| Create | `components/sections/OpenSourceBanner.tsx` | OS banner with 3 pills |
| Create | `components/sections/FeaturesSection.tsx` | 3×2 feature card grid |
| Create | `components/sections/PerformanceSection.tsx` | Performance numbers |
| Create | `components/sections/QuickStartSection.tsx` | 3-step quickstart |
| Create | `components/sections/SDKsSection.tsx` | SDK tabs (TS / Python / Rust) |
| Create | `components/sections/UseCasesSection.tsx` | 3 use case cards |
| Create | `components/sections/MCPSection.tsx` | Claude Desktop MCP section |
| Create | `components/sections/OpenSourceCTA.tsx` | Open source CTA |
| Create | `components/sections/Footer.tsx` | Footer |

> **Note:** No automated test framework exists in this project. "Verify" steps use `npm run dev` + browser inspection.

---

## Task 1: Foundation — Fonts, CSS, Tailwind

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file with:

```tsx
import React from "react"
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Syne, JetBrains_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const GA_MEASUREMENT_ID = 'G-58EP4LQ7LC'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FerresDB — High-Performance Vector Search in Rust',
  description: 'FerresDB is a high-performance vector search engine written in Rust for semantic search, RAG, and recommendation systems. Sub-millisecond latency, hybrid search, WAL persistence. MIT OR Apache-2.0.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable}`}>
      <body className="font-body antialiased">
        {children}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update `tailwind.config.ts`**

Replace the `theme.extend` section. The full file:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
```

- [ ] **Step 3: Update `app/globals.css`**

Replace the entire file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance { text-wrap: balance; }
}

@layer base {
  :root {
    --background: 0 0% 10.2%;
    --foreground: 0 0% 98%;
    --card: 0 0% 12%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 12%;
    --popover-foreground: 0 0% 98%;
    --primary: 24 95% 53%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 20%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 18%;
    --muted-foreground: 0 0% 65%;
    --accent: 24 95% 53%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 24 95% 53%;
    --radius: 0.75rem;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}

/* ── Scroll reveal ───────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; }
}

/* ── Hero dot-grid ───────────────────────────────────────── */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(249,115,22,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  animation: drift 20s linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes drift {
  from { background-position: 0 0; }
  to   { background-position: 0 56px; }
}

/* ── Hero blob glow ──────────────────────────────────────── */
.blob-glow {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 65%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

/* ── Open Source Banner pills ────────────────────────────── */
.pill-link {
  border: 1px solid rgba(249,115,22,0.3);
  border-radius: 9999px;
  padding: 6px 18px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9CA3AF;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.pill-link:hover {
  background: #f97316;
  color: #000;
  border-color: #f97316;
}

/* ── Feature/use-case card hover glow ────────────────────── */
.feature-card {
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.feature-card:hover {
  box-shadow: 0 0 0 1px #f97316;
  border-color: #f97316 !important;
}

/* ── SDK tab button ─────────────────────────────────────── */
.sdk-tab {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid transparent;
  color: #9CA3AF;
  background: transparent;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}
.sdk-tab:hover { color: #f97316; }
.sdk-tab.active {
  color: #f97316;
  border-color: rgba(249,115,22,0.4);
  background: rgba(249,115,22,0.08);
}

/* ── Hero glow (kept for docs page) ─────────────────────── */
.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, hsl(24 95% 53% / 0.15) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}

/* ── Shimmer effect ──────────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.text-shimmer {
  background: linear-gradient(90deg, hsl(24 95% 53%) 0%, hsl(24 95% 70%) 25%, hsl(40 95% 60%) 50%, hsl(24 95% 70%) 75%, hsl(24 95% 53%) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}

/* ── Pulse dot ───────────────────────────────────────────── */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.5); }
}
.pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

/* ── Scrollbar ───────────────────────────────────────────── */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: hsl(0 0% 10.2%); }
::-webkit-scrollbar-thumb { background: hsl(0 0% 25%); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: hsl(0 0% 35%); }
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000`. Open DevTools → Network → Fonts. Confirm 3 font requests: Syne, JetBrains_Mono, IBM_Plex_Sans. Body text should no longer use Arial.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.ts
git commit -m "feat: update fonts to Syne/JetBrains Mono/IBM Plex Sans and add CSS animation utilities"
```

---

## Task 2: Hooks & Shared Components

**Files:**
- Create: `hooks/use-reveal.ts`
- Create: `components/AnimatedCounter.tsx`
- Create: `components/CodeBlock.tsx`

- [ ] **Step 1: Create `hooks/use-reveal.ts`**

```ts
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 2: Create `components/AnimatedCounter.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let current = 0;
          const totalFrames = duration * 60;
          const increment = value / totalFrames;
          const tick = () => {
            current += increment;
            if (current >= value) {
              setCount(value);
            } else {
              setCount(Math.floor(current));
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}
```

- [ ] **Step 3: Create `components/CodeBlock.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  filename: string;
  language: string;
  raw: string;
  children: React.ReactNode;
}

export function CodeBlock({ filename, language, raw, children }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ background: "#0d0d0d", border: "1px solid rgba(249,115,22,0.15)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid rgba(249,115,22,0.1)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#9CA3AF]">{filename}</span>
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[10px]"
            style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-[#9CA3AF] transition-colors hover:text-[#f97316]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify no TS errors**

```bash
npx tsc --noEmit
```

Expected: 0 errors (or only pre-existing errors from `ignoreBuildErrors: true`).

- [ ] **Step 5: Commit**

```bash
git add hooks/use-reveal.ts components/AnimatedCounter.tsx components/CodeBlock.tsx
git commit -m "feat: add useReveal hook, AnimatedCounter, and CodeBlock shared components"
```

---

## Task 3: Navbar

**Files:**
- Create: `components/sections/Navbar.tsx`

- [ ] **Step 1: Create `components/sections/Navbar.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 z-50 w-full"
      style={{
        background: "rgba(26,26,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(249,115,22,0.15)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + license badge */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold">
              <span className="text-[#f97316]">●</span>
              <span className="ml-1 text-white">FerresDB</span>
            </span>
          </a>
          <span
            className="hidden sm:inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] text-[#9CA3AF]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            MIT OR Apache-2.0
          </span>
        </div>

        {/* Nav links (hidden on mobile) */}
        <div className="hidden items-center gap-6 md:flex">
          {[
            { label: "Docs", href: "/docs" },
            { label: "SDK", href: "#sdks" },
            { label: "Benchmarks", href: "#performance" },
            { label: "GitHub", href: "https://github.com/ferres-db/ferres-db", external: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm text-[#9CA3AF] transition-colors hover:text-[#f97316]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://github.com/ferres-db/ferres-db"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star FerresDB on GitHub"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          style={{
            border: "1px solid #f97316",
            color: "#f97316",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#f97316";
            (e.currentTarget as HTMLAnchorElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#f97316";
          }}
        >
          ⭐ Star on GitHub
        </a>
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 2: Wire into page temporarily to verify**

Edit `app/page.tsx` — replace its contents with just:

```tsx
import { Navbar } from "@/components/sections/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 px-8 text-white">Navbar test</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm:
- Navbar slides down on load
- `● FerresDB` in monospace, orange dot
- `MIT OR Apache-2.0` pill visible on desktop
- Links visible on desktop, hidden on mobile (resize to <768px)
- Star button has orange border, fills on hover

- [ ] **Step 4: Commit**

```bash
git add components/sections/Navbar.tsx app/page.tsx
git commit -m "feat: add Navbar section component"
```

---

## Task 4: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create `components/sections/HeroSection.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      style={{ background: "#1A1A1A" }}
    >
      {/* Dot grid background */}
      <div className="dot-grid" />
      {/* Orange blob glow */}
      <div className="blob-glow" />

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Open source badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm text-[#9CA3AF] transition-all hover:border-[#f97316]/50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(249,115,22,0.25)",
                boxShadow: "0 0 20px rgba(249,115,22,0.08)",
              }}
            >
              <span>🔓</span>
              <span>Open Source —</span>
              <span className="font-semibold text-[#f97316]">MIT OR Apache-2.0</span>
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-[#9CA3AF]/60 hidden sm:inline">github.com/ferres-db/ferres-db</span>
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="mb-6 font-heading font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Vector search.<br />
            Built in Rust.<br />
            <span className="text-[#f97316]">Sub-millisecond.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg"
          >
            FerresDB is a high-performance vector search engine for semantic search,
            RAG pipelines, and recommendation systems. REST API, hybrid search,
            WAL persistence — production-ready from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#quickstart"
              className="rounded-md bg-[#f97316] px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-8 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              View on GitHub →
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.75 } } }}
            className="mx-auto grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { staticVal: "~500μs", label: "P50 Latency", sublabel: "sub-millisecond" },
              { value: 100, suffix: "K+", label: "Ingest Throughput", sublabel: "vectors/s" },
              { value: 3, suffix: " SDKs", label: "Rust · Python · TypeScript", sublabel: "" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="rounded-lg p-4 text-center sm:p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                <div className="mb-1 font-mono text-2xl font-bold text-[#f97316] sm:text-3xl">
                  {"staticVal" in metric ? (
                    metric.staticVal
                  ) : (
                    <AnimatedCounter value={metric.value!} suffix={metric.suffix} />
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#9CA3AF] sm:text-xs">
                  {metric.label}
                </div>
                {metric.sublabel && (
                  <div className="mt-0.5 text-[10px] text-[#9CA3AF]/60">{metric.sublabel}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page**

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm:
- Dot grid visible in hero background with slow downward drift
- Orange blob glow in top-right corner
- Open source badge with micro-glow, GitHub icon
- Syne font on the 3-line headline; "Sub-millisecond." in orange
- Two CTA buttons side by side on desktop, stacked on mobile
- 3 metric cards stagger in on load; `100K+` counts up when visible
- `~500μs` shows as static text

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx app/page.tsx
git commit -m "feat: add HeroSection with dot grid, badge, headline, CTAs, and animated metrics"
```

---

## Task 5: OpenSourceBanner

**Files:**
- Create: `components/sections/OpenSourceBanner.tsx`

- [ ] **Step 1: Create `components/sections/OpenSourceBanner.tsx`**

```tsx
"use client";
import { useReveal } from "@/hooks/use-reveal";

export function OpenSourceBanner() {
  const ref = useReveal();

  return (
    <section
      style={{
        background: "#111111",
        borderTop: "1px solid rgba(249,115,22,0.1)",
        borderBottom: "1px solid rgba(249,115,22,0.1)",
      }}
      className="py-16"
    >
      <div ref={ref} className="reveal container mx-auto px-4 text-center">
        <p className="mb-1 text-xl font-semibold text-white">
          FerresDB is fully open source.
        </p>
        <p className="mb-8 text-[#9CA3AF]">Licensed under MIT OR Apache-2.0.</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/ferres-db/ferres-db"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            ⭐ Star on GitHub
          </a>
          <a
            href="https://github.com/ferres-db/ferres-db/fork"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            🍴 Fork &amp; Contribute
          </a>
          <a
            href="https://github.com/ferres-db/ferres-db/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
          >
            🐛 Open an Issue
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceBanner } from "@/components/sections/OpenSourceBanner";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <OpenSourceBanner />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Scroll down past the hero. Confirm the banner fades in, pills have orange border, and fill orange on hover.

- [ ] **Step 4: Commit**

```bash
git add components/sections/OpenSourceBanner.tsx app/page.tsx
git commit -m "feat: add OpenSourceBanner section"
```

---

## Task 6: FeaturesSection

**Files:**
- Create: `components/sections/FeaturesSection.tsx`

- [ ] **Step 1: Create `components/sections/FeaturesSection.tsx`**

```tsx
"use client";
import { useReveal } from "@/hooks/use-reveal";
import { Zap, Layers, Cpu, HardDrive, Bot, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Sub-millisecond Search",
    desc: "HNSW index with Cosine, Euclidean, and Dot Product metrics. P50 latency under 500μs even at scale.",
  },
  {
    icon: Layers,
    title: "Hybrid Search (Vector + BM25)",
    desc: "Combine vector similarity with full-text BM25 scoring in a single query. Best of both worlds for RAG.",
  },
  {
    icon: Cpu,
    title: "Written in Rust",
    desc: "No GC pauses. Predictable latency. Thread-safe by design. SIMD acceleration (AVX2/SSE4.1) for distance kernels.",
  },
  {
    icon: HardDrive,
    title: "WAL Persistence + Crash Recovery",
    desc: "Write-Ahead Log, periodic snapshots every 1000 ops, and automatic crash recovery. Your data survives failures.",
  },
  {
    icon: Bot,
    title: "Native MCP Support",
    desc: "Connect Claude Desktop directly to FerresDB via the Model Context Protocol. Enable --mcp and start searching from your AI assistant.",
  },
  {
    icon: BarChart3,
    title: "Built-in Observability",
    desc: "Prometheus metrics at /metrics, health check at /health, query analytics with P95 latency, and a web dashboard included.",
  },
];

export function FeaturesSection() {
  const titleRef = useReveal();

  return (
    <section id="features" className="py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Core Features</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
            Everything You Need, Nothing You Don&apos;t
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal feature-card rounded-xl p-6"
      style={{
        transitionDelay: `${index * 80}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
        style={{ background: "rgba(249,115,22,0.1)" }}
      >
        <feature.icon className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-[#9CA3AF]">{feature.desc}</p>
    </div>
  );
}
```

- [ ] **Step 2: Add to page**

Add `FeaturesSection` import and `<FeaturesSection />` after `<OpenSourceBanner />` in `app/page.tsx`.

- [ ] **Step 3: Verify**

Scroll to features. Cards should stagger in with ~80ms delay between each. Hover each card — orange border glow appears via `.feature-card:hover` CSS.

- [ ] **Step 4: Commit**

```bash
git add components/sections/FeaturesSection.tsx app/page.tsx
git commit -m "feat: add FeaturesSection with 6 cards and staggered scroll reveal"
```

---

## Task 7: PerformanceSection

**Files:**
- Create: `components/sections/PerformanceSection.tsx`

- [ ] **Step 1: Create `components/sections/PerformanceSection.tsx`**

```tsx
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
```

- [ ] **Step 2: Add to page**

Add `PerformanceSection` import and `<PerformanceSection />` after `<FeaturesSection />` in `app/page.tsx`.

- [ ] **Step 3: Verify**

Scroll to performance. Two cards side by side on desktop, stacked on mobile. All numbers in JetBrains Mono orange. Footnote in muted mono text.

- [ ] **Step 4: Commit**

```bash
git add components/sections/PerformanceSection.tsx app/page.tsx
git commit -m "feat: add PerformanceSection with indexing and latency tables"
```

---

## Task 8: QuickStartSection

**Files:**
- Create: `components/sections/QuickStartSection.tsx`

- [ ] **Step 1: Create `components/sections/QuickStartSection.tsx`**

```tsx
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
      className="py-20"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="reveal mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#f97316]">Quick Start</p>
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
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
              <span className="text-[#34d399]">'{`{"name":"docs","dimension":384,"distance":"Cosine"}`}'</span>
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
              <span className="text-[#34d399]">'{`{"points":[{"id":"doc-1","vector":[0.1,0.2,-0.1],"metadata":{"text":"Hello FerresDB"}}]}`}'</span>
              {"\n\n"}
              <span className="text-[#6B7280]"># Search</span>{"\n"}
              <span className="text-[#f97316]">curl</span>
              <span className="text-white"> -X POST http://localhost:8080/api/v1/collections/docs/search \</span>{"\n"}
              <span className="text-white">  -H </span>
              <span className="text-[#34d399]">"Content-Type: application/json"</span>
              <span className="text-white"> \</span>{"\n"}
              <span className="text-white">  -d </span>
              <span className="text-[#34d399]">'{`{"vector":[0.1,0.2,-0.1],"limit":5}`}'</span>
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
```

- [ ] **Step 2: Add to page**

Add `QuickStartSection` import and `<QuickStartSection />` after `<PerformanceSection />`.

- [ ] **Step 3: Verify**

Scroll to quick start. 3 numbered steps with proper code blocks. Copy button copies correct raw text to clipboard. Code blocks have orange-tinted token coloring.

- [ ] **Step 4: Commit**

```bash
git add components/sections/QuickStartSection.tsx app/page.tsx
git commit -m "feat: add QuickStartSection with 3-step Docker + curl code blocks"
```

---

## Task 9: SDKsSection

**Files:**
- Create: `components/sections/SDKsSection.tsx`

- [ ] **Step 1: Create `components/sections/SDKsSection.tsx`**

```tsx
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
                <span className="text-white"> {"{ VectorDBClient, DistanceMetric }"} </span>
                <span className="text-[#60a5fa]">from</span>
                <span className="text-[#34d399]"> "@ferres-db/typescript-sdk"</span>
                <span className="text-white">;</span>{"\n\n"}
                <span className="text-[#60a5fa]">const</span>
                <span className="text-white"> client = </span>
                <span className="text-[#60a5fa]">new</span>
                <span className="text-[#f97316]"> VectorDBClient</span>
                <span className="text-white">{"({"}</span>{"\n"}
                <span className="text-white">  baseUrl: </span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">,</span>{"\n"}
                <span className="text-white">  apiKey: </span>
                <span className="text-[#34d399]">"ferres_sk_..."</span>
                <span className="text-white">,</span>{"\n"}
                <span className="text-white">{"});"}</span>{"\n\n"}
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">upsertPoints</span>
                <span className="text-white">{"("}
                <span className="text-[#34d399]">"documents"</span>
                {", ["}</span>{"\n"}
                <span className="text-white">{"  { id: "}
                <span className="text-[#34d399]">"doc-1"</span>
                {", vector: [0.1, 0.2, 0.3], metadata: { text: "}
                <span className="text-[#34d399]">"Hello"</span>
                {" } },"}</span>{"\n"}
                <span className="text-white">{"]);"}</span>{"\n\n"}
                <span className="text-[#60a5fa]">const</span>
                <span className="text-white"> results = </span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">search</span>
                <span className="text-white">{"("}
                <span className="text-[#34d399]">"documents"</span>
                {", {"}</span>{"\n"}
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
                {/* Use a single pre-formatted string with minimal coloring to avoid JSX nesting bugs */}
                <span className="text-[#60a5fa]">from</span>
                <span className="text-white"> vector_db_client </span>
                <span className="text-[#60a5fa]">import</span>
                <span className="text-white"> VectorDBClient, Point, DistanceMetric{"\n"}</span>
                <span className="text-[#60a5fa]">import</span>
                <span className="text-white"> asyncio{"\n\n"}</span>
                <span className="text-[#60a5fa]">async def</span>
                <span className="text-[#f97316]"> main</span>
                <span className="text-white">():{"\n"}</span>
                <span className="text-white">    </span>
                <span className="text-[#60a5fa]">async with</span>
                <span className="text-[#f97316]"> VectorDBClient</span>
                <span className="text-white">({"\n"}</span>
                <span className="text-white">{"        base_url="}</span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">,{"\n"}</span>
                <span className="text-white">{"        api_key="}</span>
                <span className="text-[#34d399]">"ferres_sk_..."</span>
                <span className="text-white">,{"\n"}</span>
                <span className="text-white">{"    ) "}</span>
                <span className="text-[#60a5fa]">as</span>
                <span className="text-white"> client:{"\n"}</span>
                <span className="text-white">{"        "}</span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">upsert_points</span>
                <span className="text-white">{"("}</span>
                <span className="text-[#34d399]">"my-collection"</span>
                <span className="text-white">{", [Point(id="}</span>
                <span className="text-[#34d399]">"1"</span>
                <span className="text-white">{`, vector=[0.1,0.2,0.3], metadata={"text":"hello"}),\n        ])\n`}</span>
                <span className="text-white">{"        results = "}</span>
                <span className="text-[#60a5fa]">await</span>
                <span className="text-white"> client.</span>
                <span className="text-[#f97316]">search</span>
                <span className="text-white">{"(\n            collection="}</span>
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
                <span className="text-white">() -&gt; </span>
                <span className="text-[#34d399]">Result</span>
                <span className="text-white">{"<(), Box<dyn std::error::Error>> {"}</span>{"\n"}
                <span className="text-white">    </span>
                <span className="text-[#60a5fa]">let</span>
                <span className="text-white"> client = FerresDbClient::new(</span>
                <span className="text-[#34d399]">"http://localhost:8080"</span>
                <span className="text-white">);</span>{"\n"}
                <span className="text-white">    </span>
                <span className="text-[#60a5fa]">let</span>
                <span className="text-white"> response = client</span>{"\n"}
                <span className="text-white">        .</span>
                <span className="text-[#f97316]">hybrid_search</span>
                <span className="text-white">{"("}
                <span className="text-[#34d399]">"docs"</span>
                {", "}
                <span className="text-[#34d399]">"semantic query"</span>
                {", &vec![0.1; 384], 5, 0.5)</span>{"\n"}
                <span className="text-white">        .await?;</span>{"\n"}
                <span className="text-[#60a5fa]">    for</span>
                <span className="text-white"> item </span>
                <span className="text-[#60a5fa]">in</span>
                <span className="text-white"> response.results {"{"}</span>{"\n"}
                <span className="text-white">        println!(</span>
                <span className="text-[#34d399]">"{} — score: {:.4}"</span>
                <span className="text-white">, item.id, item.score);</span>{"\n"}
                <span className="text-white">    {"}"}</span>{"\n"}
                <span className="text-[#f97316]">    Ok</span>
                <span className="text-white">(())</span>{"\n"}
                <span className="text-white">{"}"}</span>
              </CodeBlock>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Add `SDKsSection` import and `<SDKsSection />` after `<QuickStartSection />`.

- [ ] **Step 3: Verify**

Tab bar switches instantly between TypeScript / Python / Rust. Each tab shows install + usage code blocks. Copy button works on each block. Active tab has orange border/background.

- [ ] **Step 4: Commit**

```bash
git add components/sections/SDKsSection.tsx app/page.tsx
git commit -m "feat: add SDKsSection with TypeScript/Python/Rust tabs"
```

---

## Task 10: UseCasesSection

**Files:**
- Create: `components/sections/UseCasesSection.tsx`

- [ ] **Step 1: Create `components/sections/UseCasesSection.tsx`**

```tsx
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
          <h2 className="font-heading text-3xl font-extrabold text-white md:text-4xl">
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
```

- [ ] **Step 2: Add to page**

Add `UseCasesSection` import and `<UseCasesSection />` after `<SDKsSection />`.

- [ ] **Step 3: Verify**

3 cards in a row on desktop, stacked on mobile. Staggered reveal. Hover glow matches features cards.

- [ ] **Step 4: Commit**

```bash
git add components/sections/UseCasesSection.tsx app/page.tsx
git commit -m "feat: add UseCasesSection with 3 use case cards"
```

---

## Task 11: MCPSection

**Files:**
- Create: `components/sections/MCPSection.tsx`

- [ ] **Step 1: Create `components/sections/MCPSection.tsx`**

```tsx
"use client";
import { useReveal } from "@/hooks/use-reveal";
import { CodeBlock } from "@/components/CodeBlock";

const BUILD_RAW = `cargo build -p ferres-db-server --features mcp --release`;
const ENV_RAW = `FERRESDB_ENABLE_MCP=true ./ferres-db-server --mcp`;

export function MCPSection() {
  const ref = useReveal();

  return (
    <section
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
          <h2 className="mb-4 font-heading text-3xl font-extrabold text-white md:text-4xl">
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
```

- [ ] **Step 2: Add to page**

Add `MCPSection` import and `<MCPSection />` after `<UseCasesSection />`.

- [ ] **Step 3: Verify**

Section on dark `#111111` background. Two code blocks. Badge at bottom with orange border.

- [ ] **Step 4: Commit**

```bash
git add components/sections/MCPSection.tsx app/page.tsx
git commit -m "feat: add MCPSection for Claude Desktop integration"
```

---

## Task 12: OpenSourceCTA

**Files:**
- Create: `components/sections/OpenSourceCTA.tsx`

- [ ] **Step 1: Create `components/sections/OpenSourceCTA.tsx`**

```tsx
"use client";
import { useReveal } from "@/hooks/use-reveal";

export function OpenSourceCTA() {
  const ref = useReveal();

  return (
    <section
      className="py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container mx-auto px-4">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 font-heading font-extrabold text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}
          >
            Built in the open.<br />
            <span className="text-[#f97316]">For everyone.</span>
          </h2>
          <p className="mb-8 text-[#9CA3AF] leading-relaxed">
            FerresDB is open source under the MIT OR Apache-2.0 license.
            Contributions, issues, and feedback are welcome.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://github.com/ferres-db/ferres-db"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#f97316] px-7 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              ⭐ Star on GitHub
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-7 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              📖 Read the Docs
            </a>
            <a
              href="https://github.com/ferres-db/ferres-db/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-7 py-3 text-sm font-semibold text-[#f97316] transition-colors hover:bg-[#f97316]/10"
              style={{ border: "1px solid rgba(249,115,22,0.4)" }}
            >
              🤝 Contribute
            </a>
          </div>

          <p className="mt-8 font-mono text-xs text-[#9CA3AF]/60">
            Licensed MIT OR Apache-2.0 · Conventional Commits · DCO signed contributions
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Add `OpenSourceCTA` import and `<OpenSourceCTA />` after `<MCPSection />`.

- [ ] **Step 3: Verify**

Centered layout. Large Syne headline. Filled orange + two outline buttons side by side on desktop. License line in muted mono below.

- [ ] **Step 4: Commit**

```bash
git add components/sections/OpenSourceCTA.tsx app/page.tsx
git commit -m "feat: add OpenSourceCTA section"
```

---

## Task 13: Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Create `components/sections/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        borderTop: "1px solid rgba(249,115,22,0.1)",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: branding */}
          <div className="text-center sm:text-left">
            <p className="font-mono text-base font-bold text-white">
              <span className="text-[#f97316]">●</span> FerresDB
            </p>
            <p className="mt-1 font-mono text-xs text-[#9CA3AF]">
              High-performance vector search in Rust
            </p>
            <p className="mt-0.5 font-mono text-xs text-[#9CA3AF]/60">
              MIT OR Apache-2.0
            </p>
          </div>

          {/* Right: links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
              {[
                { label: "GitHub", href: "https://github.com/ferres-db/ferres-db", external: true },
                { label: "Docs", href: "/docs" },
                { label: "SDK", href: "#sdks" },
                { label: "Contributing", href: "https://github.com/ferres-db/ferres-db/blob/main/CONTRIBUTING.md", external: true },
                { label: "License", href: "https://github.com/ferres-db/ferres-db/blob/main/LICENSE", external: true },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[#9CA3AF] transition-colors hover:text-[#f97316]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-[#9CA3AF]/50">
            © 2026 FerresDB. Built with Rust. ·{" "}
            <a href="/privacy" className="hover:text-[#f97316] transition-colors">Privacy</a>
            {" · "}
            <a href="/terms" className="hover:text-[#f97316] transition-colors">Terms</a>
            {" · "}
            <a href="/contact" className="hover:text-[#f97316] transition-colors">Contact</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add to page**

Add `Footer` import and `<Footer />` after `<OpenSourceCTA />`.

- [ ] **Step 3: Verify**

Footer renders at bottom: `● FerresDB` logo left, links right on desktop, both centered on mobile. MIT OR Apache-2.0 text below logo. Copyright strip with Privacy/Terms/Contact links.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Footer.tsx app/page.tsx
git commit -m "feat: add Footer section"
```

---

## Task 14: Wire up page.tsx and final verification

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with final composition**

```tsx
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenSourceBanner } from "@/components/sections/OpenSourceBanner";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PerformanceSection } from "@/components/sections/PerformanceSection";
import { QuickStartSection } from "@/components/sections/QuickStartSection";
import { SDKsSection } from "@/components/sections/SDKsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { MCPSection } from "@/components/sections/MCPSection";
import { OpenSourceCTA } from "@/components/sections/OpenSourceCTA";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#1A1A1A", color: "#f9fafb" }}>
      <Navbar />
      <HeroSection />
      <OpenSourceBanner />
      <FeaturesSection />
      <PerformanceSection />
      <QuickStartSection />
      <SDKsSection />
      <UseCasesSection />
      <MCPSection />
      <OpenSourceCTA />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Run full page verification checklist**

Open `http://localhost:3000` and walk through:

- [ ] Navbar slides down, `MIT OR Apache-2.0` badge visible, Star button in orange outline
- [ ] Hero: dot-grid drifts, blob glow top-right, Syne headline, badge with GitHub icon
- [ ] Hero CTAs: "Get Started" fills orange, "View on GitHub →" has outline
- [ ] Metric counters: `100K+` counts up on first view
- [ ] Open Source Banner: pills fill orange on hover
- [ ] Features: 6 cards in 3×2 grid, stagger in, hover glow
- [ ] Performance: two tables side by side, all numbers in JetBrains Mono orange
- [ ] Quick Start: 3 numbered steps, code blocks with copy button
- [ ] SDKs: tab switching works, all 3 tabs show correct code
- [ ] Use Cases: 3 cards, hover glow
- [ ] MCP: dark `#111111` bg, two code blocks, compatibility badge
- [ ] Open Source CTA: large headline, 3 buttons
- [ ] Footer: logo + links, copyright strip
- [ ] `prefers-reduced-motion`: in DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion" → all reveals should show immediately without animation

- [ ] **Step 3: Check secondary pages are unaffected**

Navigate to `/docs`, `/contact`, `/privacy`, `/terms`. Confirm:
- Body text uses IBM Plex Sans (check DevTools → Computed → font-family)
- Colors and layout unchanged
- No console errors

- [ ] **Step 4: Run TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Final commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up all 11 landing page sections in page.tsx"
```

---

## Spec Coverage Checklist

| Spec requirement | Covered in task |
|---|---|
| `MIT OR Apache-2.0` badge in navbar | Task 3 |
| `MIT OR Apache-2.0` badge in hero | Task 4 |
| GitHub link in ≥4 places | Tasks 3, 4, 12, 13 |
| Syne for headlines | Task 1 (font), Tasks 4, 6, 7, 8, 9, 10, 11, 12 |
| JetBrains Mono for code/metrics | Task 1 (font), Tasks 4, 7 |
| IBM Plex Sans for body | Task 1 |
| Dot-grid + blob glow in hero | Task 4 |
| Animated metric counters | Tasks 2 + 4 |
| Staggered scroll reveals | Tasks 2 + 6, 8, 10 |
| Hover border-glow on cards | Task 1 (`.feature-card` CSS) |
| Open Source Banner with pills | Task 5 |
| Features 3×2 grid | Task 6 |
| Performance numbers (P50/P95/P99) | Task 7 |
| Quick Start 3 steps with code | Task 8 |
| SDK tabs (TS + Python + Rust) | Task 9 |
| Use Cases 3 cards | Task 10 |
| MCP / Claude Desktop section | Task 11 |
| Open Source CTA | Task 12 |
| Footer with license text | Task 13 |
| `prefers-reduced-motion` | Task 1 (CSS) |
| Mobile responsive | All sections use Tailwind responsive prefixes |
| Dark mode only | Task 1 (no light mode toggle) |
| Copy button on code blocks | Task 2 (CodeBlock component) |
