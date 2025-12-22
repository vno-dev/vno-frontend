"use client";
import { Button } from "@/components/ui/button";
import { HeadingSection } from "@/features/components";
import React, { useState } from "react";
import { Folder, GripVertical, MoreHorizontal, Share, Trash2 } from "lucide-react";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface GridItem {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  tagColor: string;
  createAt: string;
}
import style from "@/styles/common/shape.module.css";

const defaultGridItems: GridItem[] = [
  {
    id: "1",
    title: "Workshop plaining and ideas",
    priority: "high",
    tagColor: "#f33500",
    createAt: new Date().toString(),
  },
  {
    id: "2",
    title: "Desgin Exploration",
    priority: "medium",
    tagColor: "#fbbf24",
    createAt: new Date().toString(),
  },
  {
    id: "3",
    title: "Users Feedback",
    priority: "low",
    tagColor: "#3b82f6",
    createAt: new Date().toString(),
  },
  {
    id: "4",
    title: "Plans for future and orther directions, ideas for improvements",
    priority: "low",
    tagColor: "#16930d",
    createAt: new Date().toString(),
  },
  {
    id: "5",
    title: "Testing Results",
    priority: "high",
    tagColor: "#c209f1",
    createAt: new Date().toString(),
  },
  {
    id: "6",
    title: "Heath Improvements",
    priority: "medium",
    tagColor: "#139d86",
    createAt: new Date().toString(),
  },
];

const HomeScreenMainBoard = () => {
  const [items, setItems] = useState<GridItem[]>(defaultGridItems);

  const handleValueChange = (newItems: GridItem[]) => {
    console.log("🔴 GRID VALUE CHANGED:", newItems);
    setItems(newItems);

    // Show toast with new order
    toast.success("Grid items reordered successfully!", {
      description: `New order: ${newItems
        .map((item, index) => `${index + 1}. ${item.title}`)
        .join(", ")}`,
      duration: 4000,
    });
  };

  const getItemValue = (item: GridItem) => item.id;
  return (
    <div>
      <HeadingSection
        title="My folders"
        right={
          <Button variant={"none"} size={"sm"}>
            Filter by
          </Button>
        }
      >
        <Sortable
          value={items}
          onValueChange={handleValueChange}
          getItemValue={getItemValue}
          strategy="grid"
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr"
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div
                className={cn(
                  "group relative p-3 bg-primary/5 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer",
                  "min-h-[150px] flex flex-col pt-6",
                  style.shape
                )}
                onClick={() => console.log("🔴 GRID ITEM CLICKED:", item.id)}
              >
                <SortableItemHandle className="absolute top-4 end-3 text-muted-foreground hover:text-foreground z-10 opacity-0 group-hover:opacity-100 transition-opacity size-6 rounded-full bg-white flex items-center justify-center">
                  <GripVertical className="size-4" />
                </SortableItemHandle>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <div
                      className="size-3 mt-1.5 rounded shrink-0"
                      style={{
                        backgroundColor: item.tagColor,
                      }}
                    />
                    <h4 className="font-semibold text-base line-clamp-3">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(new Date(item.createAt), "PPP")}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"none"}
                        size={"icon"}
                        className="text-neutral-400"
                      >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </HeadingSection>
    </div>
  );
};

export default HomeScreenMainBoard;
