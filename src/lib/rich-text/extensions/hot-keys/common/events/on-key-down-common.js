import { isModEnter, isBackspace, isEnter, isModA, isTab } from "../../constant"
import { onEnter, onBackspace, onModEnter, onSelectAll, onTab } from "."

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
