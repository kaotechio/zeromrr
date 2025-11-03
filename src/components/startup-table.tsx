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
import { useRouter, useSearchParams } from "next/navigation";
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

function FilterBadge({ founderName, onClear }: { founderName: string; onClear: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClear();
      }}
      className="cursor-pointer inline-flex items-center gap-1 rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-xs font-medium hover:bg-sky-200 transition-colors"
      title="Clear filter"
    >
      <span>{founderName}</span>
      <span className="text-sky-600 hover:text-sky-800">×</span>
    </button>
  );
}

type StartupQueryData = {
  items: typeof startup.$inferSelect[];
  nextOffset: number;
  hasMore: boolean;
};

type InfiniteStartupData = {
  pages: StartupQueryData[];
  pageParams: Array<{ offset: number; limit: number; userId?: string }>;
};

export function StartupTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredUserId, setFilteredUserId] = React.useState<string | undefined>(
    searchParams.get("userId") || undefined
  );
  const [filteredFounderName, setFilteredFounderName] = React.useState<string | undefined>(undefined);
  const previousDataRef = React.useRef<InfiniteStartupData | undefined>(undefined);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery<StartupQueryData, Error, InfiniteStartupData, (string | undefined)[], { offset: number; limit: number; userId?: string }>({
    queryKey: ["startups", filteredUserId],
    initialPageParam: { offset: 0, limit: 30, userId: filteredUserId },
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
      lastPage.hasMore ? { offset: lastPage.nextOffset, limit: 30, userId: filteredUserId } : undefined,
    placeholderData: (previousData): InfiniteStartupData | undefined => {
      if (previousData) {
        previousDataRef.current = previousData;
        return previousData;
      }
      return previousDataRef.current;
    },
  });

  React.useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  React.useEffect(() => {
    if (filteredUserId && !filteredFounderName && data && data.pages.length > 0) {
      const firstPage = data.pages[0];
      if (firstPage.items.length > 0) {
        const firstItem = firstPage.items[0];
        if (firstItem.userId === filteredUserId) {
          setFilteredFounderName(firstItem.founderName);
        }
      }
    }
  }, [filteredUserId, filteredFounderName, data]);

  React.useEffect(() => {
    const userIdFromUrl = searchParams.get("userId") || undefined;
    if (userIdFromUrl !== filteredUserId) {
      setFilteredUserId(userIdFromUrl);
      setFilteredFounderName(undefined);
    }
  }, [searchParams]);

  React.useEffect(() => {
    const currentUserId = searchParams.get("userId") || undefined;
    if (currentUserId === filteredUserId) {
      return;
    }
    
    const params = new URLSearchParams(searchParams.toString());
    if (filteredUserId) {
      params.set("userId", filteredUserId);
    } else {
      params.delete("userId");
    }
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [filteredUserId, router, searchParams]);

  const items = React.useMemo(
    () => (data ? data.pages.flatMap((p) => p.items) : ([] as typeof startup.$inferSelect[])),
    [data],
  );

  const columns: ColumnDef<typeof startup.$inferSelect>[] = React.useMemo(
    () => [
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
        header: () => (
          <div className="flex items-center gap-2">
            <span>Founder</span>
            {filteredFounderName && (
              <FilterBadge
                founderName={filteredFounderName}
                onClear={() => {
                  setFilteredUserId(undefined);
                  setFilteredFounderName(undefined);
                }}
              />
            )}
          </div>
        ),
        accessorKey: "founderName",
        cell: ({ row }) => {
          const s = row.original;
          return (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setFilteredUserId(s.userId);
                  setFilteredFounderName(s.founderName);
                }}
                title={`Filter by ${s.founderName}`}
                className="font-bold hover:text-sky-700 hover:underline underline-offset-2 cursor-pointer"
              >
                {s.founderName}
              </button>
              {s.founderXUsername && (
                <a
                  href={`https://x.com/${s.founderXUsername}`}
                  target="_blank"
                  rel="noopener"
                  title={`Follow ${s.founderName} on X`}
                  className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                >
                  @{s.founderXUsername}
                </a>
              )}
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
    ],
    [filteredFounderName],
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
                        <td key={cell.id} className="px-4 py-3">
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


