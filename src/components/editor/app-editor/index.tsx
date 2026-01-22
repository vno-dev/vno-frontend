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

// Mapping từ type gốc sang id-type
const TYPE_MAPPING: Record<string, string> = {
    paragraph: 'id-paragraph',
    heading: 'id-heading',
    quote: 'id-quote',
    list: 'id-list',
    listitem: 'id-listitem',
    link: 'id-link',
    autolink: 'id-auto-link',
    overflow: 'id-overflow',
    hashtag: 'id-hashtag',
    table: 'id-table',
    tablecell: 'id-tablecell',
    tablerow: 'id-tablerow',
    code: 'id-code',
    'code-highlight': 'id-code-highlight',
    horizontalrule: 'id-horizontalrule',
};

// Transform node để chuyển type gốc sang id-type nếu có field 'id'
function transformNode(node: Record<string, unknown>): Record<string, unknown> {
    const transformed = { ...node };

    // Nếu node có id và type là type gốc, chuyển sang id-type
    if (transformed.id && typeof transformed.type === 'string') {
        const idType = TYPE_MAPPING[transformed.type];
        if (idType) {
            transformed.type = idType;
        }
    }

    // Đệ quy transform children
    if (Array.isArray(transformed.children)) {
        transformed.children = transformed.children.map((child: Record<string, unknown>) =>
            transformNode(child)
        );
    }

    return transformed;
}

// Transform toàn bộ serialized state
function transformSerializedState(state: SerializedEditorState): SerializedEditorState {
    return {
        ...state,
        root: transformNode(state.root as Record<string, unknown>) as SerializedEditorState['root'],
    };
}

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

    // Transform state để chuyển đổi types nếu cần
    const transformedState = useMemo(() => {
        if (!initialSerializedState) return undefined;
        return transformSerializedState(initialSerializedState);
    }, [initialSerializedState]);

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
        editorState: transformedState
            ? JSON.stringify(transformedState)
            : undefined,
    }), [transformedState]);

    return (
        <div className={cn("bg-background overflow-hidden rounded-lg shadow",
            "flex flex-col h-full min-h-0", className)}>
            <LexicalComposer initialConfig={initialConfig}>
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
