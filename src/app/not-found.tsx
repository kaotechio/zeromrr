import Link from "next/link";
import Header from "../components/header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import InfoMenu from "@/components/info-menu";

export default function NotFound() {
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
              404
            </h1>
            <p className="mb-8 text-center text-sky-800/70 text-base md:text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
            <p className="text-center text-sm text-sky-700/70">
              If you think this is an error, please{" "}
              <Link
                href="/contact"
                className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
              >
                contact me
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

