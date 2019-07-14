import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"
import { hasParent } from "../has-parent"

export const handleList = ({ type, editor, configCodePlugin }) => {
  const { value } = editor

  if (type === "bulleted-list" || type === "numbered-list") {
    const hasListItem = hasBlock("list-item", editor)
    const hasParentList = hasParent(value, type)

    const changesList = [
      {
        condition: hasListItem && hasParentList,
        fn: () => {
          unWrapBlocks(editor, [
            "bulleted-list",
            "numbered-list",
            "block-quote",
            configCodePlugin.block,
          ])
          editor.setBlocks(DEFAULT_NODE)
        },
      },
      {
        condition: hasListItem,
        fn: () => {
          unWrapBlocks(editor, ["block-quote", configCodePlugin.block])
          editor
            .unwrapBlock(
              type === "bulleted-list" ? "numbered-list" : "bulleted-list",
            )
            .wrapBlock(type)
        },
      },
    ]

    const defaultChange = {
      fn: () => {
        unWrapBlocks(editor, [
          "bulleted-list",
          "numbered-list",
          "block-quote",
          configCodePlugin.block,
        ])
        editor.setBlocks("list-item").wrapBlock(type)
      },
    }

    const change = changesList.find((el) => el.condition) || defaultChange

    change.fn()
  }
}
