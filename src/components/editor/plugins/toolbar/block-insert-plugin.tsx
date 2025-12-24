"use client";

import { PlusIcon } from "lucide-react";

import { useEditorModal } from "@/components/editor/editor-hooks/use-modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal();

  return (
    <>
      {modal}
      <Select>
        <SelectTrigger className="w-min gap-1">
          <PlusIcon className="size-4" />
          <SelectValue placeholder="Insert" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
