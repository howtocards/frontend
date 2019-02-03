import React from "react"
import { PrismPlugin } from "./PrismPlugin"
import { CodeBlock } from "./CodeBlock"

import { Options } from "./options"
import { onKeyDown, onPaste } from "./handlers"
import { core } from "./core"

export const CodePlugin = (options = {}) => {
  const config = new Options({
    block: "code",
    line: "code_line",
    ...options,
  })

  const corePlugin = core(config)

  const keys = {
    onKeyDown: onKeyDown.bind(null, config),
    onPaste: onPaste.bind(null, config),
  }

  return [
    {
      commands: {
        insertCode(editor, { code }) {
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
      renderNode(props, editor, next) {
        const { node, children, attributes } = props

        switch (node.type) {
          case config.block:
            return <CodeBlock className={config.block} {...props} />
          case config.line:
            return (
              <div className={config.line} {...attributes}>
                {children}
              </div>
            )
          default:
            return next()
        }
      },
      ...corePlugin,
    },
    PrismPlugin({
      onlyIn: (node) => node.type === config.block,
      getSyntax: (node) => node.data.get("language"),
    }),
    keys,
  ]
}
