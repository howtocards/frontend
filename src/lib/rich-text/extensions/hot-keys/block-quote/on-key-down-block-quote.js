import { onEnter } from "../common/events"
import { isModEnter, isBackspace, isEnter, isModA } from "../constant"

const handleBackSpace = ({ opts, event, change, editor }) => {
  const { value } = change
  const { startBlock, startText, selection } = value
  const isStartOfText =
    selection.start.offset === 0 && startBlock.getFirstText() === startText

  const isEmpty = startBlock.nodes.size === 1 && startBlock.text.length === 0

  if (isEmpty && isStartOfText) {
    event.preventDefault()
    return change.setBlocks(opts.exitBlockType, { normalize: false })
  }

  return editor()
}

export const onKeyDownBlockQuote = ({ opts, event, change, editor }) => {
  const { value } = change
  const args = { opts, event, change, editor }

  if (isModA(event)) {
    event.preventDefault()
    return change
      .moveToStartOfNode(value.startBlock.getFirstText())
      .moveFocusToEndOfNode(value.startBlock.getLastText())
  }
  if (isBackspace(event)) {
    return handleBackSpace(args)
  }
  if (opts.exitBlockType && isModEnter(event)) {
    return change.insertBlock(opts.exitBlockType)
  }
  if (isEnter(event)) {
    return onEnter(args)
  }
  return editor()
}
