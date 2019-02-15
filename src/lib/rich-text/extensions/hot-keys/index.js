import { onPasteCodeBlock } from "./code-block"
import { onKeyDownLists } from "./lists"
import { getCurrentBlock } from "./common/helpers"
import { onKeyDownCommon } from "./common/events"

export const HotKeys = (config) => {
  const commonOptions = {
    exitBlockType: "paragraph",
    selectAll: true,
    getIndent: null,
    ...config,
  }

  const numberedListBlockOptions = {
    ...commonOptions,
    block: "numbered-list",
    line: "list-item",
  }

  const bulletedListBlockOptions = {
    ...commonOptions,
    block: "bulleted-list",
    line: "list-item",
  }

  const blockQuoteOptions = {
    ...commonOptions,
    block: "block-quote",
    line: "paragraph",
  }

  return {
    onKeyDown: (event, change, editor) => {
      const { value } = change
      const args = { event, change, editor }

      const isCodeBlock = getCurrentBlock(commonOptions.block, value, true)
      const isNumberedListBlock = getCurrentBlock(
        numberedListBlockOptions.block,
        value,
        true,
      )
      const isBulletedListBlock = getCurrentBlock(
        bulletedListBlockOptions.block,
        value,
        true,
      )
      const isBlockQuote = getCurrentBlock(blockQuoteOptions.block, value, true)

      // @TODO: improve in the future (make it more readable)
      if (isCodeBlock) {
        return onKeyDownCommon({
          opts: commonOptions,
          ...args,
        })
      }
      if (isNumberedListBlock) {
        return onKeyDownLists({
          opts: numberedListBlockOptions,
          ...args,
        })
      }
      if (isBulletedListBlock) {
        return onKeyDownLists({
          opts: bulletedListBlockOptions,
          ...args,
        })
      }
      if (isBlockQuote) {
        return onKeyDownCommon({
          opts: blockQuoteOptions,
          ...args,
        })
      }

      return editor()
    },
    onPaste: (event, change, editor) => {
      const { value } = change
      const { endBlock } = value
      const args = { event, change, editor }

      const codeBlock = getCurrentBlock(commonOptions.block, value, true)

      if (codeBlock && codeBlock.hasDescendant(endBlock.key)) {
        return onPasteCodeBlock({
          opts: commonOptions,
          ...args,
        })
      }

      return editor()
    },
  }
}
