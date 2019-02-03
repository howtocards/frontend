import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted,
  Code,
} from "styled-icons/material"
import { Codepen as CodeBlock } from "styled-icons/feather"

export const DEFAULT_NODE = "paragraph"

export const ICONS_LIST = {
  bold: FormatBold,
  italic: FormatItalic,
  underlined: FormatUnderlined,
  code: Code,
  code_block: CodeBlock,
  "block-quote": FormatQuote,
  "numbered-list": FormatListNumbered,
  "bulleted-list": FormatListBulleted,
}
