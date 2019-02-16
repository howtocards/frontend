import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"

export function handleQuote(type) {
  const { editor } = this.props
  const { value } = editor
  const { document } = value

  if (type !== "block-quote") {
    const isActive = this.hasBlock(type)
    const isLine = this.hasBlock(DEFAULT_NODE)

    if (isLine) {
      unWrapBlocks(editor, ["bulleted-list", "numbered-list", "code"])
      editor.setBlocks(isActive ? DEFAULT_NODE : type)
    }
  }

  if (type === "block-quote") {
    const isBlockQoute = this.hasBlock(DEFAULT_NODE)
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    unWrapBlocks(editor, ["bulleted-list", "numbered-list", "code"])

    if (isBlockQoute && isType) {
      editor.setBlocks(DEFAULT_NODE).unwrapBlock(type)
    } else if (isBlockQoute) {
      editor.wrapBlock(type)
    } else {
      editor.setBlocks(DEFAULT_NODE).wrapBlock(type)
    }
  }
}
