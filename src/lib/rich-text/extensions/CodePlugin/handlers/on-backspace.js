import endsWith from "ends-with"
import { getCurrentIndent, getCurrentCode } from "../utils"

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
export function onBackspace(opts, event, change, editor) {
  const { value } = change
  const {
    selection: { isExpanded },
  } = value

  if (isExpanded) {
    return editor()
  }

  const {
    selection: {
      start: { offset },
    },
    startText,
  } = value

  const currentLine = value.startBlock

  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(opts, value)
  const beforeSelection = currentLine.text.slice(0, offset)

  // If the line before selection ending with the indentation?
  if (endsWith(beforeSelection, indent)) {
    // Remove indent
    event.preventDefault()

    return change.deleteBackward(indent.length).focus()
    // eslint-disable-next-line no-else-return
  } else if (opts.exitBlockType) {
    // Otherwise check if we are in an empty code container...
    const currentCode = getCurrentCode(opts, value)
    const isStartOfCode =
      offset === 0 && currentCode.getFirstText() === startText
    // PERF: avoid checking for whole currentCode.text
    const isEmpty =
      currentCode.nodes.size === 1 && currentLine.text.length === 0

    if (isStartOfCode && isEmpty) {
      event.preventDefault()
      // Convert it to default exit type
      return change
        .setBlocks(opts.exitBlockType, { normalize: false })
        .unwrapNodeByKey(currentLine.key)
    }
  }
  return editor()
}
