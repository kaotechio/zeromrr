import StartupTable from "../components/startup-table";
import BadgeCard from "../components/badge";
import { SiGithub } from '@icons-pack/react-simple-icons';
import Icon from "../components/icon";
import Header from "../components/header";
import InfoMenu from "../components/info-menu";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16 bg-linear-to-br from-sky-50 via-blue-50 to-indigo-50 relative">
        <InfoMenu />
        <div className="h-[25vh]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200/50 p-6 md:p-8">
          <Icon />
          <h1 className="mb-2 text-center text-3xl md:text-4xl font-semibold text-sky-900">
            The database of verified startup revenues — where every MRR is 0 or more.
          </h1>
          <div className="px-1">
            <p className="mb-6 text-center text-sky-800/70 text-base md:text-lg">
              Build trust by showing your MRR — keep customer data private.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <BadgeCard
                color="sky"
                title="Fully open source"
                subtitle="MIT licensed code available on GitHub."
                href="https://github.com/kaotechio/zeromrr"
                icon={<SiGithub className="w-4 h-4" />}
                linkTitle="View source on GitHub"
              />
              <BadgeCard
                color="emerald"
                title="Privacy focused"
                subtitle="No Stripe keys. MRR ≥ 0 works for everyone."
                icon={<span>🕵️‍♂️</span>}
              />
              <BadgeCard
                color="amber"
                title="No advertising"
                subtitle="Just the data. ✨"
                icon={<span>📺</span>}
              />
              <BadgeCard
                color="blue"
                title="Fully self-hosted in the EU"
                subtitle="EU data residency. GDPR-compliant."
                href="/privacy"
                icon={<span>🔒</span>}
                linkTitle="Read privacy details"
              />
            </div>

            <Suspense fallback={null}>
              <StartupTable />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
