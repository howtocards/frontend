import { onModEnter, onBackspace } from "../common/events"
import { isModEnter, isBackspace } from "../constant"

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
