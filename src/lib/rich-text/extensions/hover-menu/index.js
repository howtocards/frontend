import React from "react"
import ReactDOM from "react-dom"
import { DEFAULT_NODE, ICONS_LIST } from "./constant"
import { StyledMenu, Button } from "./styles"
import { updateMenu, handleQuote, handleCode, handleList } from "./handles"

const getIconComponent = (type) => ICONS_LIST[type] || "span"

export class HoverMenu extends React.Component {
  menu = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      isHoverInCodeBlock: false,
    }
    // @TODO: fucking shit code! It needs to be reworked.
    this.updateMenu = updateMenu.bind(this)
    this.handleCode = handleCode.bind(this)
    this.handleList = handleList.bind(this)
    this.handleQuote = handleQuote.bind(this)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { editor, configCodePlugin } = this.props

    this.handleList(type)
    this.handleQuote(type)
    if (configCodePlugin.block && configCodePlugin.line) {
      this.handleCode(type)
    }
  }

  renderBlockButton = (type) => {
    let isActive = this.hasBlock(type)
    const { editor, configCodePlugin } = this.props
    const { value } = editor

    const checkisActiveBlockButton = (blocks, list) => {
      if (blocks.includes(type)) {
        if (value.blocks.size > 0) {
          const parent = value.document.getParent(value.blocks.first().key)

          isActive = this.hasBlock(list) && parent && parent.type === type
        }
      }
    }

    checkisActiveBlockButton(["numbered-list", "bulleted-list"], "list-item")
    checkisActiveBlockButton([configCodePlugin.block], configCodePlugin.line)
    checkisActiveBlockButton(["block-quote"], DEFAULT_NODE)

    const IconComponent = getIconComponent(type)

    return (
      <Button
        active={isActive}
        onMouseDown={(event) => this.onClickBlock(event, type)}
      >
        <IconComponent
          fill={isActive ? "white" : "#aaa"}
          width="20px"
          height="20px"
        />
      </Button>
    )
  }

  renderMarkButton = (type) => {
    const isActive = this.hasMark(type)

    const IconComponent = getIconComponent(type)

    return (
      <Button onMouseDown={(event) => this.onClickMark(event, type)}>
        <IconComponent
          fill={isActive ? "white" : "#aaa"}
          width="20px"
          height="20px"
        />
      </Button>
    )
  }

  onClickMark = (event, type) => {
    const { editor } = this.props

    event.preventDefault()
    editor.toggleMark(type)
  }

  hasBlock = (type) => {
    const { editor } = this.props
    const { value } = editor

    return value.blocks.some((node) => node.type === type)
  }

  hasMark = (type) => {
    const { editor } = this.props
    const { value } = editor

    return value.activeMarks.some((mark) => mark.type === type)
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  render() {
    const { className, innerRef, configCodePlugin } = this.props
    const { isHoverInCodeBlock } = this.state

    const root = window.document.getElementById("root")
    const codeBlockButton =
      configCodePlugin.block && this.renderBlockButton(configCodePlugin.block)

    const buttons = isHoverInCodeBlock ? (
      <>{codeBlockButton}</>
    ) : (
      <>
        {this.renderMarkButton("bold")}
        {this.renderMarkButton("italic")}
        {this.renderMarkButton("underlined")}
        {codeBlockButton}
        {this.renderBlockButton("block-quote")}
        {this.renderBlockButton("numbered-list")}
        {this.renderBlockButton("bulleted-list")}
      </>
    )

    return ReactDOM.createPortal(
      <StyledMenu className={className} ref={this.menu}>
        {buttons}
      </StyledMenu>,
      root,
    )
  }
}
