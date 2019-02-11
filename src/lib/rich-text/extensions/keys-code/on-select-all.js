import { getCurrentCode } from "./helpers"

/**
 * User is Cmd+A to select all text
 */
export const onSelectAll = (opts, event, change) => {
  const { value } = change

  event.preventDefault()

  const codeBlock = getCurrentCode(opts, value)

  return change
    .moveToStartOfNode(codeBlock.getFirstText())
    .moveFocusToEndOfNode(codeBlock.getLastText())
}
