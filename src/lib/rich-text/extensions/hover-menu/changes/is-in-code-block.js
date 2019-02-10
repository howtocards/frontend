/**
 * Test if current selection is in a code block.
 */
export const isInCodeBlock = (opts, value) => {
  const { document, selection } = value
  const codeBlock = document.getClosest(
    selection.start.key,
    (block) => block.type === opts.block,
  )

  return Boolean(codeBlock)
}
