import { getCurrentBlock } from "../helpers"

/**
 * User is Cmd+A to select all text
 */
export const onSelectAll = ({ opts, event, change }) => {
  const { value } = change

  event.preventDefault()

  const block = getCurrentBlock(opts.block, value, true)

  return change
    .moveToStartOfNode(block.getFirstText())
    .moveFocusToEndOfNode(block.getLastText())
}
