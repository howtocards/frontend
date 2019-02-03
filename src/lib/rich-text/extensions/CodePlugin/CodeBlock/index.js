import React from "react"
import PrismComponents from "prismjs/components"

const exlude = {
  meta: true,
  markup: true,
}

const languages = Object.entries(PrismComponents.languages).reduce(
  (acc, [key]) => {
    if (!exlude[key]) {
      acc[key] = key
    }
    return acc
  },
  {},
)

export class CodeBlock extends React.Component {
  componentDidMount() {
    this.onChange("javascript")
  }

  onChange = (value) => {
    const { editor, node } = this.props

    editor.setNodeByKey(node.key, { data: { language: value } })
  }

  render() {
    const { className, node, attributes, children } = this.props
    const language = node.data.get("language")

    return (
      <div className={className} style={{ position: "relative" }}>
        <pre style={{ padding: "4rem 2rem", backgroundColor: "#263238" }}>
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
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
