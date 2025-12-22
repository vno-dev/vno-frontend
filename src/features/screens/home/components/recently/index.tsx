"use client";

import { HeadingSection } from "@/features/components";
import React from "react";
import { formatDate } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Folder, MoreHorizontal, Trash2 } from "lucide-react";

const sampleNotes = [
  {
    id: "note-1",
    title: "Plans for future and other directions, what needs to be done",
    description:
      "A Design Direction unifies everyone and adds meaning to web design. It's a combination of art and purpose that guides the process.",
    date: "2021-04-27",
    tags: [
      { name: "Planning", color: "#6366F1" },
      { name: "Design direction", color: "#8B5CF6" },
    ],
    status: "Needs to be done",
  },
  {
    id: "note-2",
    title: "Design challenges",
    description:
      "Design challenges are exercises or competitions that designers can do to boost creativity, create positive habits, and learn new methods.",
    date: "2021-04-27",
    tags: [
      { name: "Workshops", color: "#4F46E5" },
      { name: "Design challenges", color: "#EC4899" },
      { name: "Work in progress", color: "#22C55E" },
    ],
    status: "Work in progress",
  },
  {
    id: "note-3",
    title: "How to conduct a user interview that could improve your product?",
    description:
      "You cannot understand good design if you do not understand people; design is made for people. User interviews are a tool that can help you get this understanding.",
    date: "2021-04-27",
    tags: [
      { name: "Needs to be done", color: "#EAB308" },
      { name: "Questions", color: "#A855F7" },
    ],
    status: "Needs to be done",
  },
  {
    id: "note-4",
    title: "Note B – Dribbble strategy",
    description:
      "Exploring ways to make the Dribbble presence more consistent, aligning visuals and timing with overall product storytelling.",
    date: "2021-04-27",
    tags: [
      { name: "Marketing", color: "#F59E0B" },
      { name: "Social", color: "#0EA5E9" },
    ],
    status: "In review",
  },
];

const HomeScreenRecently = () => {
  return (
    <div>
      <HeadingSection title="Recently note">
        <div className="grid grid-cols-2 gap-4">
          {sampleNotes.map((note) => (
            <div
              key={note.id}
              className="mb-4 break-inside-avoid rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">
                  {formatDate(note.date, "PPP")}
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
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="text-base font-semibold mb-3 text-foreground">
                {note.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                {note.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      color: tag.color,
                      backgroundColor: `${tag.color}20`,
                    }}
                    className="px-3 py-2 text-xs font-medium rounded-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </HeadingSection>
    </div>
  );
};

export default HomeScreenRecently;
