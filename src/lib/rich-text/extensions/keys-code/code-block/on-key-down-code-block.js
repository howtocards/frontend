import { onModEnter, onBackspace, onEnter } from "../common/events"
import { isModA, isTab, isModEnter, isEnter, isBackspace } from "../constant"
import { onTab } from "./on-tab"
import { onSelectAll } from "./on-select-all"

export const onKeyDownCodeBlock = ({ opts, event, change, editor }) => {
  const args = { opts, event, change, editor }

  if (opts.selectAll && isModA(event)) {
    return onSelectAll(args)
  }
  if (isTab(event)) {
    return onTab(args)
  }
  if (opts.exitBlockType && isModEnter(event)) {
    return onModEnter(args)
  }
  if (isEnter(event)) {
    return onEnter(args)
  }
  if (isBackspace(event)) {
    return onBackspace(args)
  }

  return editor()
}
