import Error from "next/error";
import { ReactNode } from "react";
import EmptyRecord from "../empty";
import { Spinner } from "../ui/spinner";

interface MultiQuery<T> {
  data: T | undefined;
  isLoading: boolean;
  error?: unknown;
}

interface MultiQueryWrapperProps<T extends readonly unknown[]> {
  queries: { [K in keyof T]: MultiQuery<T[K]> };
  emptyMessage?: string;
  fallbackLoading?: ReactNode;
  children: (data: { [K in keyof T]: T[K] }) => React.ReactNode;
}

export function MultiQueryWrapper<T extends readonly unknown[]>({
  queries,
  emptyMessage = "Không có dữ liệu",
  fallbackLoading,
  children,
}: MultiQueryWrapperProps<T>) {
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => !!q.error);
  const isAllEmpty = queries.every(
    (q) => q.data == null || Object.keys(q.data).length === 0,
  );

  if (isLoading) return fallbackLoading || <Spinner />;
  if (isError) return <Error statusCode={500} />;
  if (isAllEmpty) return <EmptyRecord description={emptyMessage} />;

  const data = queries.map((q) => q.data!) as { [K in keyof T]: T[K] };

  return <>{children(data)}</>;
}
