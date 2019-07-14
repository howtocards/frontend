import { DEFAULT_NODE } from "../constant"
import { unWrapBlocks } from "../unwrap-blocks"
import { hasBlock } from "../has-block"
import { hasParent } from "../has-parent"

export const handleQuote = ({ type, editor, configCodePlugin }) => {
  const { value } = editor

  if (type === "block-quote") {
    const hasDefaultNode = hasBlock(DEFAULT_NODE, editor)
    const hasParentQuoteBlock = hasParent(value, type)

    unWrapBlocks(editor, [
      "bulleted-list",
      "numbered-list",
      configCodePlugin.block,
    ])

    const changesList = [
      {
        condition: hasDefaultNode && hasParentQuoteBlock,
        fn: () => editor.setBlocks(DEFAULT_NODE).unwrapBlock(type),
      },
      {
        condition: hasDefaultNode,
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
