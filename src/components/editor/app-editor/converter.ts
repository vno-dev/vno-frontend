/**
 * Editor-agnostic JSON to Lexical converter
 * 
 * This module converts a universal document format to Lexical's serialized state.
 * The universal format can also be converted to TipTap or other editors.
 */

import { SerializedEditorState, SerializedLexicalNode } from 'lexical';

// ============================================
// Universal Document Types (Editor-Agnostic)
// ============================================

export interface UniversalMark {
    type: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'subscript' | 'superscript';
}

export interface UniversalTextNode {
    type: 'text';
    text: string;
    marks?: UniversalMark[];
}

export interface UniversalLinkNode {
    type: 'link';
    attrs: {
        href: string;
        target?: string;
        rel?: string;
        title?: string;
    };
    content: UniversalTextNode[];
}

export type UniversalInlineNode = UniversalTextNode | UniversalLinkNode;

export interface UniversalParagraphBlock {
    id: string;
    type: 'paragraph';
    content?: UniversalInlineNode[];
}

export interface UniversalHeadingBlock {
    id: string;
    type: 'heading';
    attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 };
    content?: UniversalInlineNode[];
}

export interface UniversalCodeBlock {
    id: string;
    type: 'code';
    attrs?: { language?: string };
    content?: UniversalTextNode[];
}

export interface UniversalQuoteBlock {
    id: string;
    type: 'quote';
    content?: UniversalInlineNode[];
}

export interface UniversalListItemBlock {
    id: string;
    type: 'list_item';
    content?: UniversalInlineNode[];
    checked?: boolean;
}

export interface UniversalListBlock {
    id: string;
    type: 'list';
    attrs?: { ordered?: boolean; start?: number };
    children: UniversalListItemBlock[];
}

export interface UniversalHorizontalRuleBlock {
    id: string;
    type: 'horizontal_rule';
}

export type UniversalBlock =
    | UniversalParagraphBlock
    | UniversalHeadingBlock
    | UniversalCodeBlock
    | UniversalQuoteBlock
    | UniversalListBlock
    | UniversalHorizontalRuleBlock;

export interface UniversalDocument {
    id: string;
    version?: number;
    blocks: UniversalBlock[];
}

// ============================================
// Lexical Conversion Helpers
// ============================================

/**
 * Convert universal marks to Lexical text format number
 * Lexical uses bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript
 */
function marksToLexicalFormat(marks?: UniversalMark[]): number {
    if (!marks || marks.length === 0) return 0;

    let format = 0;
    for (const mark of marks) {
        switch (mark.type) {
            case 'bold':
                format |= 1;
                break;
            case 'italic':
                format |= 2;
                break;
            case 'strikethrough':
                format |= 4;
                break;
            case 'underline':
                format |= 8;
                break;
            case 'code':
                format |= 16;
                break;
            case 'subscript':
                format |= 32;
                break;
            case 'superscript':
                format |= 64;
                break;
        }
    }
    return format;
}

/**
 * Convert universal text node to Lexical text node
 */
function convertTextNode(node: UniversalTextNode): SerializedLexicalNode {
    return {
        type: 'text',
        version: 1,
        text: node.text,
        format: marksToLexicalFormat(node.marks),
        mode: 'normal',
        style: '',
        detail: 0,
    } as SerializedLexicalNode;
}

/**
 * Convert universal link node to Lexical link node
 */
function convertLinkNode(node: UniversalLinkNode, id?: string): SerializedLexicalNode {
    const children = node.content.map(convertTextNode);

    return {
        type: 'id-link',
        version: 1,
        url: node.attrs.href,
        target: node.attrs.target || null,
        rel: node.attrs.rel || null,
        title: node.attrs.title || null,
        id: id || crypto.randomUUID(),
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal inline content to Lexical children
 */
function convertInlineContent(content?: UniversalInlineNode[]): SerializedLexicalNode[] {
    if (!content || content.length === 0) return [];

    return content.map((node) => {
        if (node.type === 'text') {
            return convertTextNode(node);
        } else if (node.type === 'link') {
            return convertLinkNode(node);
        }
        return convertTextNode({ type: 'text', text: '' });
    });
}

/**
 * Convert universal paragraph to Lexical paragraph
 */
function convertParagraph(block: UniversalParagraphBlock): SerializedLexicalNode {
    return {
        type: 'id-paragraph',
        version: 1,
        id: block.id,
        children: convertInlineContent(block.content),
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal heading to Lexical heading
 */
function convertHeading(block: UniversalHeadingBlock): SerializedLexicalNode {
    return {
        type: 'id-heading',
        version: 1,
        id: block.id,
        tag: `h${block.attrs.level}`,
        children: convertInlineContent(block.content),
        direction: 'ltr',
        format: '',
        indent: 0,
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal code block to Lexical code
 */
function convertCode(block: UniversalCodeBlock): SerializedLexicalNode {
    // Code block in Lexical wraps text in code-highlight nodes
    const codeText = block.content?.map(t => t.text).join('') || '';

    const children: SerializedLexicalNode[] = codeText ? [{
        type: 'id-code-highlight',
        version: 1,
        text: codeText,
        highlightType: null,
        id: crypto.randomUUID(),
        format: 0,
        mode: 'normal',
        style: '',
        detail: 0,
    } as unknown as SerializedLexicalNode] : [];

    return {
        type: 'id-code',
        version: 1,
        id: block.id,
        language: block.attrs?.language || null,
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal quote to Lexical quote
 */
function convertQuote(block: UniversalQuoteBlock): SerializedLexicalNode {
    return {
        type: 'id-quote',
        version: 1,
        id: block.id,
        children: convertInlineContent(block.content),
        direction: 'ltr',
        format: '',
        indent: 0,
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal list to Lexical list
 */
function convertList(block: UniversalListBlock): SerializedLexicalNode {
    const listType = block.attrs?.ordered ? 'number' : 'bullet';

    const children = block.children.map((item, index) => ({
        type: 'id-listitem',
        version: 1,
        id: item.id,
        value: index + 1,
        checked: item.checked ?? false,
        children: convertInlineContent(item.content),
        direction: 'ltr',
        format: '',
        indent: 0,
    } as unknown as SerializedLexicalNode));

    return {
        type: 'id-list',
        version: 1,
        id: block.id,
        listType,
        start: block.attrs?.start || 1,
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        tag: listType === 'number' ? 'ol' : 'ul',
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert universal horizontal rule to Lexical
 */
function convertHorizontalRule(block: UniversalHorizontalRuleBlock): SerializedLexicalNode {
    return {
        type: 'id-horizontalrule',
        version: 1,
        id: block.id,
    } as unknown as SerializedLexicalNode;
}

/**
 * Convert a universal block to Lexical node
 */
function convertBlock(block: UniversalBlock): SerializedLexicalNode {
    switch (block.type) {
        case 'paragraph':
            return convertParagraph(block);
        case 'heading':
            return convertHeading(block);
        case 'code':
            return convertCode(block);
        case 'quote':
            return convertQuote(block);
        case 'list':
            return convertList(block);
        case 'horizontal_rule':
            return convertHorizontalRule(block);
        default:
            // Fallback to empty paragraph
            return convertParagraph({
                id: crypto.randomUUID(),
                type: 'paragraph',
                content: [],
            });
    }
}

// ============================================
// Main Converter Function
// ============================================

/**
 * Convert a universal document to Lexical serialized state
 * 
 * @example
 * ```ts
 * const universalDoc: UniversalDocument = {
 *   id: "doc_1",
 *   blocks: [
 *     {
 *       id: "p1",
 *       type: "paragraph",
 *       content: [{ type: "text", text: "Hello World" }]
 *     }
 *   ]
 * };
 * 
 * const lexicalState = convertUniversalToLexical(universalDoc);
 * // Use with AppEditor: <AppEditor initialSerializedState={lexicalState} />
 * ```
 */
export function convertUniversalToLexical(doc: UniversalDocument): SerializedEditorState {
    const children = doc.blocks.map(convertBlock);

    // Ensure at least one paragraph if empty
    if (children.length === 0) {
        children.push(convertParagraph({
            id: crypto.randomUUID(),
            type: 'paragraph',
            content: [],
        }));
    }

    return {
        root: {
            type: 'root',
            version: 1,
            children,
            direction: 'ltr',
            format: '',
            indent: 0,
        },
    } as SerializedEditorState;
}

/**
 * Convert Lexical serialized state back to universal document
 * Useful for saving to database in editor-agnostic format
 */
export function convertLexicalToUniversal(state: SerializedEditorState, docId?: string): UniversalDocument {
    const blocks: UniversalBlock[] = [];

    const rootChildren = (state.root as { children?: SerializedLexicalNode[] }).children || [];

    for (const node of rootChildren) {
        const block = convertLexicalNodeToUniversal(node);
        if (block) {
            blocks.push(block);
        }
    }

    return {
        id: docId || crypto.randomUUID(),
        version: 1,
        blocks,
    };
}

/**
 * Convert Lexical format number to universal marks
 */
function lexicalFormatToMarks(format: number): UniversalMark[] {
    const marks: UniversalMark[] = [];
    if (format & 1) marks.push({ type: 'bold' });
    if (format & 2) marks.push({ type: 'italic' });
    if (format & 4) marks.push({ type: 'strikethrough' });
    if (format & 8) marks.push({ type: 'underline' });
    if (format & 16) marks.push({ type: 'code' });
    if (format & 32) marks.push({ type: 'subscript' });
    if (format & 64) marks.push({ type: 'superscript' });
    return marks;
}

/**
 * Convert Lexical children to universal inline content
 */
function convertLexicalChildrenToInline(children: SerializedLexicalNode[]): UniversalInlineNode[] {
    const content: UniversalInlineNode[] = [];

    for (const child of children) {
        const nodeType = (child as unknown as { type: string }).type;

        if (nodeType === 'text') {
            const textNode = child as unknown as { text: string; format: number };
            const marks = lexicalFormatToMarks(textNode.format || 0);
            content.push({
                type: 'text',
                text: textNode.text,
                ...(marks.length > 0 ? { marks } : {}),
            });
        } else if (nodeType === 'id-link' || nodeType === 'link') {
            const linkNode = child as unknown as {
                url: string;
                target?: string;
                rel?: string;
                title?: string;
                children: SerializedLexicalNode[];
            };
            const linkContent = convertLexicalChildrenToInline(linkNode.children || []);
            content.push({
                type: 'link',
                attrs: {
                    href: linkNode.url,
                    target: linkNode.target || undefined,
                    rel: linkNode.rel || undefined,
                    title: linkNode.title || undefined,
                },
                content: linkContent.filter((n): n is UniversalTextNode => n.type === 'text'),
            });
        }
    }

    return content;
}

/**
 * Convert a Lexical node to universal block
 */
function convertLexicalNodeToUniversal(node: SerializedLexicalNode): UniversalBlock | null {
    const nodeData = node as {
        type: string;
        id?: string;
        tag?: string;
        language?: string;
        listType?: string;
        start?: number;
        checked?: boolean;
        value?: number;
        children?: SerializedLexicalNode[];
    };

    const id = nodeData.id || crypto.randomUUID();
    const children = nodeData.children || [];

    switch (nodeData.type) {
        case 'id-paragraph':
        case 'paragraph':
            return {
                id,
                type: 'paragraph',
                content: convertLexicalChildrenToInline(children),
            };

        case 'id-heading':
        case 'heading': {
            const level = parseInt(nodeData.tag?.replace('h', '') || '1', 10) as 1 | 2 | 3 | 4 | 5 | 6;
            return {
                id,
                type: 'heading',
                attrs: { level },
                content: convertLexicalChildrenToInline(children),
            };
        }

        case 'id-code':
        case 'code': {
            const codeText = children
                .map((c) => (c as { text?: string }).text || '')
                .join('');
            return {
                id,
                type: 'code',
                attrs: { language: nodeData.language || undefined },
                content: codeText ? [{ type: 'text', text: codeText }] : [],
            };
        }

        case 'id-quote':
        case 'quote':
            return {
                id,
                type: 'quote',
                content: convertLexicalChildrenToInline(children),
            };

        case 'id-list':
        case 'list': {
            const listChildren = children.map((item) => {
                const itemData = item as {
                    id?: string;
                    checked?: boolean;
                    children?: SerializedLexicalNode[];
                };
                return {
                    id: itemData.id || crypto.randomUUID(),
                    type: 'list_item' as const,
                    content: convertLexicalChildrenToInline(itemData.children || []),
                    checked: itemData.checked,
                };
            });
            return {
                id,
                type: 'list',
                attrs: {
                    ordered: nodeData.listType === 'number',
                    start: nodeData.start,
                },
                children: listChildren,
            };
        }

        case 'id-horizontalrule':
        case 'horizontalrule':
            return {
                id,
                type: 'horizontal_rule',
            };

        default:
            return null;
    }
}
