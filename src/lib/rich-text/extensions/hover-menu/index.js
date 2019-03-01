import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { insertImage } from "../image-plugin/insert-image"
import { hasMark } from "./has-mark"
import { hasBlock } from "./has-block"
import { DEFAULT_NODE, ICONS_LIST } from "./constant"
import { StyledMenu, Button } from "./styles"
import { handleQuote, handleCode, handleList } from "./handles"

const getIconComponent = (type) => ICONS_LIST[type] || "span"

export class HoverMenu extends React.Component {
  static defaultProps = {
    className: "",
  }

  static propTypes = {
    editor: PropTypes.shape({}).isRequired,
    configCodePlugin: PropTypes.shape({
      block: PropTypes.string,
      line: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
  }

  menu = React.createRef()
  state = {
    isHoverInCodeBlock: false,
  }

  updateMenu() {
    const { menu } = this
    const { isHoverInCodeBlock } = this.state
    const { editor, configCodePlugin } = this.props
    const { value } = editor
    const { fragment, selection, startBlock } = value

    if (!menu.current || !startBlock) return
    const isCodeBlock =
      startBlock.type === configCodePlugin.block ||
      startBlock.type === configCodePlugin.line

    if (isCodeBlock !== isHoverInCodeBlock) {
      this.setState({ isHoverInCodeBlock: isCodeBlock })
    }

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.current.removeAttribute("style")
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const pair = 2

    menu.current.style.opacity = 1
    menu.current.style.top = `${rect.top +
      window.pageYOffset -
      menu.current.offsetHeight}px`

    const leftPosition = `${rect.left +
      window.pageXOffset -
      menu.current.offsetWidth / pair +
      rect.width / pair}px`

    menu.current.style.left = leftPosition
  }

  renderImageButton(type) {
    const IconComponent = getIconComponent(type)

    return (
      <Button onMouseDown={(event) => this.onClickImage(event)}>
        <IconComponent fill="#aaa" width="20px" height="20px" />
      </Button>
    )
  }

  onClickImage = (event) => {
    const { editor } = this.props

    event.preventDefault()
    // eslint-disable-next-line no-alert
    const src = window.prompt("Enter the URL of the image:")

    if (!src) return
    editor.command(insertImage, src)
  }

  renderBlockButton = (type) => {
    const { editor, configCodePlugin } = this.props
    const { value } = editor
    let isActive = hasBlock(type, editor)

    const checkisActiveBlockButton = (blocks, list) => {
      if (blocks.includes(type)) {
        if (value.blocks.size > 0) {
          const parent = value.document.getParent(value.blocks.first().key)

          isActive = hasBlock(list, editor) && parent && parent.type === type
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

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { editor, configCodePlugin } = this.props

    handleList(type, editor, configCodePlugin)
    handleQuote(type, editor, configCodePlugin)
    if (configCodePlugin.block && configCodePlugin.line) {
      handleCode(type, editor, configCodePlugin)
    }
  }

  renderMarkButton = (type) => {
    const { editor } = this.props
    const isActive = hasMark(type, editor)

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

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  render() {
    const { className, configCodePlugin } = this.props
    const { isHoverInCodeBlock } = this.state

    const root = document.querySelector("#root")
    const codeBlockButton =
      configCodePlugin.block && this.renderBlockButton(configCodePlugin.block)

    const buttons = isHoverInCodeBlock ? (
      <>{codeBlockButton}</>
    ) : (
      <>
        {this.renderMarkButton("bold")}
        {this.renderMarkButton("italic")}
        {this.renderMarkButton("underlined")}
        {this.renderImageButton("image")}
        {this.renderMarkButton("code")}
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
