"use client";

import { useState } from "react";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-x/editor";
import { Main } from "@/components/layouts/main";

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
                        id: "text_id",
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                id: "root_child_id",
            },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
    },
} as unknown as SerializedEditorState;

export default function EditorPage() {
    const [editorState, setEditorState] =
        useState<SerializedEditorState>(initialValue);
    return (
        <Main fixed className="min-h-screen">
            <Editor
                editorSerializedState={editorState}
                onSerializedChange={(value) => setEditorState(value)}
                className="flex-1"
            />
            <pre>{JSON.stringify(editorState, null, 2)}</pre>
        </Main>
    );
}
