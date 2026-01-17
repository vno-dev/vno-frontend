"use client"

import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { EditorState, SerializedEditorState } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"
import { debounce } from "lodash"
import { useMemo } from "react"
import { nodes } from "./nodes"
import { Plugins } from "./plugins"

interface EditorProps {
    initialSerializedState?: SerializedEditorState;
    onSerializedChange?: (state: SerializedEditorState) => void;
    className?: string;
}

export function AppEditor({
    initialSerializedState,
    onSerializedChange,
    className,

}: EditorProps) {
    console.log("Editor render");
    const debouncedChange = useMemo(
        () =>
            debounce((editorState: EditorState) => {
                onSerializedChange?.(editorState.toJSON());
            }, 500),
        [onSerializedChange]
    );

    const initialConfig: InitialConfigType = useMemo(() => ({
        namespace: "Editor",
        theme: editorTheme,
        nodes,
        onError: (error: Error) => {
            console.error(error)
        },
        editorState: initialSerializedState
            ? JSON.stringify(initialSerializedState)
            : undefined,
    }), [initialSerializedState]);

    return (
        <div className={cn("bg-background overflow-hidden rounded-lg shadow",
            "flex flex-col h-full min-h-0", className)}>
            <LexicalComposer
                initialConfig={{
                    ...initialConfig,
                    ...(initialSerializedState
                        ? { editorState: JSON.stringify(initialSerializedState) }
                        : {}),
                }}

            >
                <TooltipProvider>
                    <Plugins />

                    {initialSerializedState && (
                        <OnChangePlugin
                            ignoreSelectionChange={true}
                            onChange={(editorState) => {
                                editorState.read(() => {
                                    debouncedChange(editorState);
                                });
                            }}
                        />
                    )}
                </TooltipProvider>
            </LexicalComposer>
        </div>
    )
}
