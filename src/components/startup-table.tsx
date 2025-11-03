"use client";

import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { startup } from "../db/schema";
import { getStartupsAction } from "../action/startups";

function FaviconImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-sky-100 text-sky-700 font-semibold text-xs`}
        style={{ width: 32, height: 32 }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      width={32}
      height={32}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

const columns: ColumnDef<typeof startup.$inferSelect>[] = [
  {
    header: "Startup",
    accessorKey: "startupName",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <a href={s.startupLink} target="_blank" rel="noopener" title={`Visit ${s.startupName}`} className="flex items-center gap-3">
          <FaviconImage
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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["startups"],
    initialPageParam: { offset: 0, limit: 30 },
    queryFn: async ({ pageParam }) => {
      const result = await getStartupsAction(pageParam);
      if (result?.data) {
        return result.data;
      }
      if (result?.validationErrors) {
        throw new Error("Validation failed");
      }
      throw new Error(result?.serverError ?? "Failed to fetch startups");
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? { offset: lastPage.nextOffset, limit: 30 } : undefined,
  });

  const items = React.useMemo(
    () => (data ? data.pages.flatMap((p) => p.items) : ([] as typeof startup.$inferSelect[])),
    [data],
  );


  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rowVirtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 56,
    overscan: 15,
  });

  React.useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length || isFetchingNextPage || !hasNextPage) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem.index >= items.length - 1) {
      fetchNextPage();
    }
  }, [rowVirtualizer.getVirtualItems(), isFetchingNextPage, hasNextPage, items.length, fetchNextPage]);

  return (
    <div className="w-full shadow-sm rounded-lg border border-sky-200 bg-white overflow-x-scroll">
      <table className="w-full text-sm">
        <thead className="bg-sky-50 sticky top-02 z-10">
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
          {(() => {
            const virtualRows = rowVirtualizer.getVirtualItems();
            if (!virtualRows.length) {
              return (
                <tr>
                  <td colSpan={table.getAllColumns().length} className="px-4 py-3 text-center text-slate-500 text-sm">
                    {isLoading ? "Loading startups..." : "No startups found"}
                  </td>
                </tr>
              );
            }
            const paddingTop = virtualRows[0].start;
            const paddingBottom = rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end;
            return (
              <>
                {paddingTop > 0 && (
                  <tr>
                    <td colSpan={table.getAllColumns().length} style={{ height: paddingTop }} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = table.getRowModel().rows[virtualRow.index];
                  return (
                    <tr key={row.id} className="border-t border-sky-100 hover:bg-sky-50/60">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 align-top">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {paddingBottom > 0 && (
                  <tr>
                    <td colSpan={table.getAllColumns().length} style={{ height: paddingBottom }} />
                  </tr>
                )}
              </>
            );
          })()}
        </tbody>
      </table>
      {isFetchingNextPage && (
        <div className="p-3 border-t border-sky-100 flex items-center justify-center">
          <span className="text-slate-500 text-sm">Loading more…</span>
        </div>
      )}
      {!hasNextPage && items.length > 0 && (
        <div className="p-3 border-t border-sky-100 flex items-center justify-center gap-3">
          <span className="text-slate-500 text-sm">No more results</span>
          <Button
            onClick={() => refetch()}
            disabled={isRefetching}
            variant="outline"
            size="sm"
            className="border-sky-200 cursor-pointer"
          >
            {isRefetching ? "Checking…" : "Check again"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default StartupTable;


