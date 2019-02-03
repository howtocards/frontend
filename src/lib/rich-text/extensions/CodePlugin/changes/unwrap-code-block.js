import { getCurrentCode } from "../utils"

import { unwrapCodeBlockByKey } from "./unwrap-code-block-by-key"

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
