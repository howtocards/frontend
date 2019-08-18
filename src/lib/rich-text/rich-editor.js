import React from "react"
import PropTypes from "prop-types"
import { Value } from "slate"
import { Editor } from "slate-react"
import {
  CodePlugin,
  HotKeys,
  HoverMenu,
  ImagePlugin,
  PrismPlugin,
} from "./extensions"
import { RichEditorStyle } from "./styles"

const noop = () => {}

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



const renderNode = (props, _editor, next) => {
  const { attributes, children, node } = props
  const Type = NODES_COMPONENTS[node.type]

  return Type ? <Type {...attributes}>{children}</Type> : next()
}

const renderMark = (props, _editor, next) => {
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

const renderEditor = (_props, editor, next) => {
  const children = next()

  return (
    <React.Fragment>
      {children}
      <HoverMenu configCodePlugin={configCodePlugin} editor={editor} />
    </React.Fragment>
  )
}

export const RichEditor = ({ content, onChange, readOnly }) => {
  const [stateValue, setValue] = useState(Value.fromJS(content))

  const onChange = ({ value }) => {
    setValue(value, () => {
      if (!readOnly && typeof onChange === "function") {
        onChange(value.toJS())
      }
    })
  }

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
        value={stateValue}
        onChange={onChange}
        renderEditor={renderEditor}
        renderMark={renderMark}
        renderNode={renderNode}
        plugins={plugins}
      />
    </RichEditorStyle>
  )
}

RichEditor.propTypes = {
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  content: PropTypes.shape({
    document: PropTypes.shape({}).isRequired,
  }).isRequired,
}