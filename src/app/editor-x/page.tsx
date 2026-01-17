"use client";

import { AppEditor } from "@/components/editor/app-editor";
import { Main } from "@/components/layouts/main-container";
import { SerializedEditorState } from "lexical";
import { useState } from "react";

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
            <div className="h-[calc(100vh-24px)] grid grid-cols-2 gap-3">
                <AppEditor
                    initialSerializedState={editorState}
                    onSerializedChange={setEditorState}
                    className="flex-1"
                />
                <pre className="flex-1 overflow-y-auto">{JSON.stringify(editorState, null, 2)}</pre>
            </div>

        </Main>
    );
}
