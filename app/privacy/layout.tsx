import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FerresDB",
  description: "Privacy Policy for FerresDB website and related services.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
