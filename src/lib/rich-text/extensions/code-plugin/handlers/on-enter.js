/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
export function onEnter(opts, event, change, editor) {
  const { value } = change

  const {
    selection: { isCollapsed },
  } = value

  if (!isCollapsed) {
    return editor()
  }

  event.preventDefault()

  return change.insertText("\n").focus()
}
