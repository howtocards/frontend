// @flow

import * as React from "react"
import { Value } from "slate"
import { Editor } from "slate-react"
import { RichEditorStyle } from "./styles"
// import { AddMenu } from "./plugins"

// import {
//   HoverMenu,
//   CodePlugin,
//   HotKeys,
//   PrismPlugin,
//   ImagePlugin,
// } from "./extensions"

// const configCodePlugin = {
//   block: "code_block",
//   line: "code_line",
// }

// // const plugins = [
// //   ImagePlugin(),
// //   PrismPlugin({
// //     onlyIn: (node) => node.type === configCodePlugin.block,
// //     getSyntax: (node) => node.data.get("language"),
// //   }),
// //   CodePlugin(configCodePlugin),
// // ]

// const NODES_COMPONENTS = {
//   "block-quote": "blockquote",
//   "bulleted-list": "ul",
//   "list-item": "li",
//   "numbered-list": "ol",
// }

// const MARKS_COMPONENTS = {
//   bold: "strong",
//   italic: "em",
//   underlined: "u",
//   code: "code",
// }

// Add the plugin to your set of plugins...
// const plugins = []

type Props = {
  readOnly?: boolean,
  // eslint-disable-next-line react/require-default-props
  onChange: (content: Object) => any,
  content: {
    document: Object,
  },
}

type State = {
  value: Object,
}

export class RichEditor extends React.Component<Props, State> {
  editorContainerNode = React.createRef<HTMLDivElement>()

  static defaultProps = {
    // eslint-disable-next-line react/default-props-match-prop-types
    onChange: () => {},
    readOnly: false,
  }

  // $FlowIssue
  renderBlock = (_props, _editor, next) => {
    const { attributes, children, node } = _props
    if (node.type === "line") {
      return (
        <div className="block-paragraph">
          <span {...attributes}>{children}</span>
        </div>
      )
    }
    console.log("node", node.type)
    return next()
    // const Type = NODES_COMPONENTS[node.type]

    // return Type ? <Type {...attributes}>{children}</Type> : next()
  }

  // $FlowIssue
  renderMark = (_props, _editor, next) => {
    const { children, mark, attributes } = _props
    console.log("mark", mark.type)
    return next()
    // const Type = MARKS_COMPONENTS[mark.type]
    // const className = mark.type === "code" ? { className: "code_inline" } : {}
    // return Type ? (
    //   <Type {...attributes} {...className}>
    //     {children}
    //   </Type>
    // ) : (
    //   next()
    // )
  }

  // $FlowIssue
  renderEditor = (_props, change, next) => {
    const editorComponent = next()
    const { content } = this.props

    return (
      <div ref={this.editorContainerNode}>
        {editorComponent}
        {/* <AddMenu
          value={Value.fromJS(content)}
          editorContainerNode={this.editorContainerNode.current}
          change={change}
        /> */}
        {/* <HoverMenu configCodePlugin={configCodePlugin} editor={_editor} /> */}
      </div>
    )
  }

  // // $FlowIssue
  onChange = ({ value }) => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { readOnly, content } = this.props

    return (
      <RichEditorStyle>
        <Editor
          spellCheck={false}
          style={{
            minHeight: "300px",
          }}
          tabIndex={0}
          readOnly={readOnly}
          value={Value.fromJS(content)}
          onChange={this.onChange}
          // plugins={plugins}
          // {...HotKeys(configCodePlugin)}
          renderEditor={this.renderEditor}
          renderMark={this.renderMark}
          renderBlock={this.renderBlock}
        />
      </RichEditorStyle>
    )
  }
}
