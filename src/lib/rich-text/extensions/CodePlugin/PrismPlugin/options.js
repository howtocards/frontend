import * as React from "react"
import { Record } from "immutable"

import { TOKEN_MARK } from "./constant"

/**
 * Default filter for code blocks
 */
const defaultOnlyIn = (node) => node.object === "block" && node.type === "code"

/**
 * Default getter for syntax
 */
const defaultGetSyntax = () => "js"

/**
 * Default rendering for marks
 */
const defaultRenderMark = (props) => {
  const { mark, children } = props

  if (mark.type !== TOKEN_MARK) {
    return undefined
  }
  const className = mark.data.get("className")

  return <span className={className}>{children}</span>
}

/**
 * The plugin options
 */
export class Options extends Record({
  onlyIn: defaultOnlyIn,
  getSyntax: defaultGetSyntax,
  renderMark: defaultRenderMark,
}) {}
