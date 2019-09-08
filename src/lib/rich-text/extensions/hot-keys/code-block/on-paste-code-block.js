import { Block, Document, Text } from "slate"
import { getEventTransfer } from "slate-react"
import { List } from "immutable"
import detectNewline from "detect-newline"

const DEFAULT_NEWLINE = "\n"

/**
 * Deserialize a text into a code block
 */
const deserializeCode = (opts, text) => {
  const sep = detectNewline(text) || DEFAULT_NEWLINE

  const lines = List(text.split(sep)).map((line) =>
    Block.create({
      type: opts.line,
      nodes: [Text.create(line)],
    }),
  )

  const code = Block.create({
    type: opts.block,
    nodes: lines,
  })

  return code
}

export const onPasteCodeBlock = ({ opts, event, change }) => {
  const data = getEventTransfer(event)

  // Convert to text if needed
  let text

  if (data.type === "fragment") {
    text = data.fragment
      .getTexts()
      .map((t) => t.text)
      .join("\n")
  } else {
    // eslint-disable-next-line prefer-destructuring
    text = data.text
  }
  // Convert the text to code lines
  const lines = deserializeCode(opts, text).nodes
  const fragment = Document.create({ nodes: lines })

  return change.insertFragment(fragment)
}
