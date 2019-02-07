import detectIndent from "detect-indent"

const DEFAULT_INDENTATION = "  "

/**
 * Detect indentation in a text
 */
export function getIndent(text, defaultValue = DEFAULT_INDENTATION) {
  return detectIndent(text).indent || defaultValue
}
