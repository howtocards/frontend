export const unWrapBlocks = (editor, blocks) => {
  blocks.forEach((item) => editor.unwrapBlock(item))
}
