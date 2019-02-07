import { deserializeCode } from "../utils"

/**
 * Wrap a block into a code block.
 */
export function wrapCodeBlockByKey(opts, change, key) {
  const { value } = change
  const { document } = value

  const startBlock = document.getDescendant(key)
  const { text } = startBlock

  // Remove all child
  startBlock.nodes.forEach((node) => {
    change.removeNodeByKey(node.key, { normalize: false })
  })

  // Insert new text
  const toInsert = deserializeCode(opts, text)

  toInsert.nodes.forEach((node, i) => {
    change.insertNodeByKey(startBlock.key, i, node, { normalize: false })
  })

  // Set node type
  change.setNodeByKey(startBlock.key, {
    type: opts.containerType,
  })

  return change
}
