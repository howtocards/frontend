import { FormatBold } from "styled-icons/material/FormatBold"
import { FormatItalic } from "styled-icons/material/FormatItalic"
import { FormatUnderlined } from "styled-icons/material/FormatUnderlined"
import { FormatQuote } from "styled-icons/material/FormatQuote"
import { FormatListNumbered } from "styled-icons/material/FormatListNumbered"
import { FormatListBulleted } from "styled-icons/material/FormatListBulleted"
import { Code } from "styled-icons/material/Code"
import { CodeBlock } from "styled-icons/boxicons-regular/CodeBlock"
import { Image } from "styled-icons/boxicons-regular/Image"

export const DEFAULT_NODE = "paragraph"

export const ICONS_LIST = {
  bold: FormatBold,
  italic: FormatItalic,
  underlined: FormatUnderlined,
  image: Image,
  code: Code,
  code_block: CodeBlock,
  "block-quote": FormatQuote,
  "numbered-list": FormatListNumbered,
  "bulleted-list": FormatListBulleted,
}
