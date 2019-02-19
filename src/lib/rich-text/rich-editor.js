import React from "react"
import PropTypes from "prop-types"
import { Value } from "slate"
import { Editor } from "slate-react"
import {
  HoverMenu,
  CodePlugin,
  HotKeys,
  PrismPlugin,
  ImagePlugin,
} from "./extensions"
import { RichEditorStyle } from "./styles"

const configCodePlugin = {
  block: "code_block",
  line: "code_line",
}

const plugins = [
  ImagePlugin(),
  PrismPlugin({
    onlyIn: (node) => node.type === configCodePlugin.block,
    getSyntax: (node) => node.data.get("language"),
  }),
  CodePlugin(configCodePlugin),
]

const NODES_COMPONENTS = {
  "block-quote": "blockquote",
  "bulleted-list": "ul",
  "list-item": "li",
  "numbered-list": "ol",
}

const MARKS_COMPONENTS = {
  bold: "strong",
  italic: "em",
  underlined: "u",
  code: "code",
}

export class RichEditor extends React.Component {
  static defaultProps = {
    onChange: () => {},
    readOnly: false,
  }

  static propTypes = {
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    content: PropTypes.shape({
      document: PropTypes.shape({}).isRequired,
    }).isRequired,
  }

  state = {
    // eslint-disable-next-line react/no-unused-state, react/destructuring-assignment
    value: Value.fromJS(this.props.content),
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    const Type = NODES_COMPONENTS[node.type]

    return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    const Type = MARKS_COMPONENTS[mark.type]

    const className = mark.type === "code" ? { className: "code_inline" } : {}

    return Type ? (
      <Type {...attributes} {...className}>
        {children}
      </Type>
    ) : (
      next()
    )
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

  onChange = ({ value }) => {
    const { onChange, readOnly } = this.props
    const toJS = value.toJS()

    this.setState({ value }, () => {
      if (!readOnly && typeof onChange === "function") {
        onChange(toJS)
      }
    })
  }

  render() {
    const { readOnly } = this.props
    const { value } = this.state

    return (
      <RichEditorStyle>
        <Editor
          tabIndex={0}
          spellcheck={false}
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
