import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  badge?: string;
}

export function SecondaryNavbar({ badge }: Props) {
  return (
    <nav
      className="fixed top-0 z-50 w-full"
      style={{
        background: "rgba(26,26,26,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(249,115,22,0.15)",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="FerresDB home" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FerresDB"
              width={140}
              height={32}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
          {badge && (
            <span
              className="hidden sm:inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] text-[#f97316]"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}
            >
              {badge}
            </span>
          )}
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-md border border-[#f97316] px-4 py-2 text-sm font-medium text-[#f97316] transition-colors hover:bg-[#f97316] hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </nav>
  );
}
