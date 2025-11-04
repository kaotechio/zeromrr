import Header from "@/components/header";
import Icon from "@/components/icon";
import { Separator } from "@/components/ui/separator";
import InfoMenu from "@/components/info-menu";

export default function Contact() {
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
              Contact
            </h1>
            <p className="mb-8 text-center text-sky-800/70 text-base md:text-lg">
              Reach out and we will get back to you shortly.
            </p>

            <Separator className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <section>
                <h2 className="mb-3 text-xl font-semibold text-sky-900">Company</h2>
                <p className="text-slate-700">kaotech e.U.</p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-sky-900">Owner</h2>
                <p className="text-slate-700">Paul Graf</p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-sky-900">Contact Email</h2>
                <p className="text-slate-700">
                  <a
                    href="mailto:contact@kaotech.io"
                    className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                  >
                    contact@kaotech.io
                  </a>
                </p>
              </section>

              <section>
              <h2 className="mb-3 text-xl font-semibold text-sky-900">Contact Form</h2>
                <div id="contact-form" className="underline text-sky-700 hover:text-sky-800 underline-offset-2 cursor-pointer">Contact Me</div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

