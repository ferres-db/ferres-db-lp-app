import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - FerresDB",
  description: "Get in touch with the FerresDB team. Join our Discord community or reach us on GitHub.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
