import { Navbar } from "@/components/sections/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20 px-8 text-white">Navbar test</div>
    </div>
  );
}
