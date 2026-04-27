"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  filename: string;
  language: string;
  raw: string;
  children: React.ReactNode;
}

export function CodeBlock({ filename, language, raw, children }: Props) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable or permission denied — do nothing
    }
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
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
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
