import React from "react"
import { Value } from "slate"
import { Editor } from "slate-react"
import Plain from "slate-plain-serializer"
import { HoverMenu, CodePlugin, HotKeys, PrismPlugin } from "./extensions"
import { RichEditorStyle } from "./styles"

const configCodePlugin = {
  block: "code",
  line: "code_line",
}

const plugins = [
  PrismPlugin({
    onlyIn: (node) => node.type === configCodePlugin.block,
    getSyntax: (node) => node.data.get("language"),
  }),
  CodePlugin(configCodePlugin),
]

export const NODES_COMPONENTS = {
  "block-quote": "blockquote",
  "bulleted-list": "ul",
  "list-item": "li",
  "numbered-list": "ol",
}

export const MARKS_COMPONENTS = {
  bold: "strong",
  italic: "em",
  underlined: "u",
}

const fromJsonToValue = (content) =>
  content ? Value.fromJSON(content) : Plain.deserialize("")

export class RichEditor extends React.Component {
  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    const Type = NODES_COMPONENTS[node.type]

    return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    const Type = MARKS_COMPONENTS[mark.type]

    return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  onChange = ({ value }) => {
    const { onChange } = this.props

    if (typeof onChange === "function") {
      onChange(value)
    }
  }

  renderEditor = (props, editor, next) => {
    const children = next()

    return (
      <React.Fragment>
        {children}
        <HoverMenu configCodePlugin={configCodePlugin} editor={editor} />
      </React.Fragment>
    )
  }

  render() {
    const { content, readOnly } = this.props

    return (
      <RichEditorStyle>
        <Editor
          value={fromJsonToValue(content)}
          readOnly={readOnly}
          {...HotKeys(configCodePlugin)}
          style={{
            minHeight: "300px",
          }}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          plugins={plugins}
        />
      </RichEditorStyle>
    )
  }
}
