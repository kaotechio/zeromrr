import { NextRequest } from "next/server";
import { db } from "@/db";
import { startup } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const rows = await db.select().from(startup).where(eq(startup.id, id.replace(".svg", ""))).limit(1);
    if (rows.length === 0) {
      return new Response("Not found", { status: 404 });
    }
    const name = rows[0].startupName;

    const title = name;
    const subtitle = "MRR ≥ $0";
    const footnote = "🔒 Safe & trusted by ZeroMRR";

    const esc = (s: string) =>
      String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const eTitle = esc(title);
    const eSubtitle = esc(subtitle);
    const eFootnote = esc(footnote);

    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="65" viewBox="0 0 240 65" role="img" aria-label="${eTitle} – ${eSubtitle}">
    <title>${eTitle} – ${eSubtitle}</title>
    <defs>
      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#0b1220" flood-opacity="0.08" />
      </filter>
    </defs>
    <!-- Card -->
    <rect x="0.5" y="0.5" width="230" height="64" rx="10" fill="#ffffff" stroke="#E5E7EB" filter="url(#cardShadow)" />

    <!-- Left logo -->
    <g transform="translate(6,6)">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#024a70" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="6"/>
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
        <path d="M7 6h1v4"/>
        <path d="m16.71 13.88.7.71-2.82 2.82"/>
      </svg>
    </g>

    <!-- Text block -->
    <g font-family="ui-sans-serif, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial">
      <text x="58" y="24" font-size="16" font-weight="700" fill="#024a70">${eTitle}</text>
      <text x="59" y="39" font-size="12" font-family="monospace" font-weight="700" fill="#475569">${eSubtitle}</text>
    </g>

    <!-- Footnote -->
    <g font-family="ui-sans-serif, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial" font-size="10" fill="#475569" text-anchor="middle">
    <text x="116" y="59">${eFootnote}</text>
    </g>

  </svg>`.trim();

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return new Response("Server error", { status: 500 });
  }
}


