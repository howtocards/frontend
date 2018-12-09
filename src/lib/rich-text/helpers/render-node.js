import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"

export const renderNode = (props, editor, next) => {
  const { attributes, children, node } = props
  let texts

  switch (node.type) {
    case "block-quote":
      return (
        <blockquote
          {...attributes}
          style={{
            borderLeft: "2px solid #ddd",
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: "10px",
            color: "#aaa",
            fontStyle: "italic",
          }}
        >
          {children}
        </blockquote>
      )
    case "code":
      texts = node
        .getTexts()
        .toArray()
        .map((t) => t.text)
        .join("\n")

      return (
        /* be careful, it is not working correctly
         * https://github.com/ianstormtaylor/slate/issues/2093
         */
        <Highlight {...defaultProps} code={texts} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} {...attributes} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "list-item":
      return <li {...attributes}>{children}</li>
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    default:
      return next()
  }
}
