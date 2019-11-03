import { isBackspace, isEnter, isModA, isModEnter, isTab } from "../../constant"
import { onBackspace } from "./on-backspace"
import { onModEnter } from "./on-mod-enter"
import { onEnter } from "./on-enter"
import { onSelectAll } from "./on-select-all"
import { onTab } from "./on-tab"

export const onKeyDownCommon = ({ opts, event, change, editor }) => {
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
