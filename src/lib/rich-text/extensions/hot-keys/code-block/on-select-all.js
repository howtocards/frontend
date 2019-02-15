import { getCurrentBlock } from "../common/helpers"

/**
 * User is Cmd+A to select all text
 */
export const onSelectAll = ({ opts, event, change }) => {
  const { value } = change

  event.preventDefault()

  const codeBlock = getCurrentBlock(opts.block, value, true)

  return change
    .moveToStartOfNode(codeBlock.getFirstText())
    .moveFocusToEndOfNode(codeBlock.getLastText())
}
