import Header from "@/components/header";
import Icon from "@/components/icon";
import Link from "next/link";
import InfoMenu from "@/components/info-menu";

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16 bg-linear-to-br from-sky-50 via-blue-50 to-indigo-50 relative">
        <InfoMenu />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200/50 p-6 md:p-8">
          <Icon />
          <div className="px-1">
            <h1 className="mb-6 text-center text-3xl md:text-4xl font-semibold text-sky-900">
              Privacy Policy
            </h1>
            <p className="mb-8 text-center text-sky-800/70 text-base md:text-lg">
              We respect your privacy. This page explains what data we collect, why we collect it, how we process it, and the rights you have.
            </p>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Responsible</h2>
                <p className="text-slate-700 leading-relaxed mb-2">
                  Paul Graf
                </p>
                <p className="text-slate-700 leading-relaxed mb-2">
                  kaotech e.U.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Ragnitzstrasse 221, 8047 Graz, Austria
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Contact Us</h2>
                <p className="text-slate-700 leading-relaxed mb-2">
                  Paul Graf
                </p>
                <p className="text-slate-700 leading-relaxed mb-2">
                  kaotech e.U.
                </p>
                <p className="text-slate-700 leading-relaxed mb-2">
                  Ragnitzstrasse 221, 8047 Graz, Austria
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  <a
                    href="mailto:contact@easepop.dev"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    contact@easepop.dev
                  </a>
                </p>
                <p className="text-slate-700 leading-relaxed">
                  <Link
                    href="/contact"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    Contact Us
                  </Link>
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">How We Process Data</h2>
                <p className="text-slate-700 leading-relaxed">
                  Unless otherwise specified, your personal data is stored and processed in the European Union and is not passed on to third parties beyond the providers listed on this page.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">As a Site Visitor</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We use Plausible Analytics to understand overall usage trends and ensure a secure, stable website. Plausible does not use cookies and does not collect identifiable personal data. The data is aggregated and anonymized.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Reference:{" "}
                  <a
                    href="https://plausible.io/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    plausible.io/privacy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">As a Customer</h2>
                
                <h3 className="mb-3 text-xl font-semibold text-sky-800 mt-6">Hosting and Infrastructure</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We host and secure customer data on servers operated by Hetzner, a European company. Your site data remains in the EU and is protected by EU data privacy laws.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Reference:{" "}
                  <a
                    href="https://www.hetzner.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    hetzner.com/legal/privacy-policy
                  </a>
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  For our managed database services, we use Scaleway, a European company. Database data is processed within the EU and protected by EU data privacy laws.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  All data is encrypted at rest using LUKS disk encryption and encrypted in transit using TLS protocols.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Reference:{" "}
                  <a
                    href="https://www.scaleway.com/en/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    scaleway.com/en/privacy-policy
                  </a>
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  For global content delivery, DNS, and DDoS protection, we use Bunny, a European provider. Visitor data processed for these services is handled on European‑owned infrastructure.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Reference:{" "}
                  <a
                    href="https://bunny.net/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    bunny.net/privacy
                  </a>
                </p>

                <h3 className="mb-3 text-xl font-semibold text-sky-800 mt-6">Account Data and Authentication</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When you create a ZeroMRR account, we collect your email address. This enables authentication and essential service communications.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  When you create a startup, you enter information that will be publicly visible, including but not limited to: A name, the startup name, the startup link and an X username.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We set a first‑party cookie to keep you logged in between sessions. You can control cookie retention in your browser and delete stored cookies at any time.
                </p>

                <h3 className="mb-3 text-xl font-semibold text-sky-800 mt-6">Emails</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We send transactional emails via Mailjet. Open and link tracking are disabled.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Reference:{" "}
                  <a
                    href="https://www.mailjet.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    mailjet.com/legal/privacy-policy
                  </a>
                </p>

                <h3 className="mb-3 text-xl font-semibold text-sky-800 mt-6">Support Correspondence</h3>
                <p className="text-slate-700 leading-relaxed">
                  If you contact us for help, we retain your message and email address to assist you and maintain a history of prior correspondence. We use this information only to respond to your inquiries.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Data Retention</h2>
                <p className="text-slate-700 leading-relaxed">
                  We retain your information for as long as your account is active and as needed to provide the services. We also retain information as necessary to comply with legal obligations.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Your Rights under the GDPR</h2>
                <ul className="space-y-3 text-slate-700 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Right of access:</strong> Request information about whether and which personal data we process about you.
                  </li>
                  <li>
                    <strong>Right to rectification:</strong> Request correction or completion of inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Right to erasure:</strong> Request deletion where data is no longer needed, subject to legal retention obligations.
                  </li>
                  <li>
                    <strong>Right to restriction of processing:</strong> Request restricted processing in certain cases, such as when accuracy is disputed.
                  </li>
                  <li>
                    <strong>Right to data portability:</strong> Receive your data in a structured, commonly used, machine‑readable format, and have it transmitted where technically feasible.
                  </li>
                  <li>
                    <strong>Right to object:</strong> Object to processing unless we have compelling legitimate grounds to continue.
                  </li>
                  <li>
                    <strong>Right not to be subject to automated decision‑making:</strong> We do not make automated decisions about you; if this changes, you have the right not to be evaluated solely by algorithms.
                  </li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  To exercise your rights, please contact us using the details above.
                </p>
                <p className="text-slate-700 leading-relaxed mt-3">
                  If you believe your data protection rights have been violated, you can lodge a complaint with the Austrian Data Protection Authority:{" "}
                  <a
                    href="https://www.data-protection-authority.gv.at"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    data-protection-authority.gv.at
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Voluntary Nature of Data Provision</h2>
                <p className="text-slate-700 leading-relaxed">
                  You are under no statutory obligation to provide data to kaotech e.U. However, certain services may not be available if you choose not to provide the data required to deliver them.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Withdrawal of Consent</h2>
                <p className="text-slate-700 leading-relaxed">
                  You can withdraw consent at any time with effect for the future. Processing prior to withdrawal remains lawful.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Changes to this Policy</h2>
                <p className="text-slate-700 leading-relaxed">
                  We may update this policy from time to time. The latest version applies when you revisit this page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

