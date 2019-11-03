import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"

export const handleCode = (type, editor, configCodePlugin) => {
  const { value } = editor
  const { document } = value

  if (type === configCodePlugin.block) {
    const isCodeLine = hasBlock(configCodePlugin.line, editor)
    const isType = value.blocks.some((block) =>
      Boolean(document.getClosest(block.key, (parent) => parent.type === type)),
    )

    const allMarks = value.marks.toArray().reduce((acc, mark) => {
      acc[mark.type] = true
      return acc
    }, {})

    value.texts.toArray().forEach((text) => {
      Object.keys(allMarks).forEach((typeMark) =>
        editor.removeMarkByKey(text.key, 0, text.text.length, typeMark),
      )
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
