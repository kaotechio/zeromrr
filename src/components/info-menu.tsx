import { Info } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function InfoMenu() {
  return (
    <div className="fixed top-14 right-2 z-40">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 text-slate-600 hover:text-sky-700"
            aria-label="Information"
            title="Information"
          >
            <Info className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href="/terms">Terms</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/privacy">Privacy</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/imprint">Imprint</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href="https://x.com/kaotechio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
            >
              Follow me on X 🤙
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

