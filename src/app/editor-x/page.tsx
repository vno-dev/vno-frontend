"use client";

import { AppEditor } from "@/components/editor/app-editor";
import {
    convertLexicalToUniversal,
    convertUniversalToLexical,
    UniversalDocument,
} from "@/components/editor/app-editor/converter";
import { Main } from "@/components/layouts/main-container";
import { SerializedEditorState } from "lexical";
import { useMemo, useState } from "react";

// Editor-agnostic document format
// Can be converted to Lexical, TipTap, or any other editor
const sampleDocument: UniversalDocument = {
    id: "doc_1",
    version: 1,
    blocks: [
        {
            id: "h1",
            type: "heading",
            attrs: { level: 1 },
            content: [
                {
                    type: "text",
                    text: "Hello Editor",
                    marks: [{ type: "bold" }],
                },
            ],
        },
        {
            id: "p1",
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: "This is ",
                },
                {
                    type: "text",
                    text: "editor-agnostic",
                    marks: [{ type: "italic" }],
                },
                {
                    type: "text",
                    text: " content.",
                },
            ],
        },
        {
            id: "p2",
            type: "paragraph",
            content: [
                {
                    type: "link",
                    attrs: { href: "https://example.com", target: "_blank" },
                    content: [
                        {
                            type: "text",
                            text: "Click here",
                            marks: [{ type: "underline" }],
                        },
                    ],
                },
            ],
        },
        {
            id: "code1",
            type: "code",
            attrs: { language: "ts" },
            content: [
                {
                    type: "text",
                    text: "console.log('Hello world')",
                },
            ],
        },
        {
            id: "list1",
            type: "list",
            attrs: { ordered: false },
            children: [
                {
                    id: "li1",
                    type: "list_item",
                    content: [{ type: "text", text: "First item" }],
                },
                {
                    id: "li2",
                    type: "list_item",
                    content: [
                        {
                            type: "text",
                            text: "Second item",
                            marks: [{ type: "bold" }],
                        },
                    ],
                },
            ],
        },
    ],
};

export default function EditorPage() {
    // Convert universal doc to Lexical format for initial state
    const initialLexicalState = useMemo(
        () => convertUniversalToLexical(sampleDocument),
        []
    );

    const [editorState, setEditorState] =
        useState<SerializedEditorState>(initialLexicalState);

    // Convert current Lexical state back to universal format for display
    const universalState = useMemo(
        () => convertLexicalToUniversal(editorState, sampleDocument.id),
        [editorState]
    );

    return (
        <Main fixed className="min-h-screen">
            <div className="h-[calc(100vh-24px)] grid grid-cols-3 gap-3">
                <AppEditor
                    initialSerializedState={editorState}
                    onSerializedChange={setEditorState}
                    className="flex-1"
                />
                <div className="flex-1 overflow-y-auto">
                    <h3 className="font-bold mb-2 text-sm">Lexical State:</h3>
                    <pre className="text-xs">
                        {JSON.stringify(editorState, null, 2)}
                    </pre>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <h3 className="font-bold mb-2 text-sm">
                        Universal State (Editor-Agnostic):
                    </h3>
                    <pre className="text-xs">
                        {JSON.stringify(universalState, null, 2)}
                    </pre>
                </div>
            </div>
        </Main>
    );
}

