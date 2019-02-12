import { onKeyDownCodeBlock, onPasteCodeBlock } from "./code-block"
import { onKeyDownLists } from "./lists"
import { onKeyDownBlockQuote } from "./block-quote"
import { getCurrentBlock } from "./common/helpers"

export const KeysCode = (config) => {
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
    line: "",
  }

  return {
    onKeyDown: (event, change, editor) => {
      const { value } = change
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
      const isBlockQuote = getCurrentBlock(blockQuoteOptions.block, value)

      // @TODO: improve in the future (make it more readable)
      if (isCodeBlock) {
        return onKeyDownCodeBlock({
          opts: commonOptions,
          event,
          change,
          editor,
        })
      }
      if (isNumberedListBlock) {
        return onKeyDownLists({
          opts: numberedListBlockOptions,
          event,
          change,
          editor,
        })
      }
      if (isBulletedListBlock) {
        return onKeyDownLists({
          opts: bulletedListBlockOptions,
          event,
          change,
          editor,
        })
      }
      if (isBlockQuote) {
        return onKeyDownBlockQuote({
          opts: blockQuoteOptions,
          event,
          change,
          editor,
        })
      }

      return editor()
    },
    onPaste: (event, change, editor) => {
      const { value } = change
      const { endBlock } = value
      const codeBlock = getCurrentBlock(commonOptions.block, value, true)

      if (codeBlock && codeBlock.hasDescendant(endBlock.key)) {
        return onPasteCodeBlock({
          opts: commonOptions,
          event,
          change,
          editor,
        })
      }

      return editor()
    },
  }
}
