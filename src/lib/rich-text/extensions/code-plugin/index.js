import React from "react"
import { PrismPlugin } from "./prism-plugin"
import { CodeBlock } from "./code-block"

import { Options } from "./options"
import { onKeyDown, onPaste } from "./handlers"
import { core } from "./core"

export const CodePlugin = (options = {}) => {
  const config = new Options({
    block: "",
    line: "",
    ...options,
  })

  const getCore = core(config)

  return [
    {
      renderNode(props, editor, next) {
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
      ...getCore,
    },
    PrismPlugin({
      onlyIn: (node) => node.type === config.block,
      getSyntax: (node) => node.data.get("language"),
    }),
    {
      onKeyDown: (event, change, editor) =>
        onKeyDown(config, event, change, editor),

      onPaste: (event, change, editor) =>
        onPaste(config, event, change, editor),
    },
  ]
}
