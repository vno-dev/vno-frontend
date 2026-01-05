"use client";

import React, { useState } from "react";
import { SerializedEditorState } from "lexical";

import { Editor } from "@/components/blocks/editor-x/editor";
import { Typography } from "@/components/common/typography";
import { Main } from "@/components/layouts/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/* ---------------- INITIAL EDITOR STATE ---------------- */

export const initialValue = {
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
} as unknown as SerializedEditorState;

/* ---------------- MOCK DATA ---------------- */

const notesData = [
  {
    id: 1,
    title: "Grocery list / Stores",
    content:
      "Bread Flour - Instant Dry Yeast- Extra-virgin Olive Oil, 5 banana shallots - 4 garlic cloves.",
    time: "1 min",
    location: "San Francisco, CA",
    color: "orange",
    tags: ["#shopping", "#groceries"],
    data: initialValue,
  },
  {
    id: 2,
    title: "Books to read 📚",
    content: "Cheers to the books we've been meaning to read all these years.",
    time: "5 min",
    color: "orange",
    tags: ["#reading", "#books", "#2024"],
    data: initialValue,
  },
  {
    id: 3,
    title: "Write down your ideas 💡",
    content:
      "Sometimes, on Mondays, when servers are announcing the specials...",
    time: "1 day",
    color: "featured",
    tags: ["#ideas", "#todo"],
    avatars: [
      { src: "/placeholder.svg", fallback: "U1" },
      { src: "/placeholder.svg", fallback: "U2" },
    ],
    data: initialValue,
  },
  {
    id: 4,
    title: "Curried Carrot Soup",
    content: "Curried Carrot and Fennel Soup with Turmeric...",
    time: "2 days",
    color: "white",
    tags: ["#recipes", "#soups"],
    data: initialValue,
  },
  {
    id: 5,
    title: "Mexican Tomatillo Scrambled Eggs 🌶️",
    content: "#recipes #savory",
    time: "3 days",
    color: "white",
    tags: ["#recipes"],
    data: initialValue,
  },
];

/* ---------------- SCREEN ---------------- */

const NotesScreen = () => {
  const [selectedNote, setSelectedNote] = useState(notesData[0]);
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    notesData[0].data
  );

  return (
    <Main fixed className="overflow-hidden">
      <div className="flex h-full gap-6">
        {/* -------- LEFT: NOTES LIST -------- */}
        <aside className="w-[300px] h-full flex flex-col">
          <Typography variant="h2" className="mb-4">
            Notes
          </Typography>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
            {notesData.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNote(note);
                  setEditorState(note.data);
                }}
                className={cn(
                  "rounded-lg p-3 cursor-pointer bg-card transition",
                  note.id === selectedNote?.id && "bg-[#FDB661]"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{note.title}</h3>
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full",
                      note.color === "featured"
                        ? "bg-white/50"
                        : "bg-orange-400"
                    )}
                  />
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
                  {note.content}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{note.time}</span>

                  {note.location && (
                    <span className="text-orange-500">{note.location}</span>
                  )}

                  {note.avatars && (
                    <div className="flex items-center -space-x-2">
                      {note.avatars.map((avatar, i) => (
                        <Avatar
                          key={i}
                          className="w-6 h-6 border-2 border-orange-400"
                        >
                          <AvatarImage src={avatar.src} />
                          <AvatarFallback className="text-xs">
                            {avatar.fallback}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* -------- RIGHT: EDITOR -------- */}
        <section className="flex-1 h-full overflow-hidden">
          <div className="h-full overflow-y-auto p-2">
            <Editor
              className="border-none shadow-none"
              withToolbar={false}
              editorSerializedState={editorState}
              onSerializedChange={setEditorState}
            />
          </div>
        </section>
      </div>
    </Main>
  );
};

export default NotesScreen;
