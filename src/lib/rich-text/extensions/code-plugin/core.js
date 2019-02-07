import { Options } from "./options"
import { deserializeCode } from "./utils"
import {
  wrapCodeBlockByKey,
  unwrapCodeBlockByKey,
  wrapCodeBlock,
  unwrapCodeBlock,
} from "./changes"

/**
 * The core of the plugin, which does not relies on `slate-react`, and includes
 * everything but behavior and rendering logic.
 */
export function core(optsParam) {
  const opts = new Options(optsParam)

  return {
    changes: {
      unwrapCodeBlockByKey: (change, key, type) =>
        unwrapCodeBlockByKey(opts, change, key, type),

      wrapCodeBlockByKey: (change, key, type) =>
        wrapCodeBlockByKey(opts, change, key, type),

      wrapCodeBlock: (change, key, type) =>
        wrapCodeBlock(opts, change, key, type),

      unwrapCodeBlock: (change, key, type) =>
        unwrapCodeBlock(opts, change, key, type),
    },

    utils: {
      deserializeCode: (text) => deserializeCode(opts, text),
    },
  }
}
