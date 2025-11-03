"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import Image from "next/image";

type Startup = {
  id: string;
  startupName: string;
  startupLink: string;
  founderXUsername: string;
  founderName: string;
  tags: string[];
};

const mockData: Startup[] = [
  {
    id: "1",
    startupName: "EasePop",
    startupLink: "https://easepop.dev",
    founderXUsername: "kaotechio",
    founderName: "Paul",
    tags: ["Marketing", "SaaS", "Popups"],
  }
];

const columns: ColumnDef<Startup>[] = [
  {
    header: "Startup",
    accessorKey: "startupName",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <a href={s.startupLink} target="_blank" rel="noopener" title={`Visit ${s.startupName}`} className="flex items-center gap-3">
          <Image
            width={32}
            height={32}
            src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(s.startupLink).hostname)}&sz=64`}
            alt={s.startupName}
            className="rounded-md object-cover"
          />
          <span className="font-medium">{s.startupName}</span>
        </a>
      );
    },
  },
  {
    header: "Founder",
    accessorKey: "founderName",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div className="flex items-center gap-1">
          <span>{s.founderName}</span>
          <a
            href={`https://x.com/${s.founderXUsername}`}
            target="_blank"
            rel="noopener"
            title={`Follow ${s.founderName} on X`}
            className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
          >
            @{s.founderXUsername}
          </a>
        </div>
      );
    },
  },
  {
    header: "Tags",
    id: "tags",
    cell: ({ row }) => {
      const tags = row.original.tags ?? [];
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.length === 0 ? (
            <span className="text-gray-400">—</span>
          ) : (
            tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-xs font-medium"
              >
                {tag}
              </span>
            ))
          )}
        </div>
      );
    },
  },
  {
    header: "MRR",
    id: "mrr",
    cell: () => <span className="text-gray-600">≥ 0$</span>,
  },
];

export function StartupTable() {
  const [data] = React.useState<Startup[]>(mockData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full shadow-sm rounded-lg border border-sky-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-sky-50 sticky top-12">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold text-sky-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-sky-100 hover:bg-sky-50/60">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StartupTable;


