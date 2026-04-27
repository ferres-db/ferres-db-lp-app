import { SecondaryNavbar } from "@/components/sections/SecondaryNavbar";
import { Footer } from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#1A1A1A", color: "#f9fafb" }}
    >
      <SecondaryNavbar badge="Privacy" />

      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-32">
        <h1
          className="mb-3 font-heading font-extrabold text-white"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Privacy Policy
        </h1>
        <p className="mb-10 font-mono text-xs uppercase tracking-widest text-[#f97316]">
          Last updated: February 2026
        </p>

        <div className="space-y-8 leading-relaxed text-[#9CA3AF]">
          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">1. Introduction</h2>
            <p>
              FerresDB (&quot;we&quot;, &quot;our&quot;, or &quot;the product&quot;) is a self-hosted vector database. This Privacy Policy describes how we may collect and use information in connection with this website and related services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">2. Information We Collect</h2>
            <p>
              When you use this website, we may collect limited technical information such as IP address, browser type, and pages visited. If you self-host FerresDB, your data remains on your infrastructure; we do not access or store your application data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">3. Use of Information</h2>
            <p>
              We use collected information to improve the website, analyze usage patterns, and communicate with you if you have opted in. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">4. Cookies and Similar Technologies</h2>
            <p>
              This site may use cookies or similar technologies for essential functionality and analytics. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">5. Third-Party Services</h2>
            <p>
              Our website may link to or integrate with third-party services (e.g. GitHub, documentation hosts). Their privacy policies apply to your use of those services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">6. Changes</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">7. Contact</h2>
            <p>
              For questions about this Privacy Policy, please contact us through the channels provided on our website or GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
