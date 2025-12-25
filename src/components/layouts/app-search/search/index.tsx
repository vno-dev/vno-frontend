"use client";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/providers/searchs";
import { Kbd } from "@/components/ui/kbd";

type SearchProps = {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

export function Search({
  className = "",
  placeholder = "Search Anything...",
}: SearchProps) {
  const { setOpen } = useSearch();
  return (
    <Button
      variant="outline"
      className={cn(
        "group relative h-9 w-full flex-1 justify-start rounded-md bg-card text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64",
        className
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
        size={16}
      />
      <span className="ms-6.5">{placeholder}</span>
      <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">⌘K</Kbd>
    </Button>
  );
}
