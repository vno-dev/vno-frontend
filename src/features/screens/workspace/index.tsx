"use client";

import React, { useState, Fragment, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, IPage } from "@/apis/vno";
import { QueryArrayWrapper, QueryObjectWrapper } from "@/components/query-data";
import { cn } from "@/lib/utils";
import {
  MessagesSquare,
  Plus,
  Search,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { Main } from "@/components/layouts/main";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "@/components/common/typography";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CardActionRipple } from "@/components/common/card";
import { date } from "@/lib/d";
import { Editor } from "@/components/blocks/editor-x/editor";
import { SerializedEditorState } from "lexical";
import { normalizeLexicalState } from "@/utils";

interface WorkspaceScreenProps {
  slug: string;
}

export const WorkspaceScreen = ({ slug }: WorkspaceScreenProps) => {
  const queryClient = useQueryClient();
  const [selectedNote, setSelectedNote] = useState<IPage>();
  const [page, setPage] = useQueryState("page");
  const { data: pages, isLoading: pagesLoading } = useQuery({
    queryKey: ["workspace/pages", slug],
    queryFn: () =>
      apiClient.pages.getAll({
        params: { workspaceId: slug },
      }),
  });

  const {
    data: blocks,
    isLoading: blocksLoading,
    isFetching: blocksFetching,
  } = useQuery({
    queryKey: ["page/block", page],
    queryFn: () =>
      apiClient.blocks.getBlocks({
        params: { pageId: page },
      }),
    enabled: !!page,
  });

  const items = useMemo(() => {
    return pages?.data || [];
  }, [pages]);

  const blockDatas = useMemo(() => {
    return blocks?.data;
  }, [blocks]);
  console.log("🚀 ~ WorkspaceScreen ~ blockDatas:", blockDatas);

  const createOptimisticNote = (): IPage => ({
    id: `temp-${crypto.randomUUID()}`,
    title: "New Note",
    iconEmoji: "📝",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coverUrl: null,
    deletedAt: null,
    isLocked: false,
    organizationId: slug,
    path: "",
    visibility: "PUBLIC",
  });

  const createOptimisticBlocks = () => ({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Hello World 🚀",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  });

  const handleCreateNote = () => {
    const optimisticNote = createOptimisticNote();
    const optimisticBlocks = createOptimisticBlocks();

    // 1. Optimistic note list
    queryClient.setQueryData(["workspace/pages", slug], (old: any) => {
      if (!old) {
        return { data: [optimisticNote] };
      }

      return {
        ...old,
        data: [optimisticNote, ...old.data],
      };
    });

    // 2. Optimistic blocks cho note mới
    queryClient.setQueryData(["page/block", optimisticNote.id], {
      data: optimisticBlocks,
    });

    // 3. Open editor
    setSelectedNote(optimisticNote);
    setPage(optimisticNote.id);
  };

  return (
    <QueryArrayWrapper data={items || []} isLoading={pagesLoading}>
      {(data) => (
        <Main fixed>
          <section className="flex h-full gap-6">
            {/* Left Side */}
            <div className="flex w-full min-w-[300px] flex-col gap-3 sm:w-56 lg:w-72 2xl:w-80">
              <div className="sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <Typography variant="h2">Notes</Typography>
                  </div>
                </div>

                <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <ScrollArea className="-mx-3 h-full overflow-scroll px-3">
                {data.map((note) => {
                  const { title, id, iconEmoji } = note;

                  return (
                    <Fragment key={id}>
                      <CardActionRipple
                        className={cn(
                          "p-4 rounded-md bg-accent w-full flex flex-col gap-3 mb-3",
                          {
                            "bg-orange-200": note.id === page,
                          }
                        )}
                        onClick={() => {
                          setSelectedNote(note);
                          setPage(note.id);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="large"
                            className="text-base font-medium"
                          >
                            {iconEmoji} {title}
                          </Typography>
                        </div>
                        <Typography variant="muted" className="line-clamp-2">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Porro explicabo deserunt sint molestias vitae
                          doloribus ipsum eveniet tenetur est. Atque provident
                          aliquam harum inventore libero. Atque enim sapiente
                          ratione aliquam?
                        </Typography>
                        <div className="flex items-center justify-between">
                          <Typography variant="muted" className="text-xs">
                            {date(note.createdAt).fromNow()}
                          </Typography>
                        </div>
                      </CardActionRipple>
                    </Fragment>
                  );
                })}
              </ScrollArea>
            </div>

            {/* Right Side */}
            <QueryObjectWrapper
              data={blockDatas}
              isLoading={blocksLoading || blocksFetching}
              fallBackEmpty={
                <div
                  className={cn(
                    "absolute inset-0 start-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-card shadow-xs sm:static sm:z-auto sm:flex"
                  )}
                >
                  <div className="flex flex-col items-center space-y-6">
                    <div className="flex size-16 items-center justify-center rounded-full border-2 border-border">
                      <MessagesSquare className="size-8" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h1 className="text-xl font-semibold">Your notes</h1>
                      <p className="text-sm text-muted-foreground">
                        Create a note to start a conversation
                      </p>
                    </div>
                    <Button onClick={handleCreateNote}>
                      <Plus className="size-4" />
                      Create a note
                    </Button>
                  </div>
                </div>
              }
            >
              {(state) => {
                const stateFallback = normalizeLexicalState(state);

                return (
                  <div className="flex-1 overflow-y-auto">
                    <Editor
                      key={page}
                      editorSerializedState={
                        stateFallback as unknown as SerializedEditorState
                      }
                    />
                  </div>
                );
              }}
            </QueryObjectWrapper>
          </section>
        </Main>
      )}
    </QueryArrayWrapper>
  );
};

export default WorkspaceScreen;
