import { isInCodeBlock } from "./is-in-code-block"
import { unwrapCodeBlock } from "./unwrap-code-block"
import { wrapCodeBlock } from "./wrap-code-block"

/**
 * Toggle code block / paragraph.
 */
export const toggleCodeBlock = (opts, change, type) => {
  if (isInCodeBlock(opts, change.value)) {
    return unwrapCodeBlock(opts, change, type)
  }
  return wrapCodeBlock(opts, change)
}
