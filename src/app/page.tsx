import StartupTable from "../components/startup-table";
import BadgeCard from "../components/badge";
import { SiGithub } from '@icons-pack/react-simple-icons';
import Icon from "../components/icon";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur h-12 flex items-center justify-center">
      <div className="text-center text-xs text-slate-600 w-full max-w-4xl mx-auto h-full bg-white flex flex-row items-center justify-center">
        <div>
          <span>made with 💗 by </span>
          <a
            href="https://x.com/kaotechio"
            target="_blank"
            rel="noreferrer"
            title="Follow Paul on X"
            className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
          >
            Paul
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16">
        <div className="w-full max-w-4xl mx-auto bg-white">
          <div className="h-[15vh]" />
          <Icon />
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

            <StartupTable />
          </div>
        </div>
      </main>
    </>
  );
}
