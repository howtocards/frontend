import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"

export function handleList(type) {
  const { editor } = this.props
  const { value } = editor
  const { document } = value

  // Handle everything but list buttons.
  if (type !== "bulleted-list" && type !== "numbered-list") {
    const isActive = this.hasBlock(type)
    const isList = this.hasBlock("list-item")

    if (isList) {
      unWrapBlocks(editor, [
        "bulleted-list",
        "numbered-list",
        "block-quote",
        "code",
      ])
      editor.setBlocks(isActive ? DEFAULT_NODE : type)
    }
  }

  if (type === "bulleted-list" || type === "numbered-list") {
    // Handle the extra wrapping required for list buttons.
    const isList = this.hasBlock("list-item")
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    if (isList && isType) {
      unWrapBlocks(editor, [
        "bulleted-list",
        "numbered-list",
        "block-quote",
        "code",
      ])
      editor.setBlocks(DEFAULT_NODE)
    } else if (isList) {
      unWrapBlocks(editor, ["block-quote", "code"])
      editor
        .unwrapBlock(
          type === "bulleted-list" ? "numbered-list" : "bulleted-list",
        )
        .wrapBlock(type)
    } else {
      unWrapBlocks(editor, [
        "bulleted-list",
        "numbered-list",
        "block-quote",
        "code",
      ])
      editor.setBlocks("list-item").wrapBlock(type)
    }
  }
}
