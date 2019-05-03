import React from "react"
import { CodeBlock } from "./code-block"
import { Options } from "./options"

export const CodePlugin = (options = {}) => {
  const config = new Options({
    ...options,
  })

  return [
    {
      renderNode(props, _editor, next) {
        const { node, children, attributes } = props

        const Types = {
          [config.block]: <CodeBlock className={config.block} {...props} />,
          [config.line]: (
            <div className={config.line} {...attributes}>
              {children}
            </div>
          ),
        }

        return Types[node.type] || next()
      },
    },
  ]
}
