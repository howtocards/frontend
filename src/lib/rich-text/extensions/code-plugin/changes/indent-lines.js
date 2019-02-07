export function indentLines(
  opts,
  change,
  // Indent to add
  indent,
) {
  const { value } = change
  const { document, selection } = value
  const lines = document
    .getLeafBlocksAtRange(selection)
    .filter((node) => node.type === opts.line)

  return lines.reduce((c, line) => {
    // Insert an indent at start of line
    const text = line.nodes.first()

    return c.insertTextByKey(text.key, 0, indent)
  }, change)
}
