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

  const { selection, startText } = value

  const currentLine = value.startBlock

  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(opts, value)
  const beforeSelection = currentLine.text.slice(0, selection.start.offset)

  // If the line before selection ending with the indentation?
  if (beforeSelection.endsWith(indent)) {
    // Remove indent
    event.preventDefault()

    return change.deleteBackward(indent.length).focus()
  }
  if (opts.exitBlockType) {
    // Otherwise check if we are in an empty code container...
    const currentCode = getCurrentCode(opts, value)
    const isStartOfCode =
      selection.start.offset === 0 && currentCode.getFirstText() === startText
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
