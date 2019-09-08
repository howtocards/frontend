/* eslint-disable react/prop-types */
import * as React from "react"
import { Record } from "immutable"
import PropTypes from "prop-types"
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

defaultRenderMark.propTypes = {
  mark: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

/**
 * The plugin options
 */
export class Options extends Record({
  onlyIn: defaultOnlyIn,
  getSyntax: defaultGetSyntax,
  renderMark: defaultRenderMark,
}) {}
