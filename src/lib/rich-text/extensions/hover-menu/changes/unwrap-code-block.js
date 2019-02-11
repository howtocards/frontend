import { getCurrentCode } from "../../common/utils"

/**
 * Convert a code block to a normal block.
 */
export function unwrapCodeBlock(opts, change, type) {
  const { value } = change

  const codeBlock = getCurrentCode(opts, value)

  if (!codeBlock) {
    return change
  }

  // Convert to paragraph
  unwrapCodeBlockByKey(opts, change, codeBlock.key, type)

  return change
}

/**
 * Unwrap a code block into a normal block.
 */
function unwrapCodeBlockByKey(opts, change, key, type) {
  const { value } = change
  const { document } = value

  // Get the code block
  const codeBlock = document.getDescendant(key)

  // change lines into paragraph
  codeBlock.nodes.forEach((line) =>
    change
      .setNodeByKey(line.key, { type }, { normalize: false })
      .unwrapNodeByKey(line.key, { normalize: false }),
  )

  return change
}
