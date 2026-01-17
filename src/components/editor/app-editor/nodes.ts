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
            with: (node: HeadingNode) => new IdHeadingNode(node.getTag()),
            withKlass: IdHeadingNode,
        },
        {
            replace: ParagraphNode,
            with: (node: ParagraphNode) => new IdParagraphNode(),
            withKlass: IdParagraphNode,
        },
        {
            replace: QuoteNode,
            with: (node: QuoteNode) => new IdQuoteNode(undefined, undefined),
            withKlass: IdQuoteNode,
        },
        {
            replace: ListNode,
            with: (node: ListNode) => new IdListNode(node.getListType(), node.getStart(), undefined, undefined),
            withKlass: IdListNode,
        },
        {
            replace: ListItemNode,
            with: (node: ListItemNode) => new IdListItemNode(node.getValue(), node.getChecked(), undefined, undefined),
            withKlass: IdListItemNode,
        },
        {
            replace: LinkNode,
            with: (node: LinkNode) => new IdLinkNode(
                node.getURL(),
                {
                    target: node.getTarget() || undefined,
                    rel: node.getRel() || undefined,
                    title: node.getTitle() || undefined,
                },
                undefined,
                undefined
            ),
            withKlass: IdLinkNode,
        },
        {
            replace: AutoLinkNode,
            with: (node: AutoLinkNode) => new IdAutoLinkNode(
                node.getURL(),
                {
                    target: node.getTarget() || undefined,
                    rel: node.getRel() || undefined,
                    title: node.getTitle() || undefined,
                },
                undefined,
                undefined
            ),
            withKlass: IdAutoLinkNode,
        },
        {
            replace: OverflowNode,
            with: (node: OverflowNode) => new IdOverflowNode(undefined, undefined),
            withKlass: IdOverflowNode,
        },
        {
            replace: HashtagNode,
            with: (node: HashtagNode) => new IdHashtagNode(node.getTextContent(), undefined, undefined),
            withKlass: IdHashtagNode,
        },
        {
            replace: TableNode,
            with: (node: TableNode) => new IdTableNode(undefined, undefined),
            withKlass: IdTableNode,
        },
        {
            replace: TableCellNode,
            with: (node: TableCellNode) => new IdTableCellNode(
                node.getHeaderStyles(),
                node.getColSpan(),
                node.getWidth() || undefined,
                undefined,
                undefined
            ),
            withKlass: IdTableCellNode,
        },
        {
            replace: TableRowNode,
            with: (node: TableRowNode) => new IdTableRowNode(node.getHeight(), undefined, undefined),
            withKlass: IdTableRowNode,
        },
        {
            replace: CodeNode,
            with: (node: CodeNode) => new IdCodeNode(node.getLanguage(), undefined, undefined),
            withKlass: IdCodeNode,
        },
        {
            replace: CodeHighlightNode,
            with: (node: CodeHighlightNode) => new IdCodeHighlightNode(
                node.getTextContent(),
                node.getHighlightType(),
                undefined,
                undefined
            ),
            withKlass: IdCodeHighlightNode,
        },
        {
            replace: HorizontalRuleNode,
            with: (node: HorizontalRuleNode) => new IdHorizontalRuleNode(undefined, undefined),
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
