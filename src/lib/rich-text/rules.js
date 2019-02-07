import React from "react"

export const NODES_COMPONENTS = {
  "block-quote": "blockquote",
  "bulleted-list": "ul",
  "list-item": "li",
  "numbered-list": "ol",
}

export const BACKWARD_NODES_COMPONENTS = Object.keys(NODES_COMPONENTS).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {},
)

export const MARKS_COMPONENTS = {
  bold: "strong",
  italic: "em",
  underlined: "u",
}

export const BACKWARD_MARKS_COMPONENTS = Object.keys(MARKS_COMPONENTS).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {},
)

export const DISPLAY_RULES = [
  {
    // eslint-disable-next-line consistent-return
    deserialize(el, next) {
      const type = BACKWARD_NODES_COMPONENTS[el.tagName.toLowerCase()]

      if (type) {
        return {
          object: "block",
          type,
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    // eslint-disable-next-line consistent-return
    serialize(node, children) {
      if (node.object === "block") {
        const Type = NODES_COMPONENTS[node.type]

        if (Type) {
          return <Type className={node.data.get("className")}>{children}</Type>
        }
        if (node.type === "paragraph") {
          return <p className={node.data.get("className")}>{children}</p>
        }

        if (node.type === "code_line") {
          console.log("obj code_line", node)
          return <div className={node.data.get("className")}>{children}</div>
        }

        if (node.type === "code") {
          const lang = node.data.get("language")

          return (
            <pre
              data-language={lang || ""}
              style={{ padding: "4rem 2rem", backgroundColor: "#263238" }}
            >
              <code>{children}</code>
            </pre>
          )
        }
      }
    },
  },
  {
    // eslint-disable-next-line consistent-return
    deserialize(el, next) {
      const type = BACKWARD_MARKS_COMPONENTS[el.tagName.toLowerCase()]

      if (type) {
        return {
          object: "mark",
          type,
          nodes: next(el.childNodes),
        }
      }
    },
    // eslint-disable-next-line consistent-return
    serialize(node, children) {
      if (node.object === "mark") {
        const Type = MARKS_COMPONENTS[node.type]

        if (Type) {
          return <Type className={node.data.get("className")}>{children}</Type>
        }
      }
    },
  },
]
