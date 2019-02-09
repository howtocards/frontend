import { getIndent } from "./get-indent"
import { getCurrentCode } from "./get-current-code"

/**
 * Detect indentation in the current code block
 */

export function getCurrentIndent(opts, value) {
  if (opts.getIndent) {
    return opts.getIndent(value)
  }

  const currentCode = getCurrentCode(opts, value)

  if (!currentCode) {
    return ""
  }

  const text = currentCode
    .getTexts()
    .map((t) => t.text)
    .join("\n")

  return getIndent(text)
}
