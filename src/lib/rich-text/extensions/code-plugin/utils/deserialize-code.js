import { Block, Text } from "slate"
import { List } from "immutable"
import detectNewline from "detect-newline"

const DEFAULT_NEWLINE = "\n"

/**
 * Deserialize a text into a code block
 */
export function deserializeCode(opts, text) {
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
