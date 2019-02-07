export function getCurrentCode(opts, value, key) {
  const { document } = value

  let currentBlock

  if (key) {
    currentBlock = value.document.getDescendant(key)
  } else {
    if (!value.selection.start.key) return null
    currentBlock = value.startBlock
  }

  // The structure is always code_block -> code_line -> text
  // So the parent of the currentBlock should be the code_block
  const parent = document.getParent(currentBlock.key)

  if (parent && parent.type === opts.block) {
    return parent
  }
  return null
}
