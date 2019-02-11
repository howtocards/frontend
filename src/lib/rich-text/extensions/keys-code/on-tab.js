import { getCurrentIndent } from "./helpers"

export const indentLines = (
  opts,
  change,
  // Indent to add
  indent,
) => {
  const { value } = change
  const { document, selection } = value
  const lines = document
    .getLeafBlocksAtRange(selection)
    .filter((node) => node.type === opts.line)

  return lines.reduce((c, line) => {
    // Insert an indent at start of line
    const text = line.nodes.first()

    return c.insertTextByKey(text.key, 0, indent)
  }, change)
}

/**
 * User pressed Tab in an editor:
 * Insert a tab after detecting it from code block content.
 */
export const onTab = (opts, event, change) => {
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
