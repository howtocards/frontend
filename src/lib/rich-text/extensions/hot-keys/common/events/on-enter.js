import { getIndent } from "../helpers"

/**
 * User pressed Enter in an editor:
 * Insert a new block line and start it with the indentation from previous line
 */
export const onEnter = ({ event, change, editor }) => {
  const { value } = change

  const { selection } = value

  if (!selection.isCollapsed) {
    return editor()
  }
  event.preventDefault()

  const { startBlock } = value
  const currentLineText = startBlock.text
  const indent = getIndent(currentLineText, "")

  return change
    .splitBlock()
    .insertText(indent)
    .focus()
}
