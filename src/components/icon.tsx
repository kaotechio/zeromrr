import Image from "next/image";

export default function Icon() {
  return (
    <div className="z-40 bg-white py-4">
      <div className="mb-3 flex justify-center">
        <a
          href="/"
          title="ZeroMRR home"
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-900 shadow-sm hover:border-sky-300 hover:bg-sky-50/80 transition duration-200 ease-out"
        >
          <Image src="/favicon.png" alt="ZeroMRR" width={28} height={28} />
          <span>ZeroMRR</span>
        </a>
      </div>
      <h1 className="mb-2 text-center text-3xl md:text-4xl font-semibold text-sky-900">
        The database of verified startup revenues — where every MRR is 0 or more.
      </h1>
    </div>
  );
}