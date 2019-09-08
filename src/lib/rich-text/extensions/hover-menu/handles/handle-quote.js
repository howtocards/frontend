import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"

export const handleQuote = (type, editor, configCodePlugin) => {
  const { value } = editor
  const { document } = value

  if (type === "block-quote") {
    const isLine = hasBlock(DEFAULT_NODE, editor)
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    unWrapBlocks(editor, [
      "bulleted-list",
      "numbered-list",
      configCodePlugin.block,
    ])

    if (isLine && isType) {
      editor.setBlocks(DEFAULT_NODE).unwrapBlock(type)
    } else if (isLine) {
      editor.wrapBlock(type)
    } else {
      editor.setBlocks(DEFAULT_NODE).wrapBlock(type)
    }
  }
}
