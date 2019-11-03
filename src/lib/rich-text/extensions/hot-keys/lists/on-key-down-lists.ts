import { onBackspace, onModEnter } from "../common/events"
import { isBackspace, isModEnter } from "../constant"

export const onKeyDownLists = ({ opts, event, change, editor }) => {
  const args = { opts, event, change, editor }

  if (opts.exitBlockType && isModEnter(event)) {
    return onModEnter(args)
  }
  if (isBackspace(event)) {
    return onBackspace(args)
  }
  return editor()
}
