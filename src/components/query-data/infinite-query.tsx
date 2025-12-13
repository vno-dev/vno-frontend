import { InfiniteData } from "@tanstack/react-query";
import { ReactNode, useEffect, useMemo } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { Spinner } from "../ui/spinner";
import EmptyRecord from "../empty";

interface BasePagination {
  total?: number;
  limit?: number;
  page?: number;
}

interface BasePageData<T> {
  data?: T[];
  pagination?: BasePagination;
}

export interface InfiniteQueryWrapperProps<
  T,
  TPage extends BasePageData<T> = BasePageData<T>
> {
  // Data từ useInfiniteQuery
  data: InfiniteData<TPage> | undefined;

  // States
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;

  // Actions
  fetchNextPage: () => void;

  // Fallbacks
  fallbackLoading?: ReactNode;
  fallbackEmpty?: ReactNode;
  emptyMessage?: string;

  // Render children với flattened data
  children: (data: T[]) => ReactNode;

  // Optional: Custom flattener nếu cấu trúc API khác
  flattenData?: (pages: TPage[]) => T[];

  // Optional: Intersection Observer options
  rootMargin?: string;
  threshold?: number;

  // Optional: Custom loading more component
  loadingMore?: ReactNode;

  // Optional: Auto load on view (default: true)
  autoLoadOnView?: boolean;

  // Optional: Manual load button component
  manualLoadButton?: (loadMore: () => void) => ReactNode;
}

const InfiniteQueryWrapper = <
  T,
  TPage extends BasePageData<T> = BasePageData<T>
>({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  fallbackLoading = <Spinner />,
  fallbackEmpty,
  emptyMessage = "Không có dữ liệu.",
  children,
  flattenData,
  rootMargin = "100px",
  threshold = 0,
  loadingMore,
  autoLoadOnView = true,
  manualLoadButton,
}: InfiniteQueryWrapperProps<T, TPage>) => {
  // Intersection Observer
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  // Auto fetch next page khi intersecting (chỉ khi autoLoadOnView = true)
  useEffect(() => {
    if (
      autoLoadOnView &&
      isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    autoLoadOnView,
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // Flatten data từ các pages
  const flattenedData = useMemo(() => {
    if (!data?.pages) return [];

    if (flattenData) {
      return flattenData(data.pages);
    }

    return data.pages.flatMap((page) => page?.data || []);
  }, [data?.pages, flattenData]);

  // Loading state
  if (isLoading) return <>{fallbackLoading}</>;

  // Empty state
  if (flattenedData.length === 0) {
    return <>{fallbackEmpty || <EmptyRecord description={emptyMessage} />}</>;
  }

  // Default loading more component
  const defaultLoadingMore = (
    <div className="flex justify-center py-4">
      <div className="border-global-gray-30 border-t-global-gray-80 h-6 w-6 animate-spin rounded-full border-2" />
    </div>
  );

  return (
    <>
      {children(flattenedData)}
      {/* Load more trigger hoặc manual button */}
      {autoLoadOnView ? (
        <>
          <div ref={ref} className="h-1" />
          {isFetchingNextPage && (loadingMore || defaultLoadingMore)}
        </>
      ) : (
        hasNextPage && (
          <>
            {manualLoadButton ? (
              manualLoadButton(fetchNextPage)
            ) : (
              <div className="flex justify-center py-4">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="bg-global-gray-20 text-global-gray-80 hover:bg-global-gray-30 rounded-full px-4 py-2 disabled:opacity-50"
                >
                  {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
                </button>
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default InfiniteQueryWrapper;
