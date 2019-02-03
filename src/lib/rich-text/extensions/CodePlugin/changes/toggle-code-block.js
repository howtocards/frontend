import { isInCodeBlock } from "../utils"

import { wrapCodeBlock } from "./wrap-code-block"
import { unwrapCodeBlock } from "./unwrap-code-block"

export function toggleCodeBlock(opts, change, type) {
  if (isInCodeBlock(opts, change.value)) {
    return unwrapCodeBlock(opts, change, type)
  }
  return wrapCodeBlock(opts, change)
}
