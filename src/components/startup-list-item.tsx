"use client";

import { useState } from "react";
import { startup } from "@/db/schema";
import AddStartupDialog from "@/components/add-startup-dialog";
import { Button } from "@/components/ui/button";

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
            <Button
              variant="outline"
              size="sm"
              className="border-sky-200 text-sky-700 hover:text-sky-800 hover:bg-sky-50 cursor-pointer shrink-0"
              onClick={() => setOpen(true)}
            >
              Edit
            </Button>
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

