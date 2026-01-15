/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
    $applyNodeReplacement,
    LexicalNode,
    NodeKey,
    ParagraphNode,
    SerializedParagraphNode,
    Spread,
    TextNode,
    SerializedTextNode,
} from 'lexical';
import { HeadingNode, SerializedHeadingNode, QuoteNode, SerializedQuoteNode } from '@lexical/rich-text';
import { ListNode, SerializedListNode, ListItemNode, SerializedListItemNode } from '@lexical/list';
import { LinkNode, SerializedLinkNode, AutoLinkNode, SerializedAutoLinkNode } from '@lexical/link';
import { OverflowNode, SerializedOverflowNode } from '@lexical/overflow';
import { HashtagNode } from '@lexical/hashtag';
import { TableNode, SerializedTableNode, TableCellNode, SerializedTableCellNode, TableRowNode, SerializedTableRowNode } from '@lexical/table';
import { CodeNode, SerializedCodeNode, CodeHighlightNode } from '@lexical/code';
import { HorizontalRuleNode, SerializedHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

// Helper to generate UUIDs
function generateId(): string {
    return crypto.randomUUID();
}

// --- ParagraphNode ---
export type SerializedIdParagraphNode = Spread<
    { id: string },
    SerializedParagraphNode
>;

export class IdParagraphNode extends ParagraphNode {
    __id: string;

    constructor(id: string = generateId(), key?: NodeKey) {
        super(key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-paragraph';
    }

    static clone(node: IdParagraphNode): IdParagraphNode {
        return new IdParagraphNode(node.__id, node.__key);
    }

    static importJSON(json: SerializedIdParagraphNode): IdParagraphNode {
        const node = $createIdParagraphNode(json.id).updateFromJSON(json);
        return node;
    }

    exportJSON(): SerializedIdParagraphNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-paragraph',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdParagraphNode(id?: string): IdParagraphNode {
    return $applyNodeReplacement(new IdParagraphNode(id));
}

export function $isIdParagraphNode(node: LexicalNode | null | undefined): node is IdParagraphNode {
    return node instanceof IdParagraphNode;
}


// --- HeadingNode ---
export type SerializedIdHeadingNode = Spread<
    { id: string },
    SerializedHeadingNode
>;

export class IdHeadingNode extends HeadingNode {
    __id: string;

    constructor(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', id: string = generateId(), key?: NodeKey) {
        super(tag, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-heading';
    }

    static clone(node: IdHeadingNode): IdHeadingNode {
        return new IdHeadingNode(node.getTag(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdHeadingNode): IdHeadingNode {
        const node = $createIdHeadingNode(json.tag, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdHeadingNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-heading',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdHeadingNode(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', id?: string): IdHeadingNode {
    return $applyNodeReplacement(new IdHeadingNode(tag, id));
}

export function $isIdHeadingNode(node: LexicalNode | null | undefined): node is IdHeadingNode {
    return node instanceof IdHeadingNode;
}


// --- QuoteNode ---
export type SerializedIdQuoteNode = Spread<
    { id: string },
    SerializedQuoteNode
>;

export class IdQuoteNode extends QuoteNode {
    __id: string;

    constructor(id: string = generateId(), key?: NodeKey) {
        super(key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-quote';
    }

    static clone(node: IdQuoteNode): IdQuoteNode {
        return new IdQuoteNode(node.__id, node.__key);
    }

    static importJSON(json: SerializedIdQuoteNode): IdQuoteNode {
        const node = $createIdQuoteNode(json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdQuoteNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-quote',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdQuoteNode(id?: string): IdQuoteNode {
    return $applyNodeReplacement(new IdQuoteNode(id));
}


// --- ListNode ---
export type SerializedIdListNode = Spread<
    { id: string },
    SerializedListNode
>;

export class IdListNode extends ListNode {
    __id: string;

    constructor(listType: 'number' | 'bullet' | 'check', start: number, id: string = generateId(), key?: NodeKey) {
        super(listType, start, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-list';
    }

    static clone(node: IdListNode): IdListNode {
        return new IdListNode(node.getListType(), node.getStart(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdListNode): IdListNode {
        const node = $createIdListNode(json.listType, json.start, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdListNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-list',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdListNode(listType: 'number' | 'bullet' | 'check', start: number = 1, id?: string): IdListNode {
    return $applyNodeReplacement(new IdListNode(listType, start, id));
}


// --- ListItemNode ---
export type SerializedIdListItemNode = Spread<
    { id: string },
    SerializedListItemNode
>;

export class IdListItemNode extends ListItemNode {
    __id: string;

    constructor(value?: number, checked?: boolean, id: string = generateId(), key?: NodeKey) {
        super(value, checked, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-listitem';
    }

    static clone(node: IdListItemNode): IdListItemNode {
        return new IdListItemNode(node.getValue(), node.getChecked(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdListItemNode): IdListItemNode {
        const node = $createIdListItemNode(json.value, json.checked, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdListItemNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-listitem',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdListItemNode(value?: number, checked?: boolean, id?: string): IdListItemNode {
    return $applyNodeReplacement(new IdListItemNode(value, checked, id));
}


// --- LinkNode ---
export type SerializedIdLinkNode = Spread<
    { id: string },
    SerializedLinkNode
>;

export class IdLinkNode extends LinkNode {
    __id: string;

    constructor(url: string, attributes: { target?: string; rel?: string; title?: string } = {}, id: string = generateId(), key?: NodeKey) {
        super(url, attributes, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-link';
    }

    static clone(node: IdLinkNode): IdLinkNode {
        return new IdLinkNode(
            node.getURL(),
            { target: node.getTarget() || undefined, rel: node.getRel() || undefined, title: node.getTitle() || undefined },
            node.__id,
            node.__key
        );
    }

    static importJSON(json: SerializedIdLinkNode): IdLinkNode {
        const node = $createIdLinkNode(json.url, { target: json.target || undefined, rel: json.rel || undefined, title: json.title || undefined }, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdLinkNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-link',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdLinkNode(url: string, attributes?: { target?: string; rel?: string; title?: string }, id?: string): IdLinkNode {
    return $applyNodeReplacement(new IdLinkNode(url, attributes, id));
}


// --- AutoLinkNode ---
export type SerializedIdAutoLinkNode = Spread<
    { id: string },
    SerializedAutoLinkNode
>;

export class IdAutoLinkNode extends AutoLinkNode {
    __id: string;

    constructor(url: string, attributes: { target?: string; rel?: string; title?: string } = {}, id: string = generateId(), key?: NodeKey) {
        super(url, attributes, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-auto-link';
    }

    static clone(node: IdAutoLinkNode): IdAutoLinkNode {
        return new IdAutoLinkNode(
            node.getURL(),
            { target: node.getTarget() || undefined, rel: node.getRel() || undefined, title: node.getTitle() || undefined },
            node.__id,
            node.__key
        );
    }

    static importJSON(json: SerializedIdAutoLinkNode): IdAutoLinkNode {
        const node = $createIdAutoLinkNode(json.url, { target: json.target || undefined, rel: json.rel || undefined, title: json.title || undefined }, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdAutoLinkNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-auto-link',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdAutoLinkNode(url: string, attributes?: { target?: string; rel?: string; title?: string }, id?: string): IdAutoLinkNode {
    return $applyNodeReplacement(new IdAutoLinkNode(url, attributes, id));
}


// --- OverflowNode ---
export type SerializedIdOverflowNode = Spread<
    { id: string },
    SerializedOverflowNode
>;

export class IdOverflowNode extends OverflowNode {
    __id: string;

    constructor(id: string = generateId(), key?: NodeKey) {
        super(key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-overflow';
    }

    static clone(node: IdOverflowNode): IdOverflowNode {
        return new IdOverflowNode(node.__id, node.__key);
    }

    static importJSON(json: SerializedIdOverflowNode): IdOverflowNode {
        const node = $createIdOverflowNode(json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdOverflowNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-overflow',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdOverflowNode(id?: string): IdOverflowNode {
    return $applyNodeReplacement(new IdOverflowNode(id));
}


// --- HashtagNode ---
export type SerializedIdHashtagNode = Spread<
    { id: string },
    SerializedTextNode
>;

export class IdHashtagNode extends HashtagNode {
    __id: string;

    constructor(text: string, id: string = generateId(), key?: NodeKey) {
        super(text, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-hashtag';
    }

    static clone(node: IdHashtagNode): IdHashtagNode {
        return new IdHashtagNode(node.getTextContent(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdHashtagNode): IdHashtagNode {
        const node = $createIdHashtagNode(json.text, json.id);
        node.setFormat(json.format);
        node.setDetail(json.detail);
        node.setMode(json.mode);
        node.setStyle(json.style);
        return node;
    }

    exportJSON(): SerializedIdHashtagNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-hashtag',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdHashtagNode(text: string, id?: string): IdHashtagNode {
    return $applyNodeReplacement(new IdHashtagNode(text, id));
}


// --- TableNode ---
export type SerializedIdTableNode = Spread<
    { id: string },
    SerializedTableNode
>;

export class IdTableNode extends TableNode {
    __id: string;

    constructor(id: string = generateId(), key?: NodeKey) {
        super(key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-table';
    }

    static clone(node: IdTableNode): IdTableNode {
        return new IdTableNode(node.__id, node.__key);
    }

    static importJSON(json: SerializedIdTableNode): IdTableNode {
        const node = $createIdTableNode(json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdTableNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-table',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdTableNode(id?: string): IdTableNode {
    return $applyNodeReplacement(new IdTableNode(id));
}


// --- TableCellNode ---
export type SerializedIdTableCellNode = Spread<
    { id: string },
    SerializedTableCellNode
>;

export class IdTableCellNode extends TableCellNode {
    __id: string;

    constructor(headerState: number, colSpan: number, width?: number, id: string = generateId(), key?: NodeKey) {
        super(headerState, colSpan, width, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-tablecell';
    }

    static clone(node: IdTableCellNode): IdTableCellNode {
        return new IdTableCellNode(node.getHeaderStyles(), node.getColSpan(), node.getWidth(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdTableCellNode): IdTableCellNode {
        // Explicitly handle width type
        const width: number | undefined = json.width === undefined ? undefined : json.width;
        const node = $createIdTableCellNode(json.headerState, json.colSpan || 1, width, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        node.setBackgroundColor(json.backgroundColor || '#fff');
        return node;
    }

    exportJSON(): SerializedIdTableCellNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-tablecell',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdTableCellNode(headerState: number, colSpan: number, width?: number, id?: string): IdTableCellNode {
    return $applyNodeReplacement(new IdTableCellNode(headerState, colSpan, width, id));
}


// --- TableRowNode ---
export type SerializedIdTableRowNode = Spread<
    { id: string },
    SerializedTableRowNode
>;

export class IdTableRowNode extends TableRowNode {
    __id: string;

    constructor(height?: number, id: string = generateId(), key?: NodeKey) {
        super(height, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-tablerow';
    }

    static clone(node: IdTableRowNode): IdTableRowNode {
        return new IdTableRowNode(node.getHeight(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdTableRowNode): IdTableRowNode {
        const node = $createIdTableRowNode(json.height, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdTableRowNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-tablerow',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdTableRowNode(height?: number, id?: string): IdTableRowNode {
    return $applyNodeReplacement(new IdTableRowNode(height, id));
}


// --- CodeNode ---
export type SerializedIdCodeNode = Spread<
    { id: string },
    SerializedCodeNode
>;

export class IdCodeNode extends CodeNode {
    __id: string;

    constructor(language: string | undefined | null, id: string = generateId(), key?: NodeKey) {
        super(language, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-code';
    }

    static clone(node: IdCodeNode): IdCodeNode {
        return new IdCodeNode(node.getLanguage(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdCodeNode): IdCodeNode {
        const node = $createIdCodeNode(json.language, json.id);
        node.setFormat(json.format);
        node.setIndent(json.indent);
        node.setDirection(json.direction);
        return node;
    }

    exportJSON(): SerializedIdCodeNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-code',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdCodeNode(language: string | undefined | null, id?: string): IdCodeNode {
    return $applyNodeReplacement(new IdCodeNode(language, id));
}


// --- CodeHighlightNode ---
export type SerializedIdCodeHighlightNode = Spread<
    { id: string; highlightType: string | null | undefined },
    SerializedTextNode
>;

export class IdCodeHighlightNode extends CodeHighlightNode {
    __id: string;

    constructor(text: string, highlightType?: string | undefined | null, id: string = generateId(), key?: NodeKey) {
        super(text, highlightType, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-code-highlight';
    }

    static clone(node: IdCodeHighlightNode): IdCodeHighlightNode {
        return new IdCodeHighlightNode(node.getTextContent(), node.getHighlightType(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdCodeHighlightNode): IdCodeHighlightNode {
        const node = $createIdCodeHighlightNode(json.text, json.highlightType, json.id);
        node.setFormat(json.format);
        node.setDetail(json.detail);
        node.setMode(json.mode);
        node.setStyle(json.style);
        return node;
    }

    exportJSON(): SerializedIdCodeHighlightNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-code-highlight',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdCodeHighlightNode(text: string, highlightType?: string | undefined | null, id?: string): IdCodeHighlightNode {
    return $applyNodeReplacement(new IdCodeHighlightNode(text, highlightType, id));
}


// --- HorizontalRuleNode ---
export type SerializedIdHorizontalRuleNode = Spread<
    { id: string },
    SerializedHorizontalRuleNode
>;

export class IdHorizontalRuleNode extends HorizontalRuleNode {
    __id: string;

    constructor(id: string = generateId(), key?: NodeKey) {
        super(key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-horizontalrule';
    }

    static clone(node: IdHorizontalRuleNode): IdHorizontalRuleNode {
        return new IdHorizontalRuleNode(node.__id, node.__key);
    }

    static importJSON(json: SerializedIdHorizontalRuleNode): IdHorizontalRuleNode {
        return $createIdHorizontalRuleNode(json.id);
    }

    exportJSON(): SerializedIdHorizontalRuleNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-horizontalrule',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdHorizontalRuleNode(id?: string): IdHorizontalRuleNode {
    return $applyNodeReplacement(new IdHorizontalRuleNode(id));
}
// --- TextNode ---
export type SerializedIdTextNode = Spread<
    { id: string },
    SerializedTextNode
>;

export class IdTextNode extends TextNode {
    __id: string;

    constructor(text: string, id: string = generateId(), key?: NodeKey) {
        super(text, key);
        this.__id = id;
    }

    static getType(): string {
        return 'id-text';
    }

    static clone(node: IdTextNode): IdTextNode {
        return new IdTextNode(node.getTextContent(), node.__id, node.__key);
    }

    static importJSON(json: SerializedIdTextNode): IdTextNode {
        const node = $createIdTextNode(json.text, json.id);
        node.setFormat(json.format);
        node.setDetail(json.detail);
        node.setMode(json.mode);
        node.setStyle(json.style);
        return node;
    }

    exportJSON(): SerializedIdTextNode {
        return {
            ...super.exportJSON(),
            id: this.__id,
            type: 'id-text',
        };
    }

    getId(): string {
        return this.__id;
    }
}

export function $createIdTextNode(text: string, id?: string): IdTextNode {
    return $applyNodeReplacement(new IdTextNode(text, id));
}

export function $isIdTextNode(node: LexicalNode | null | undefined): node is IdTextNode {
    return node instanceof IdTextNode;
}
