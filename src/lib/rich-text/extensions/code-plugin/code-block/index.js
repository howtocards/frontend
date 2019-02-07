import React from "react"
import PrismComponents from "prismjs/components"

const exclude = {
  meta: true,
  markup: true,
}

const filterObject = (acc, [key]) =>
  exclude[key]
    ? acc
    : {
        ...acc,
        [key]: {
          name: key,
          isLoaded: false,
        },
      }

const languages = Object.entries(PrismComponents.languages).reduce(
  filterObject,
  {},
)

export class CodeBlock extends React.Component {
  onChange = (value) => {
    const { editor, node } = this.props

    if (languages[value]) {
      if (languages[value].isLoaded) {
        editor.setNodeByKey(node.key, { data: { language: value } })
      } else {
        import(`prismjs/components/prism-${value}.min`).then(() => {
          languages[value].isLoaded = true
          editor.setNodeByKey(node.key, { data: { language: value } })
        })
      }
    }
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
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
