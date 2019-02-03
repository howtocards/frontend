import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatQuote,
  FormatListNumbered,
  FormatListBulleted,
  Code,
  HighQuality,
} from "styled-icons/material"

export const DEFAULT_NODE = "paragraph"

export const ICONS_LIST = {
  bold: FormatBold,
  italic: FormatItalic,
  underlined: FormatUnderlined,
  code: Code,
  code_block: HighQuality,
  "block-quote": FormatQuote,
  "numbered-list": FormatListNumbered,
  "bulleted-list": FormatListBulleted,
}

export const TOKEN_MARK = "prism-token"
