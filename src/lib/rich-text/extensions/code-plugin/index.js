import React from "react"
import { CodeBlock } from "./code-block"

const defaultOptions = {
  block: "",
  line: "",
}

export const CodePlugin = (options = {}) => {
  const config = { ...defaultOptions, ...options }

  return [
    {
      renderBlock(props, _editor, next) {
        const { node, children, attributes } = props

        const NodeTypes = {
          [config.block]: <CodeBlock className={config.block} {...props} />,
          [config.line]: (
            <div className={config.line} {...attributes}>
              {children}
            </div>
          ),
        }

        return NodeTypes[node.type] || next()
      },
    },
  ]
}
