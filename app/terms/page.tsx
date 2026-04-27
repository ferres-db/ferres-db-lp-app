import { SecondaryNavbar } from "@/components/sections/SecondaryNavbar";
import { Footer } from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#1A1A1A", color: "#f9fafb" }}
    >
      <SecondaryNavbar badge="Terms" />

      <main className="container mx-auto max-w-3xl px-4 pb-16 pt-32">
        <h1
          className="mb-3 font-heading font-extrabold text-white"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.1 }}
        >
          Terms of Use
        </h1>
        <p className="mb-10 font-mono text-xs uppercase tracking-widest text-[#f97316]">
          Last updated: February 2026
        </p>

        <div className="space-y-8 leading-relaxed text-[#9CA3AF]">
          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">1. Acceptance</h2>
            <p>
              By accessing or using the FerresDB website, documentation, software, or related materials, you agree to these Terms of Use. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">2. Use of FerresDB</h2>
            <p>
              FerresDB is provided for use in accordance with its license and documentation. You are responsible for how you deploy, configure, and use the software. Use must comply with applicable laws and must not infringe the rights of others or misuse the product (e.g. for illegal or harmful purposes).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">3. Free Use and Pricing</h2>
            <p>
              Use of FerresDB is currently offered free of charge. We reserve the right to introduce fees, usage limits, or paid tiers in the future. Any such changes will be communicated in advance where reasonably possible. Continued use after any change may constitute acceptance of the new terms or pricing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">4. No Warranty</h2>
            <p>
              FerresDB and this website are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee uninterrupted access, accuracy, or suitability for any particular purpose. You use the software and site at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we and our contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of data or profits, arising from your use of FerresDB or this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">6. Intellectual Property</h2>
            <p>
              FerresDB, the FerresDB name, logo, and related materials are subject to their respective licenses and intellectual property rights. You may not use our trademarks or branding in a way that implies endorsement or misleads others without permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">7. Changes to Terms</h2>
            <p>
              We may update these Terms of Use at any time. The &quot;Last updated&quot; date at the top reflects the latest version. Your continued use of the website or software after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-heading text-xl font-bold text-white">8. Contact</h2>
            <p>
              For questions about these Terms of Use, please contact us through the channels provided on our website or GitHub repository.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
