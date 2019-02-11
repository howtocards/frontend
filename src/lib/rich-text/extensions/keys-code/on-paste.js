import { Document } from "slate"
import { getEventTransfer } from "slate-react"
import { deserializeCode, getCurrentCode } from "./helpers"

/**
 * User is pasting content, insert it as text
 */
export const onPaste = (opts, event, change, editor) => {
  const { value } = change
  const data = getEventTransfer(event)
  const codeBlock = getCurrentCode(opts, value)

  // Only handle paste when selection is completely a code block
  const { endBlock } = value

  if (!codeBlock || !codeBlock.hasDescendant(endBlock.key)) {
    return editor()
  }

  // Convert to text if needed
  let text

  if (data.type === "fragment") {
    text = data.fragment
      .getTexts()
      .map((t) => t.text)
      .join("\n")
  } else {
    // eslint-disable-next-line prefer-destructuring
    text = data.text
  }
  // Convert the text to code lines
  const lines = deserializeCode(opts, text).nodes
  const fragment = Document.create({ nodes: lines })

  return change.insertFragment(fragment)
}
