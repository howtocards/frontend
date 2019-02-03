// Return the index of the first character that differs between both string, or
// the smallest string length otherwise.
function firstDifferentCharacter(one, two) {
  if (one.length > two.length) {
    return firstDifferentCharacter(two, one)
  }

  const indexes = new Array(one.length).fill().map((v, i) => i)
  const index = indexes.find((i) => one[i] !== two[i])

  return index == null ? one.length : index
}

/**
 * Dedent all lines in selection
 */
export function dedentLines(opts, change, indent) {
  const { value } = change
  const { document, selection } = value
  const lines = document
    .getLeafBlocksAtRange(selection)
    .filter((node) => node.type === opts.line)

  return lines.reduce((c, line) => {
    // Remove a level of indent from the start of line
    const textNode = line.nodes.first()
    const lengthToRemove = firstDifferentCharacter(textNode.text, indent)

    return c.removeTextByKey(textNode.key, 0, lengthToRemove)
  }, change)
}
