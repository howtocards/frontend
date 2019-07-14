import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"
import { hasParent } from "../has-parent"

const deleteMarks = (editor) => {
  const allMarks = editor.value.marks
    .toArray()
    .reduce((acc, mark) => [...acc, mark.type], [])

  editor.value.texts.toArray().forEach((text) => {
    allMarks.forEach((typeMark) =>
      editor.removeMarkByKey(text.key, 0, text.text.length, typeMark),
    )
  })
}

export const handleCode = ({ type, editor, configCodePlugin }) => {
  const { value } = editor

  if (type === configCodePlugin.block) {
    const hasCodeLine = hasBlock(configCodePlugin.line, editor)
    const hasParentCodeBlock = hasParent(value, type)

    deleteMarks(editor)
    unWrapBlocks(editor, ["bulleted-list", "numbered-list", "block-quote"])

    const changesList = [
      {
        condition: hasCodeLine && hasParentCodeBlock,
        fn: () => editor.setBlocks(DEFAULT_NODE).unwrapBlock(type),
      },
      {
        condition: hasCodeLine,
        fn: () => editor.wrapBlock(type),
      },
    ]

    const defaultChange = {
      fn: () => editor.setBlocks(configCodePlugin.line).wrapBlock(type),
    }

    const change = changesList.find((el) => el.condition) || defaultChange

    change.fn()
  }
}
