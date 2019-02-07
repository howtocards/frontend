import { getCurrentCode } from "../utils"

/**
 * User is Cmd+A to select all text
 */
export function onSelectAll(opts, event, change, editor) {
  const { value } = change

  event.preventDefault()

  const currentCode = getCurrentCode(opts, value)

  return change
    .moveToStartOfNode(currentCode.getFirstText())
    .moveFocusToEndOfNode(currentCode.getLastText())
}
