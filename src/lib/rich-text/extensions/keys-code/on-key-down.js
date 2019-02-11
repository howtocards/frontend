import { isKeyHotkey } from "is-hotkey"
import { getCurrentCode } from "./helpers"
import { onTab } from "./on-tab"
import { onEnter } from "./on-enter"
import { onModEnter } from "./on-mod-enter"
import { onBackspace } from "./on-backspace"
import { onSelectAll } from "./on-select-all"

const isModA = isKeyHotkey("mod+a")
const isTab = isKeyHotkey("tab")
const isModZ = isKeyHotkey("mod+z")
const isModEnter = isKeyHotkey("mod+enter")
const isEnter = isKeyHotkey("enter")
const isBackspace = isKeyHotkey("backspace")

/**
 * User is pressing a key in the editor
 */
export const onKeyDown = (opts, event, change, editor) => {
  const { value } = change
  const codeBlock = getCurrentCode(opts, value)

  // Inside code ?

  if (!codeBlock) {
    return editor()
  }

  // Add opts in the argument list
  const args = [opts, event, change, editor]

  // Select all the code in the block (Mod+a)
  if (opts.selectAll && isModA(event)) {
    return onSelectAll(...args)
  }

  if (isTab(event)) {
    // User is pressing Tab
    return onTab(...args)
  }

  if (opts.exitBlockType && isModEnter(event)) {
    // User is pressing Mod+Enter
    return onModEnter(...args)
  }
  if (isEnter(event)) {
    // User is pressing Enter
    return onEnter(...args)
  }
  if (isBackspace(event)) {
    // User is pressing Backspace
    return onBackspace(...args)
  }
  if (isModZ(event)) {
    return editor()
  }
  return undefined
}
