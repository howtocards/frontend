import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"

export const handleList = (type, editor, configCodePlugin) => {
  const { value } = editor
  const { document } = value

  if (type === "bulleted-list" || type === "numbered-list") {
    // Handle the extra wrapping required for list buttons.
    const isList = hasBlock("list-item", editor)
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    if (isList && isType) {
      unWrapBlocks(editor, [
        "bulleted-list",
        "numbered-list",
        "block-quote",
        configCodePlugin.block,
      ])
      editor.setBlocks(DEFAULT_NODE)
    } else if (isList) {
      unWrapBlocks(editor, ["block-quote", configCodePlugin.block])
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
        configCodePlugin.block,
      ])
      editor.setBlocks("list-item").wrapBlock(type)
    }
  }
}
