import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"

export function handleCode(type) {
  const { editor, configCodePlugin } = this.props
  const { value } = editor
  const { document } = value

  if (type !== configCodePlugin.block) {
    const isActive = this.hasBlock(type)
    const isCodeLine = this.hasBlock("code_line")

    if (isCodeLine) {
      unWrapBlocks(editor, ["bulleted-list", "numbered-list", "block-quote"])

      editor.setBlocks(isActive ? DEFAULT_NODE : type)
    }
  }

  if (type === configCodePlugin.block) {
    const isCodeLine = this.hasBlock(configCodePlugin.line)
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    // @TODO: To delete all marks, not just selected
    document.getMarks().forEach((mark) => {
      editor.removeMark(mark)
    })

    unWrapBlocks(editor, ["bulleted-list", "numbered-list", "block-quote"])

    if (isCodeLine && isType) {
      editor.setBlocks(DEFAULT_NODE).unwrapBlock(type)
    } else if (isCodeLine) {
      editor.wrapBlock(type)
    } else {
      editor.setBlocks(configCodePlugin.line).wrapBlock(type)
    }
  }
}
