import { getCurrentIndent } from "../utils"
import { indentLines } from "../changes"

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
export function onTab(opts, event, change, editor) {
  const { value } = change

  event.preventDefault()
  event.stopPropagation()

  const {
    selection: { isCollapsed },
  } = value

  const indent = getCurrentIndent(opts, value)

  // Selection is collapsed, we just insert an indent at cursor
  if (isCollapsed) {
    return change.insertText(indent).focus()
  }

  // We indent all selected lines
  return indentLines(opts, change, indent)
}
