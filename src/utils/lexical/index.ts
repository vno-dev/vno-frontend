import { SerializedEditorState } from "lexical";

const EMPTY_EDITOR_STATE = {
  root: {
    type: "root",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        version: 1,
        format: "",
        indent: 0,
        direction: "ltr",
        children: [],
      },
    ],
  },
} satisfies SerializedEditorState<any>;

export function normalizeLexicalState(raw: unknown): SerializedEditorState {
  if (!raw || typeof raw !== "object" || !("root" in raw)) {
    return EMPTY_EDITOR_STATE;
  }

  const state = raw as Partial<SerializedEditorState>;

  if (
    !state.root ||
    !Array.isArray(state.root.children) ||
    state.root.children.length === 0
  ) {
    return EMPTY_EDITOR_STATE;
  }

  return state as SerializedEditorState;
}
