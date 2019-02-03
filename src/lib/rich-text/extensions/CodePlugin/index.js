import React from "react"
import { KeyMap } from "./KeyMap"
import { PrismPlugin } from "./PrismPlugin"
import { CodeBlock } from "./CodeBlock"

export const CodePlugin = (options = {}) => {
  const config = {
    block: "code_block",
    line: "code_line",
    ...options,
  }

  const isCodeLine = (editor) => editor.value.startBlock.type === config.line

  const onEnter = (event, editor) => {
    event.preventDefault()
    editor.splitBlock().setBlocks(config.line)
  }

  const onTab = (event, editor) => {
    event.preventDefault()
    editor.insertText("  ")
  }

  const onSelectAll = (event, editor) => {
    event.preventDefault()
    const {
      value: { startBlock },
    } = editor
    const {
      value: { document },
    } = editor
    const parent = document.getParent(startBlock.key)

    editor.moveToRangeOfNode(parent)
  }

  const schema = {
    blocks: {
      code: {
        nodes: [
          {
            match: { type: config.line },
          },
        ],
      },
      code_line: {
        nodes: [
          {
            match: { object: "text" },
          },
        ],
      },
    },
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
            return <CodeBlock {...props} />
          case config.line:
            return <div {...attributes}>{children}</div>
          default:
            return next()
        }
      },
      schema,
    },
    PrismPlugin({
      onlyIn: (node) => node.type === config.block,
      getSyntax: (node) => node.data.get("language"),
    }),
    KeyMap(
      {
        "mod+a": onSelectAll,
        tab: onTab,
        enter: onEnter,
      },
      { if: isCodeLine },
    ),
  ]
}
