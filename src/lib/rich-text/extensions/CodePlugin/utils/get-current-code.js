export function getCurrentCode(opts, value, key) {
  let currentBlock

  if (key) {
    currentBlock = value.document.getDescendant(key)
  } else {
    if (!value.selection.start.key) return null
    currentBlock = value.startBlock
  }

  if (currentBlock && currentBlock.type === opts.block) {
    return currentBlock
  }
  return null
}
