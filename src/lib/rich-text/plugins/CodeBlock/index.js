import React from "react"

const languages = {
  js: "javascript",
  css: "css",
  html: "html",
  rust: "rust",
  php: "php",
  java: "java",
}

export class CodeBlock extends React.Component {
  componentDidMount() {
    this.onChange(Object.keys(languages)[0])
  }

  onChange = (value) => {
    const { editor, node } = this.props

    editor.setNodeByKey(node.key, { data: { language: value } })
  }

  render() {
    const { node, attributes, children } = this.props
    const language = node.data.get("language")

    return (
      <div style={{ position: "relative" }}>
        <pre style={{ padding: "2rem 1rem", backgroundColor: "#263238" }}>
          <code {...attributes}>{children}</code>
        </pre>
        <div
          contentEditable={false}
          style={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <select
            value={language}
            onChange={(event) => this.onChange(event.target.value)}
          >
            {Object.entries(languages).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
