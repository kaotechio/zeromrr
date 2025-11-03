import AuthButton from "./auth-button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur h-12 flex items-center justify-center">
      <div className="text-center text-xs text-slate-600 w-full max-w-6xl mx-auto h-full bg-white flex flex-row items-center justify-between px-4">
        <div className="flex-1"></div>
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
        <div className="flex-1 flex justify-end">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}