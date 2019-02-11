import { onKeyDown } from "./on-key-down"
import { onPaste } from "./on-paste"

export const KeysCode = (config) => {
  const opts = {
    block: "",
    line: "",
    exitBlockType: "paragraph",
    selectAll: true,
    getIndent: null,
    ...config,
  }

  return {
    onKeyDown: (event, change, editor) =>
      onKeyDown(opts, event, change, editor),

    onPaste: (event, change, editor) => onPaste(opts, event, change, editor),
  }
}
