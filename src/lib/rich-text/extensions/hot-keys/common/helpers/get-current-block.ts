export function getCurrentBlock(block, value, parent) {
  const { document } = value

  if (!value.selection.start.key) return null
  const currentBlock = parent
    ? document.getParent(value.startBlock.key)
    : value.startBlock

  if (currentBlock && currentBlock.type === block) {
    return currentBlock
  }
  return null
}
