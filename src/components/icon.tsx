import Image from "next/image";

interface IconProps {
  imageSize?: number;
  textSize?: number;
}

export default function Icon({ imageSize = 28, textSize = 14 }: IconProps) {
  return (
    <div className="z-40 bg-white py-4">
      <div className="mb-3 flex justify-center">
        <a
          href="/"
          title="ZeroMRR home"
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-900 shadow-sm hover:border-sky-300 hover:bg-sky-50/80 transition duration-200 ease-out"
        >
          <Image src="/favicon.png" alt="ZeroMRR" width={imageSize} height={imageSize} />
          <span style={{ fontSize: textSize }}>ZeroMRR</span>
        </a>
      </div>
    </div>
  );
}