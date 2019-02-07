import React from "react"
import { Editor } from "slate-react"
import Html from "slate-html-serializer"
import { HoverMenu, CodePlugin } from "./extensions"
import { RichEditorStyle } from "./styles"
import { NODES_COMPONENTS, MARKS_COMPONENTS, DISPLAY_RULES } from "./rules"

const plugins = [
  CodePlugin({
    block: "code",
    line: "code_line",
  }),
]

const html = new Html({ rules: DISPLAY_RULES })
const getInitialValue = (value) => value || "<p></p>"

export class RichEditor extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: html.deserialize(getInitialValue(this.props.content)),
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
      const string = html.serialize(value)

      onChange(string)
    })
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
    const { content } = this.props

    return (
      <>
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
            plugins={plugins}
          />
        </RichEditorStyle>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </>
    )
  }
}
