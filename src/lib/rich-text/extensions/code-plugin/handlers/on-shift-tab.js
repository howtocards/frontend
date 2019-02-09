import { getCurrentIndent } from "../utils"
import { dedentLines } from "../changes"

/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
export function onShiftTab(opts, event, change, editor) {
  const { value } = change

  event.preventDefault()
  event.stopPropagation()

  const indent = getCurrentIndent(opts, value)

  // We dedent all selected lines
  return dedentLines(opts, change, indent)
}
