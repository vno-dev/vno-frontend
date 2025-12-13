import React, { ReactNode } from "react";
import { Spinner } from "../ui/spinner";
import EmptyRecord from "../empty";

interface QueryObjectWrapperProps<T extends object> {
  isLoading?: boolean;
  data?: T | null;
  emptyMessage?: string;
  fallBackLoading?: ReactNode;
  fallBackEmpty?: ReactNode;
  children: (data: T) => ReactNode;
}
const QueryObjectWrapper = <T extends object>({
  isLoading,
  data,
  emptyMessage = "Không có dữ liệu.",
  fallBackLoading = <Spinner />,
  fallBackEmpty = <EmptyRecord description={emptyMessage} />,
  children,
}: QueryObjectWrapperProps<T>) => {
  if (isLoading) return fallBackLoading;

  const isEmpty = !data || Object.keys(data).length === 0;
  if (isEmpty) return fallBackEmpty;

  return <>{children(data)}</>;
};

export default QueryObjectWrapper;
