import { getCurrentBlock } from "./get-current-block"
import { getIndent } from "./get-indent"

/**
 * Detect indentation in the current block
 */

export function getCurrentIndent(block, value) {
  const currentBlcok = getCurrentBlock(block, value, true)

  if (!currentBlcok) {
    return ""
  }

  const text = currentBlcok
    .getTexts()
    .map((t) => t.text)
    .join("\n")

  return getIndent(text)
}
