import { getCurrentBlock, getCurrentIndent } from "../helpers"

/**
 * User pressed Delete in an editor:
 * Remove last idnentation before cursor
 */
export const onBackspace = ({ opts, event, change, editor }) => {
  const { value } = change
  const { selection, startText } = value

  if (selection.isExpanded) {
    return editor()
  }

  const currentLine = value.startBlock

  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(opts.block, value)
  const beforeSelection = currentLine.text.slice(0, selection.start.offset)

  // If the line before selection ending with the indentation?
  if (beforeSelection.endsWith(indent)) {
    // Remove indent
    event.preventDefault()

    return change.deleteBackward(indent.length).focus()
  }
  if (opts.exitBlockType) {
    // Otherwise check if we are in an empty block container...
    const parentBlock = getCurrentBlock(opts.block, value, true)
    const isStartOfText =
      selection.start.offset === 0 && parentBlock.getFirstText() === startText
    // PERF: avoid checking for whole Block.text
    const isEmpty =
      parentBlock.nodes.size === 1 && currentLine.text.length === 0

    if (isStartOfText && isEmpty) {
      event.preventDefault()
      // Convert it to default exit type
      return change
        .setBlocks(opts.exitBlockType, { normalize: false })
        .unwrapNodeByKey(currentLine.key)
    }
  }
  return editor()
}
