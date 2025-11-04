"use client";

import { useMemo, useState } from "react";
import { startup } from "@/db/schema";
import AddStartupDialog from "@/components/add-startup-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CodeIcon, CopyIcon, PencilIcon } from "lucide-react";

export default function StartupListItem({ startupItem }: { startupItem: typeof startup.$inferSelect }) {
  const [open, setOpen] = useState(false);
  
  return (
    <li className="p-4 border border-sky-200 rounded-lg bg-sky-50/50 hover:bg-sky-50 transition-colors duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <a
            href={startupItem.startupLink}
            target="_blank"
            rel="noreferrer noopener"
            className="text-lg font-semibold text-sky-900 hover:text-sky-800 underline underline-offset-2"
          >
            {startupItem.startupName}
          </a>
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-sky-200 text-sky-700 hover:text-sky-800 hover:bg-sky-50 cursor-pointer shrink-0"
                onClick={() => setOpen(true)}
              >
                <PencilIcon className="size-4" />
                Edit
              </Button>
              <GetEmbedDialogButton startupId={startupItem.id} />
            </div>
            <AddStartupDialog
              startup={startupItem}
              open={open}
              onOpenChange={setOpen}
            />
          </>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-medium">Founder:</span> {startupItem.founderName}
          {startupItem.founderXUsername && (
            <>
              {" "}
              (
              <a
                href={`https://x.com/${startupItem.founderXUsername}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
              >
                @{startupItem.founderXUsername}
              </a>
              )
            </>
          )}
        </div>
        {startupItem.tags && startupItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {startupItem.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-800 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
   </li>
  );
}

function GetEmbedDialogButton({ startupId }: { startupId: string }) {
  const [copiedHtml, setCopiedHtml] = useState(false);

  const badgeUrl = useMemo(() => `/api/badge/${startupId}.svg`, [startupId]);
  const absolute = typeof window !== 'undefined' ? location.origin : '';
  const htmlEmbed = `<a href="https://zeromrr.app" target="_blank">
  <img
    src="${absolute}${badgeUrl}"
    alt="Verified on ZeroMRR • MRR ≥ $0"
  />
</a>`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-sky-200 text-sky-700 hover:text-sky-800 hover:bg-sky-50 cursor-pointer shrink-0"
        >
          <CodeIcon className="size-4" />
          Get Embed
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed badge</DialogTitle>
          <DialogDescription>
            Add this badge to your website to show you’re verified with MRR ≥ $0.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center rounded-md border bg-white p-4">
            <img src={badgeUrl} alt="ZeroMRR badge preview" className="max-w-full h-16" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">HTML</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={async () => {
                  await navigator.clipboard.writeText(htmlEmbed);
                  setCopiedHtml(true);
                  setTimeout(() => setCopiedHtml(false), 1500);
                }}
              >
                <CopyIcon className="size-4" />
                {copiedHtml ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre
              className="bg-sky-50 border border-sky-200 rounded-md px-3 py-2 w-full text-sky-800 font-mono text-sm whitespace-pre-wrap wrap-break-word"
              aria-label="embed code"
            ><code>{htmlEmbed}</code></pre>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}