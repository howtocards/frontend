import React from "react"
import { PrismPlugin } from "./prism-plugin"
import { CodeBlock } from "./code-block"
import { Options } from "./options"
import { onKeyDown, onPaste } from "./handlers"

export const CodePlugin = (options = {}) => {
  const config = new Options({
    ...options,
  })

  return [
    {
      commands: {
        insertCode(editor, code) {
          editor.insertBlock({
            object: "block",
            type: config.block,
            nodes: [
              {
                object: "block",
                type: config.line,
                nodes: [{ object: "text", leaves: [code] }],
              },
            ],
          })
        },
      },

      onKeyDown: (event, change, editor) =>
        onKeyDown(config, event, change, editor),

      onPaste: (event, change, editor) =>
        onPaste(config, event, change, editor),
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
    },
    PrismPlugin({
      onlyIn: (node) => node.type === config.block,
      getSyntax: (node) => node.data.get("language"),
    }),
  ]
}
