"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient, IPage } from "@/apis/vno";
import { QueryArrayWrapper } from "@/components/query-data";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";

interface WorkspaceScreenProps {
  slug: string;
}

export const WorkspaceScreen = ({ slug }: WorkspaceScreenProps) => {
  // Fetch pages for the workspace
  const { data, isLoading } = useQuery({
    queryKey: ["workspace/pages", slug],
    queryFn: () =>
      apiClient.pages.getAll({
        params: { workspaceId: slug },
      }),
  });

  // Local state for sortable items
  const [items, setItems] = useState<IPage[]>([]);

  // Sync local state when pages change
  useEffect(() => {
    const pages = data?.data || [];
    setItems(pages);
  }, [data]);

  // Handle sortable value change
  const handleValueChange = (newItems: IPage[]) => {
    setItems(newItems);

    toast.success("Grid items reordered successfully!", {
      description: newItems
        .map((item, index) => `${index + 1}. ${item.title}`)
        .join(", "),
      duration: 4000,
    });

    // TODO: call API to persist new order
  };

  const getItemValue = (item: IPage) => item.id;

  return (
    <QueryArrayWrapper data={items || []} isLoading={isLoading}>
      {(data) => (
        <Sortable
          value={items}
          onValueChange={handleValueChange}
          getItemValue={getItemValue}
          strategy="grid"
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr"
        >
         
          {data.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div
                className={cn(
                  "group relative p-3 bg-primary/5 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer",
                  "min-h-[150px] flex flex-col pt-6"
                )}
                onClick={() => console.log("🔴 GRID ITEM CLICKED:", item.id)}
              >
                <SortableItemHandle className="absolute top-4 end-3 text-muted-foreground hover:text-foreground z-10 opacity-0 group-hover:opacity-100 transition-opacity size-6 rounded-full bg-white flex items-center justify-center">
                  <GripVertical className="size-4" />
                </SortableItemHandle>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-base line-clamp-3">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(new Date(item?.createdAt || ""), "PPP")}
                  </span>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      )}
    </QueryArrayWrapper>
  );
};

export default WorkspaceScreen;
