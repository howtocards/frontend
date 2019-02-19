import React from "react"
import { Block } from "slate"
import { onDropOrPaste } from "./on-drop-or-paste"

const schema = {
  document: {
    last: { type: "paragraph" },
    normalize: (editor, { code, node }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph")

          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default:
      }
      return false
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}

export const ImagePlugin = () => [
  {
    renderNode(props, editor, next) {
      const { attributes, node } = props

      switch (node.type) {
        case "image": {
          const src = node.data.get("src")

          // eslint-disable-next-line jsx-a11y/alt-text
          return <img src={src} {...attributes} className="image_inline" />
        }

        default: {
          return next()
        }
      }
    },
    schema,
  },
  {
    onDrop: onDropOrPaste,
    onPaste: onDropOrPaste,
  },
]
