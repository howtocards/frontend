import React from "react"
import { Value } from "slate"
import { Editor } from "slate-react"
import Plain from "slate-plain-serializer"
import { HoverMenu, CodePlugin, KeysCode } from "./extensions"
import { RichEditorStyle } from "./styles"

const configCodePlugin = {
  block: "code",
  line: "code_line",
}

const plugins = [CodePlugin(configCodePlugin)]

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

export class RichEditor extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.content
      ? // eslint-disable-next-line react/destructuring-assignment
        Value.fromJSON(JSON.parse(this.props.content))
      : Plain.deserialize(""),
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const { menu } = this
    const { value } = this.state
    const { fragment, selection } = value

    if (!menu) return

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style")
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    const leftPosition = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`

    menu.style.left = leftPosition
  }

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
        <HoverMenu
          configCodePlugin={configCodePlugin}
          // eslint-disable-next-line no-return-assign
          innerRef={(menu) => (this.menu = menu)}
          editor={editor}
        />
      </React.Fragment>
    )
  }

  render() {
    const { value } = this.state
    const { readOnly } = this.props

    return (
      <>
        <RichEditorStyle>
          <Editor
            readOnly={readOnly}
            {...KeysCode(configCodePlugin)}
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
      </>
    )
  }
}
