import Prism from "prismjs"
import { TOKEN_MARK } from "./constant"
import { defaultOptions } from "./options"

/**
 * A Slate plugin to highlight code syntax.
 */
export const PrismPlugin = (optsParam = {}) => {
  const opts = { ...defaultOptions, ...optsParam }

  return {
    decorateNode: (node, editor, next) => {
      if (!opts.onlyIn(node)) {
        return undefined
      }
      return decorateNode(opts, node, editor, next)
    },

    renderDecoration: opts.renderDecoration,
  }
}

/**
 * Returns the decoration for a node
 */
const decorateNode = (opts, node, editor, next) => {
  const language = opts.getSyntax(node)
  const grammar = Prism.languages[language]

  const others = next() || []

  if (!grammar) {
    // Grammar not loaded
    return others
  }

  const texts = [...node.texts()]
  const string = texts.map(([n]) => n.text).join("\n")
  const tokens = Prism.tokenize(string, grammar)
  const decorations = []
  let startEntry = texts.shift()
  let endEntry = startEntry
  let startOffset = 0
  let endOffset = 0
  let start = 0

  for (const token of tokens) {
    startEntry = endEntry
    startOffset = endOffset

    const [startText, startPath] = startEntry
    const content = getContent(token)
    const newlines = content.split("\n").length - 1
    const length = content.length - newlines
    const end = start + length

    let available = startText.text.length - startOffset
    let remaining = length

    endOffset = startOffset + remaining

    while (available < remaining && texts.length > 0) {
      endEntry = texts.shift()
      const [endText] = endEntry
      remaining = length - available
      available = endText.text.length
      endOffset = remaining
    }

    const [endText, endPath] = endEntry

    if (typeof token !== "string") {
      const dec = createDecoration({
        token,
        startText,
        startPath,
        startOffset,
        endText,
        endPath,
        endOffset,
        className: `prism-token token ${token.type} ${token.alias || ""}`,
      })

      decorations.push(dec)
    }

    start = end
  }

  return [...others, ...decorations]
}

/**
 * A helper function to return the content of a Prism `token`.
 *
 * @param {Object} token
 * @return {String}
 */

function getContent(token) {
  if (typeof token === "string") {
    return token
  }
  if (typeof token.content === "string") {
    return token.content
  }

  return token.content.map(getContent).join("")
}

/**
 * Return a decoration range for the given text.
 */

const createDecoration = ({
  token,
  startText,
  startPath,
  startOffset,
  endText,
  endPath,
  endOffset,
  className,
}) => {
  return {
    type: token.type,
    anchor: {
      key: startText.key,
      path: startPath,
      offset: startOffset,
    },
    focus: {
      key: endText.key,
      path: endPath,
      offset: endOffset,
    },

    data: { token: TOKEN_MARK, className },
  }
}
