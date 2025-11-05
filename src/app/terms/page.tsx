import Header from "@/components/header";
import Icon from "@/components/icon";
import Link from "next/link";
import InfoMenu from "@/components/info-menu";

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16 bg-linear-to-br from-sky-50 via-blue-50 to-indigo-50 relative">
        <InfoMenu />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200/50 p-6 md:p-8">
          <Icon />
          <div className="px-1">
            <h1 className="mb-6 text-center text-3xl md:text-4xl font-semibold text-sky-900">
              Terms of Service
            </h1>
            <p className="mb-8 text-center text-sky-800/70 text-base md:text-lg">
              These Terms govern your use of ZeroMRR. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <div className="prose prose-slate max-w-none space-y-8">
              <section>
                <p className="text-slate-700 leading-relaxed">
                  &ldquo;ZeroMRR&rdquo;, &ldquo;zeromrr.app&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to the services provided by ZeroMRR.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Please also review our{" "}
                  <Link
                    href="/privacy"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  , which explains how we handle your information.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Our legal disclosures are available on our{" "}
                  <Link
                    href="/imprint"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    Imprint
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Changes to These Terms</h2>
                <p className="text-slate-700 leading-relaxed">
                  We continually improve our services and may update these Terms from time to time. When we make material changes, we will notify you by posting the updated Terms on our website, sending an email, or by other reasonable means. If you do not agree to the revised Terms, you may reject them, but you must stop using the services. Your continued use of the services after the changes become effective constitutes acceptance of the updated Terms. Any decision by us not to exercise a right under these Terms does not waive that right.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Accounts and Eligibility</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You must create an account with a valid email address if you want to submit your startup. After signup, you will receive a link that can be used to log in.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You must provide accurate, complete, and current information. You may not use false information or impersonate another person.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  You are responsible for safeguarding your credentials and for all activity under your account.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Acceptable Use and Content Responsibilities</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You are solely responsible for the content you configure and publish through the services on our website. You must not publish or solicit content that violates laws, regulations, or public policy, or that harms ZeroMRR&rsquo;s interests or reputation.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Prohibited content includes material that is abusive, defamatory, discriminatory, obscene, pornographic, threatening, harassing, or that incites hatred or violence.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Political or religious advocacy content is not permitted.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Do not distribute unauthorized copies of materials protected by intellectual property, image, or privacy rights.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You warrant that you have all rights and permissions to use and publish your content and that you respect third‑party rights. You will indemnify and hold ZeroMRR harmless from any third‑party claims, damages, and costs arising from your content or your use of the services. You must not modify another website to falsely imply an association with ZeroMRR.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Acceptable Use of the Services</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Do not use the services for any unlawful purpose or in violation of these Terms.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Comply with all applicable laws and regulations in your use of the services.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Do not attempt to breach or circumvent the security of the platform or access areas or data without authorization.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Protect your account by keeping credentials confidential. You are responsible for activities under your account.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Do not attempt to disrupt, overload, or interfere with the services or bypass rate limits.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Service Modifications and Availability</h2>
                <p className="text-slate-700 leading-relaxed">
                  We may modify or discontinue any part of the services at any time, temporarily or permanently, with or without notice.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Service Level and Support</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  ZeroMRR does not guarantee uninterrupted or error‑free operation and does not offer a binding service level agreement. Operation may be affected by factors outside our control, including equipment issues, hosting or provider disruptions, internet congestion, or force majeure events.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We test features carefully and prioritize fixes, especially for security and privacy. Not all reported issues will be resolved, and we do not guarantee completely error‑free services. Technical support is provided via email on a reasonable‑effort basis without guaranteed response times.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Termination</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may suspend or terminate your access to the services at any time, without notice, if your conduct violates these Terms or harms our operations or other users. Upon termination, your right to access the services ceases immediately.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To cancel your account, go to your{" "}
                  <Link
                    href="/profile"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    profile page
                  </Link>
                  {" "}and press on &lsquo;Delete Account&rsquo;.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  If you terminate your account, all data is deleted immediately. You are free to create a new account at any time.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Disclaimers and Limitation of Liability</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  The services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. ZeroMRR is not liable for graphical or typographical errors.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  To the maximum extent permitted by law, ZeroMRR and its affiliates, directors, and employees are not liable for any damages of any kind, including lost profits, lost business, loss of use or data, business interruption, or any direct, indirect, special, incidental, or consequential damages.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We are not liable for errors, inaccuracies, or omissions in content.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We are not liable for unauthorized access to servers or personal information.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We are not liable for interruptions of the service or failures to perform.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Nothing in these Terms excludes or limits liability where such exclusion or limitation would be unlawful under applicable law, including liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for gross negligence. Mandatory consumer protection laws remain unaffected.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Governing Law and Disputes</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  These Terms are governed by the laws of Austria, without regard to conflict of law principles. Exclusive jurisdiction and venue are the competent courts of Graz, Austria. If you are a consumer, mandatory consumer protections of your habitual residence remain unaffected.
                </p>
                <p className="text-slate-700 leading-relaxed mb-3">
                  You agree to resolve disputes with us in good faith. To the extent permitted by law, claims must be brought in an individual capacity and not as part of collective redress, unless collective mechanisms are mandated by applicable law.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable by a competent authority, the remaining provisions shall remain in full force and effect. The invalid provision shall be replaced with a valid provision that comes closest to the economic purpose of the invalid provision.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Export Control and Sanctions</h2>
                <p className="text-slate-700 leading-relaxed">
                  You represent that you are not a person or entity subject to sanctions and that you will not use the services in violation of EU or applicable export control and sanctions laws.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Assignment and Survival</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  We may assign these Terms in connection with a merger, acquisition, corporate reorganization, or sale of assets. These Terms, together with referenced documents, constitute the entire agreement between you and ZeroMRR regarding the services. Provisions that by their nature should survive termination will survive, including intellectual property, indemnity, limitations of liability, payment obligations, data protection, and governing law.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-sky-900">Contact</h2>
                <p className="text-slate-700 leading-relaxed">
                  Questions about these Terms can be sent via any contact method listed on our{" "}
                  <Link
                    href="/contact"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

