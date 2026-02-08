import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - FerresDB",
  description: "Terms of Use for FerresDB website and software.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
