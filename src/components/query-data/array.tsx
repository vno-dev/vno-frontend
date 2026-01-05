import { ReactNode } from "react";
import { Spinner } from "../ui/spinner";
import EmptyRecord from "../empty";

interface QueryArrayWrapperProps<T> {
  isLoading?: boolean;
  data?: T[] | null;
  emptyMessage?: string;
  children: (data: T[]) => ReactNode;
  fallbackLoading?: ReactNode;
  fallBackEmpty?: ReactNode;
}

const QueryArrayWrapper = <T,>({
  isLoading,
  data,
  emptyMessage,
  children,
  fallbackLoading = (
    <div className="w-full h-[200px] flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  ),
  fallBackEmpty = <EmptyRecord description={emptyMessage} />,
}: QueryArrayWrapperProps<T>) => {
  if (isLoading) return fallbackLoading;

  if (!Array.isArray(data) || !data || data.length === 0) return fallBackEmpty;

  return <>{children(data)}</>;
};

export type { QueryArrayWrapperProps };
export default QueryArrayWrapper;
