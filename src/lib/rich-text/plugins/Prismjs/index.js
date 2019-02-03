import { Point } from "slate"
import Prism from "prismjs"

import { TOKEN_MARK } from "../../constant"
import { Options } from "./options"

/**
 * A Slate plugin to highlight code syntax.
 */
export const PrismPlugin = (optsParam = {}) => {
  const opts = new Options(optsParam)

  return {
    decorateNode: (node) => {
      if (!opts.onlyIn(node)) {
        return undefined
      }
      return decorateNode(opts, node)
    },

    renderMark: opts.renderMark,

    TOKEN_MARK,
  }
}

/**
 * Returns the decoration for a node
 */
const decorateNode = (opts, block) => {
  const grammarName = opts.getSyntax(block)
  const grammar = Prism.languages[grammarName]

  if (!grammar) {
    // Grammar not loaded
    return []
  }

  // Tokenize the whole block text
  const texts = block.getTexts()
  const blockText = texts.map((t) => t.text).join("\n")
  const tokens = Prism.tokenize(blockText, grammar)

  // The list of decorations to return
  const decorations = []
  let textStart = 0
  let textEnd = 0

  texts.forEach((text) => {
    textEnd = textStart + text.text.length

    let offset = 0

    function processToken(token, accu) {
      // eslint-disable-next-line no-param-reassign
      accu = accu || ""

      if (typeof token === "string") {
        if (accu) {
          const decoration = createDecoration({
            text,
            textStart,
            textEnd,
            start: offset,
            end: offset + token.length,
            className: `prism-token token ${accu}`,
          })

          if (decoration) {
            decorations.push(decoration)
          }
        }
        offset += token.length
      } else {
        // eslint-disable-next-line no-param-reassign
        accu = `${accu} ${token.type} ${token.alias || ""}`

        if (typeof token.content === "string") {
          const decoration = createDecoration({
            text,
            textStart,
            textEnd,
            start: offset,
            end: offset + token.content.length,
            className: `prism-token token ${accu}`,
          })

          if (decoration) {
            decorations.push(decoration)
          }

          offset += token.content.length
        } else {
          // When using token.content instead of token.matchedStr, token can be deep
          for (let count = 0; count < token.content.length; count += 1) {
            processToken(token.content[count], accu)
          }
        }
      }
    }

    tokens.forEach(processToken)
    textStart = textEnd + 1 // account for added `\n`
  })

  return decorations
}

/**
 * Return a decoration range for the given text.
 */
const createDecoration = ({
  text,
  textStart,
  textEnd,
  start,
  end,
  className,
}) => {
  if (start >= textEnd || end <= textStart) {
    // Ignore, the token is not in the text
    return null
  }

  // Shrink to this text boundaries
  // eslint-disable-next-line no-param-reassign
  start = Math.max(start, textStart)
  // eslint-disable-next-line no-param-reassign
  end = Math.min(end, textEnd)

  // Now shift offsets to be relative to this text
  // eslint-disable-next-line no-param-reassign
  start -= textStart
  // eslint-disable-next-line no-param-reassign
  end -= textStart

  return {
    anchor: new Point({ key: text.key, offset: start }),
    focus: new Point({ key: text.key, offset: end }),
    mark: { type: "prism-token", data: { className } },
  }
}
