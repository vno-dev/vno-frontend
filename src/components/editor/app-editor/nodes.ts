import {
    IdAutoLinkNode,
    IdCodeHighlightNode,
    IdCodeNode,
    IdHashtagNode,
    IdHeadingNode,
    IdHorizontalRuleNode,
    IdLinkNode,
    IdListItemNode,
    IdListNode,
    IdOverflowNode,
    IdParagraphNode,
    IdQuoteNode,
    IdTableCellNode,
    IdTableNode,
    IdTableRowNode
} from "./id-nodes"

import {
    Klass,
    LexicalNode,
    LexicalNodeReplacement,
    ParagraphNode,
    TextNode,
} from "lexical"

import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { HashtagNode } from "@lexical/hashtag"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { OverflowNode } from "@lexical/overflow"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"

import { AutocompleteNode } from "@/components/editor/nodes/autocomplete-node"
import { TweetNode } from "@/components/editor/nodes/embeds/tweet-node"
import { YouTubeNode } from "@/components/editor/nodes/embeds/youtube-node"
import { EmojiNode } from "@/components/editor/nodes/emoji-node"
import { ImageNode } from "@/components/editor/nodes/image-node"
import { KeywordNode } from "@/components/editor/nodes/keyword-node"
import { LayoutContainerNode } from "@/components/editor/nodes/layout-container-node"
import { LayoutItemNode } from "@/components/editor/nodes/layout-item-node"
import { MentionNode } from "@/components/editor/nodes/mention-node"

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
    [
        IdHeadingNode,
        IdParagraphNode,
        // IdTextNode,
        // Không cần thiết replace TextNode vì id chỉ hoạt động ở cấp block
        TextNode,
        IdQuoteNode,
        IdListNode,
        IdListItemNode,
        IdLinkNode,
        IdAutoLinkNode,
        IdOverflowNode,
        IdHashtagNode,
        IdTableNode,
        IdTableCellNode,
        IdTableRowNode,
        IdCodeNode,
        IdCodeHighlightNode,
        IdHorizontalRuleNode,
        {
            replace: HeadingNode,
            with: (node: HeadingNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdHeadingNode(node.getTag(), existingId);
            },
            withKlass: IdHeadingNode,
        },
        {
            replace: ParagraphNode,
            with: (node: ParagraphNode) => {
                console.log(node);
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdParagraphNode(existingId);
            },
            withKlass: IdParagraphNode,
        },
        {
            replace: QuoteNode,
            with: (node: QuoteNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdQuoteNode(existingId);
            },
            withKlass: IdQuoteNode,
        },
        {
            replace: ListNode,
            with: (node: ListNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdListNode(node.getListType(), node.getStart(), existingId);
            },
            withKlass: IdListNode,
        },
        {
            replace: ListItemNode,
            with: (node: ListItemNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdListItemNode(node.getValue(), node.getChecked(), existingId);
            },
            withKlass: IdListItemNode,
        },
        {
            replace: LinkNode,
            with: (node: LinkNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdLinkNode(
                    node.getURL(),
                    {
                        target: node.getTarget() || undefined,
                        rel: node.getRel() || undefined,
                        title: node.getTitle() || undefined,
                    },
                    existingId
                );
            },
            withKlass: IdLinkNode,
        },
        {
            replace: AutoLinkNode,
            with: (node: AutoLinkNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdAutoLinkNode(
                    node.getURL(),
                    {
                        target: node.getTarget() || undefined,
                        rel: node.getRel() || undefined,
                        title: node.getTitle() || undefined,
                    },
                    existingId
                );
            },
            withKlass: IdAutoLinkNode,
        },
        {
            replace: OverflowNode,
            with: (node: OverflowNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdOverflowNode(existingId);
            },
            withKlass: IdOverflowNode,
        },
        {
            replace: HashtagNode,
            with: (node: HashtagNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdHashtagNode(node.getTextContent(), existingId);
            },
            withKlass: IdHashtagNode,
        },
        {
            replace: TableNode,
            with: (node: TableNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdTableNode(existingId);
            },
            withKlass: IdTableNode,
        },
        {
            replace: TableCellNode,
            with: (node: TableCellNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdTableCellNode(
                    node.getHeaderStyles(),
                    node.getColSpan(),
                    node.getWidth() || undefined,
                    existingId
                );
            },
            withKlass: IdTableCellNode,
        },
        {
            replace: TableRowNode,
            with: (node: TableRowNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdTableRowNode(node.getHeight(), existingId);
            },
            withKlass: IdTableRowNode,
        },
        {
            replace: CodeNode,
            with: (node: CodeNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdCodeNode(node.getLanguage(), existingId);
            },
            withKlass: IdCodeNode,
        },
        {
            replace: CodeHighlightNode,
            with: (node: CodeHighlightNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdCodeHighlightNode(
                    node.getTextContent(),
                    node.getHighlightType(),
                    existingId
                );
            },
            withKlass: IdCodeHighlightNode,
        },
        {
            replace: HorizontalRuleNode,
            with: (node: HorizontalRuleNode) => {
                const existingId = 'getId' in node && typeof (node as any).getId === 'function' ? (node as any).getId() : undefined;
                return new IdHorizontalRuleNode(existingId);
            },
            withKlass: IdHorizontalRuleNode,
        },
        MentionNode,
        ImageNode,
        EmojiNode,
        KeywordNode,
        LayoutContainerNode,
        LayoutItemNode,
        TweetNode,
        YouTubeNode,
        AutocompleteNode,
    ]
