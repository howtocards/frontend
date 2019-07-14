import * as React from "react"
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
 * Default rendering for decorations
 */
const defaultRenderDecoration = (props) => {
  const { children, decoration, attributes } = props

  if (decoration.data.get("token") !== TOKEN_MARK) {
    return undefined
  }

  return (
    <span {...attributes} className={decoration.data.get("className")}>
      {children}
    </span>
  )
}

defaultRenderDecoration.propTypes = {
  decoration: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  attributes: PropTypes.oneOfType([]).isRequired,
}

/**
 * The plugin options
 */

export const defaultOptions = {
  onlyIn: defaultOnlyIn,
  getSyntax: defaultGetSyntax,
  renderDecoration: defaultRenderDecoration,
}
