import { wrapCodeBlockByKey } from "./wrap-code-block-by-key"

/**
 * Wrap current block into a code block.
 */
export function wrapCodeBlock(opts, change) {
  const { value } = change
  const { startBlock, selection } = value

  // Convert to code block
  wrapCodeBlockByKey(opts, change, startBlock.key)

  // Move selection back in the block
  change
    .moveToStartOfNode(change.value.document.getDescendant(startBlock.key))
    .moveAnchorTo(selection.startOffset)

  return change
}
