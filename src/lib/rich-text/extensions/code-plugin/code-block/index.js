import React from "react"
import PrismComponents from "prismjs/components"
import styled from "styled-components"

const PreBlock = styled.pre`
  padding: 4rem 2rem;
  border: 1px solid ${(p) => p.theme.palette.decoration.borders};
  ${({ theme }) => theme.embed.canvas}
`

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

const arrayOfLanguages = Object.entries(languages).sort()

export class CodeBlock extends React.Component {
  componentDidMount() {
    const { editor, className, node, attributes, children } = this.props

    const codeLanguage = node.data.get("language")

    if (languages[codeLanguage]) {
      import(`prismjs/components/prism-${codeLanguage}.min`).then(() => {
        languages[codeLanguage].isLoaded = true
        editor.setNodeByKey(node.key, { data: { language: codeLanguage } })
      })
    }
  }

  onChange = (newLanguage) => {
    const { editor, node } = this.props

    if (languages[newLanguage]) {
      if (languages[newLanguage].isLoaded) {
        editor.setNodeByKey(node.key, { data: { language: newLanguage } })
      } else {
        import(`prismjs/components/prism-${newLanguage}.min`).then(() => {
          languages[newLanguage].isLoaded = true
          editor.setNodeByKey(node.key, { data: { language: newLanguage } })
        })
      }
    }
  }

  render() {
    const { editor, className, node, attributes, children } = this.props

    const language = node.data.get("language")
    const languageComponent = editor.readOnly ? (
      <span>{language}</span>
    ) : (
      <select
        value={language}
        onChange={(event) => this.onChange(event.target.value)}
      >
        {arrayOfLanguages.map(([key, value]) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </select>
    )

    return (
      <div className={className} style={{ position: "relative" }}>
        <PreBlock>
          <code {...attributes}>{children}</code>
        </PreBlock>
        <div
          contentEditable={false}
          style={{ position: "absolute", top: "5px", right: "5px" }}
        >
          {languageComponent}
        </div>
      </div>
    )
  }
}
