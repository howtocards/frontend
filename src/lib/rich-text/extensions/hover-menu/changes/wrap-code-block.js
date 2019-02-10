/**
 * Wrap current block into a code block.
 */
export function wrapCodeBlock(opts, change) {
  const { value } = change

  let newTexts = []

  value.texts.forEach((node) => {
    newTexts = [...newTexts, node.text]
  })
  newTexts = newTexts.join("\n")
  change.insertCode(newTexts)

  return change
}
