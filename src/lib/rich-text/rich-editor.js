import React from "react"
import { Editor } from "slate-react"
import { defaultValue } from "./default-value"
import { HoverMenu } from "./extensions/HoverMenu"
import { CodePlugin } from "./extensions/CodePlugin"
import { RichEditorStyle } from "./styles"

const plugins = [
  CodePlugin({
    block: "code_block",
    line: "code_line",
  }),
]

export class RichEditor extends React.Component {
  state = {
    value: defaultValue,
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  updateMenu = () => {
    const { menu } = this

    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style")
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>
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

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>
      case "italic":
        return <em {...attributes}>{children}</em>
      case "underlined":
        return <u {...attributes}>{children}</u>
      case "code":
        return <code {...attributes}>{children}</code>
      default:
        return next()
    }
  }

  onKeyDown = (event, editor, next) => {
    const { value } = editor
    const { startBlock } = value

    if (event.key === "Enter" && startBlock.type === "code") {
      editor.insertText("\n")
      return
    }

    next()
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  renderEditor = (props, editor, next) => {
    const children = next()

    return (
      <React.Fragment>
        {children}
        <HoverMenu
          // eslint-disable-next-line no-return-assign
          innerRef={(menu) => (this.menu = menu)}
          editor={editor}
        />
      </React.Fragment>
    )
  }

  render() {
    const { value } = this.state

    return (
      <RichEditorStyle>
        <Editor
          style={{
            minHeight: "300px",
          }}
          value={value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          onKeyDown={this.onKeyDown}
          plugins={plugins}
        />
      </RichEditorStyle>
    )
  }
}
