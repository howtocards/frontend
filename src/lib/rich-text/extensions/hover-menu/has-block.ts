export const hasBlock = (type, editor) => {
  const { value } = editor

  return value.blocks.some((node) => node.type === type)
}
