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

let firstUpdate = false

export class RichEditor extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.content
      ? // eslint-disable-next-line react/destructuring-assignment
        Value.fromJSON(JSON.parse(this.props.content))
      : Plain.deserialize(""),
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    const Type = NODES_COMPONENTS[node.type]

    return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  componentDidUpdate() {
    const { content } = this.props

    if (!firstUpdate) {
      firstUpdate = true
      // @TODO: Fix this fucking thing.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: Value.fromJSON(JSON.parse(content)) })
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    const Type = MARKS_COMPONENTS[mark.type]

    return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  onChange = ({ value }) => {
    const { onChange } = this.props

    this.setState({ value }, () => {
      if (typeof onChange === "function") {
        onChange(JSON.stringify(value))
      }
    })
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
    const { value } = this.state
    const { readOnly } = this.props

    return (
      <RichEditorStyle>
        <Editor
          readOnly={readOnly}
          {...HotKeys(configCodePlugin)}
          style={{
            minHeight: "300px",
          }}
          value={value}
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
