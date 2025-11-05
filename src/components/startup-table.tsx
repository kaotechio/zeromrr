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
import { getStartupsAction, toggleStartupLikeAction } from "../action/startups";
import { StartupWithLikes } from "../types";
import { cn } from "@/lib/utils";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Heart, ChevronUp, ChevronDown } from "lucide-react";
import { authClient } from "@/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoginDialog from "./login-dialog";

const failedImageCache = new Set<string>();

function FaviconImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [hasError, setHasError] = React.useState(() => failedImageCache.has(src));

  React.useEffect(() => {
    setHasError(failedImageCache.has(src));
  }, [src]);

  const handleError = React.useCallback(() => {
    failedImageCache.add(src);
    setHasError(true);
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
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

function TagsInline({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const defaultMaxInlineCount = 3;
  const [maxInlineCount, setMaxInlineCount] = useState<number>(defaultMaxInlineCount);
  const pillClassName = "inline-flex items-center rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-xs font-medium";
  const ellipsisClassName = "inline-flex items-center text-gray-500 text-xs font-medium cursor-help";

  const pills = useMemo(() => {
    return tags.map((tag, idx) => ({ key: `${tag}-${idx}`, label: tag }));
  }, [tags]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const ro = new ResizeObserver(() => {
      compute();
    });
    ro.observe(container);
    compute();
    return () => {
      ro.disconnect();
    };
  }, [pills]);

  function measureTagsFit(availableWidth: number, ellipsisWidth: number, includeEllipsis: boolean): number {
    if (!measureRef.current) return 0;
    const measure = measureRef.current;
    measure.innerHTML = "";
    
    const gapPx = 6;
    let used = 0;
    let count = 0;
    
    for (let i = 0; i < pills.length; i++) {
      const pill = document.createElement("span");
      pill.className = pillClassName;
      pill.textContent = pills[i].label;
      measure.appendChild(pill);
      const rect = pill.getBoundingClientRect();
      const pillWidth = Math.ceil(rect.width);
      const nextUsed = count === 0 ? pillWidth : used + gapPx + pillWidth;
      const totalNeeded = includeEllipsis ? nextUsed + gapPx + ellipsisWidth : nextUsed;
      
      if (totalNeeded <= availableWidth) {
        used = nextUsed;
        count++;
      } else {
        break;
      }
    }
    
    return count;
  }

  function compute() {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    if (containerWidth <= 0) {
      setMaxInlineCount(defaultMaxInlineCount);
      return;
    }
    if (!measureRef.current) return;
    
    // Measure ellipsis width
    const measure = measureRef.current;
    measure.innerHTML = "";
    const ellipsisEl = document.createElement("span");
    ellipsisEl.className = ellipsisClassName;
    ellipsisEl.textContent = "...";
    measure.appendChild(ellipsisEl);
    const ellipsisWidth = Math.ceil(ellipsisEl.getBoundingClientRect().width);
    
    // Check how many tags fit without ellipsis
    const countWithoutEllipsis = measureTagsFit(containerWidth, ellipsisWidth, false);
    
    if (pills.length > countWithoutEllipsis) {
      // Recalculate accounting for ellipsis
      const countWithEllipsis = measureTagsFit(containerWidth, ellipsisWidth, true);
      setMaxInlineCount(Math.max(defaultMaxInlineCount, countWithEllipsis));
    } else {
      setMaxInlineCount(pills.length);
    }
  }

  if (pills.length === 0) {
    return <span className="text-gray-400">—</span>;
  }

  const toRender = pills.slice(0, Math.min(maxInlineCount, pills.length));
  const hasMore = pills.length > toRender.length;
  const remainingTags = hasMore ? pills.slice(toRender.length).map(p => p.label) : [];

  return (
    <div className="flex flex-col">
      <div ref={containerRef} className="flex flex-wrap items-center gap-1.5">
        {toRender.map((t) => (
          <span
            key={t.key}
            className={pillClassName}
          >
            {t.label}
          </span>
        ))}
        {hasMore && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={ellipsisClassName}>
                ...
              </span>
            </TooltipTrigger>
            <TooltipContent 
              className="bg-sky-50 border border-sky-200 text-sky-800 max-w-xs shadow-md"
              sideOffset={6}
            >
              <p className="font-medium mb-1 text-sky-900">Remaining tags:</p>
              <p className="text-xs text-sky-700">{remainingTags.join(", ")}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div
        ref={measureRef}
        className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap"
        style={{ left: -99999, top: -99999 }}
      />
    </div>
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
  items: StartupWithLikes[];
  nextOffset: number;
  hasMore: boolean;
};

type InfiniteStartupData = {
  pages: StartupQueryData[];
  pageParams: Array<{ offset: number; limit: number; filterByUserId?: string; shuffleSeed: string; sortByLikes?: "asc" | "desc" }>;
};

export function StartupTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [filteredUserId, setFilteredUserId] = React.useState<string | undefined>(
    searchParams.get("userId") || undefined
  );
  const [filteredFounderName, setFilteredFounderName] = React.useState<string | undefined>(undefined);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [sortByLikes, setSortByLikes] = React.useState<"asc" | "desc" | undefined>(undefined);
  const previousDataRef = React.useRef<InfiniteStartupData | undefined>(undefined);
  const shuffleSeed = React.useMemo(() => crypto.randomUUID(), []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery<StartupQueryData, Error, InfiniteStartupData, (string | undefined)[], { offset: number; limit: number; filterByUserId?: string; shuffleSeed: string; sortByLikes?: "asc" | "desc" }>({
    queryKey: ["startups", filteredUserId, shuffleSeed!, sortByLikes],
    initialPageParam: { offset: 0, limit: 30, filterByUserId: filteredUserId, shuffleSeed: shuffleSeed!, sortByLikes },
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
      lastPage.hasMore ? { offset: lastPage.nextOffset, limit: 30, filterByUserId: filteredUserId, shuffleSeed: shuffleSeed!, sortByLikes } : undefined,
    placeholderData: (previousData): InfiniteStartupData | undefined => {
      if (previousData) {
        previousDataRef.current = previousData;
        return previousData;
      }
      return previousDataRef.current;
    },
    enabled: shuffleSeed !== null,
  });

  const likeMutation = useMutation({
    mutationFn: async (startupId: string) => {
      const result = await toggleStartupLikeAction({ startupId });
      if (result?.data) {
        return result.data;
      }
      if (result?.validationErrors) {
        throw new Error("Validation failed");
      }
      throw new Error(result?.serverError ?? "Failed to toggle like");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startups"] });
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
    () => (data ? data.pages.flatMap((p) => p.items) : ([] as StartupWithLikes[])),
    [data],
  );

  const columns: ColumnDef<StartupWithLikes>[] = React.useMemo(
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
                className="font-bold hover:text-sky-700 hover:underline underline-offset-2 cursor-pointer text-left"
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
          return <TagsInline tags={tags} />;
        },
      },
      {
        header: "MRR",
        id: "mrr",
        cell: () => <span className="text-gray-600">≥ 0$</span>,
      },
      {
        header: () => (
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-sky-700 text-sky-700" />
            <div className="flex flex-col">
              <button
                onClick={() => setSortByLikes((prev) => (prev === "asc" ? undefined : "asc"))}
                className={cn(
                  "cursor-pointer hover:text-sky-800 transition-colors",
                  sortByLikes === "asc" ? "text-sky-700" : "text-gray-400"
                )}
                title="Sort ascending"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSortByLikes((prev) => (prev === "desc" ? undefined : "desc"))}
                className={cn(
                  "cursor-pointer hover:text-sky-800 transition-colors",
                  sortByLikes === "desc" ? "text-sky-700" : "text-gray-400"
                )}
                title="Sort descending"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ),
        id: "likes",
        cell: ({ row }) => {
          const isLiked = row.original.userLiked;
          const isLoggedIn = !!session?.user;
          const isPending = likeMutation.isPending;

          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isLoggedIn && !isPending) {
                    likeMutation.mutate(row.original.id);
                  } else if (!isLoggedIn) {
                    setLoginDialogOpen(true);
                  }
                }}
                disabled={isPending}
                className={cn(
                  "flex items-center justify-center transition-colors",
                  "cursor-pointer hover:opacity-80",
                  isPending && "opacity-50"
                )}
                title={isLoggedIn ? (isLiked ? "Unlike" : "Like") : "Log in to like"}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  )}
                />
              </button>
              <span className="text-sm text-gray-600 min-w-[2ch]">{row.original.likesCount}</span>
            </div>
          );
        },
      },
    ],
    [filteredFounderName, session, likeMutation, setLoginDialogOpen, sortByLikes],
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
                  className={cn("px-4 py-3 text-left font-semibold text-sky-700")}
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
      <LoginDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen}
        callbackURL="/"
        errorCallbackURL="/"
      />
    </div>
  );
}

export default StartupTable;
