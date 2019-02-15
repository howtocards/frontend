import React from "react"
import ReactDOM from "react-dom"
import { DEFAULT_NODE, ICONS_LIST } from "./constant"
import { StyledMenu, Button } from "./styles"

const getIconComponent = (type) => ICONS_LIST[type] || "span"

export class HoverMenu extends React.Component {
  menu = React.createRef()
  state = {
    isHoverInCodeBlock: false,
  }

  handleCode = (type) => {
    const { editor, configCodePlugin } = this.props
    const { value } = editor
    const { document } = value

    if (type !== configCodePlugin.block) {
      const isActive = this.hasBlock(type)
      const isCodeLine = this.hasBlock("code_line")

      if (isCodeLine) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      }
    }

    if (type === configCodePlugin.block) {
      const isCodeLine = this.hasBlock(configCodePlugin.line)
      const isType = value.blocks.some((block) =>
        Boolean(
          document.getClosest(block.key, (parent) => parent.type === type),
        ),
      )

      document.getMarks().forEach((mark) => {
        editor.removeMark(mark)
      })

      if (isCodeLine && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock(type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else if (isCodeLine) {
        editor
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
          .wrapBlock(type)
      } else {
        editor
          .setBlocks(configCodePlugin.line)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
          .wrapBlock(type)
      }
    }
  }

  handleLists = (type) => {
    const { editor } = this.props
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock("list-item")

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      }
    }

    if (type === "bulleted-list" || type === "numbered-list") {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item")
      const isType = value.blocks.some((block) =>
        Boolean(
          document.getClosest(block.key, (parent) => parent.type === type),
        ),
      )

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list",
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks("list-item").wrapBlock(type)
      }
    }
  }

  onClickBlock = (event, type) => {
    event.preventDefault()
    const { editor, configCodePlugin } = this.props

    this.handleLists(type)
    if (configCodePlugin.block && configCodePlugin.line) {
      this.handleCode(type)
    }

    if (type === "block-quote") {
      const isActive = this.hasBlock(type)

      editor.setBlocks(DEFAULT_NODE).wrapBlock(isActive ? DEFAULT_NODE : type)
    }
  }

  renderBlockButton = (type) => {
    let isActive = this.hasBlock(type)
    const { editor, configCodePlugin } = this.props
    const { value } = editor

    if (["numbered-list", "bulleted-list"].includes(type)) {
      if (value.blocks.size > 0) {
        const parent = value.document.getParent(value.blocks.first().key)

        isActive = this.hasBlock("list-item") && parent && parent.type === type
      }
    }

    if (type === configCodePlugin.block) {
      if (value.blocks.size > 0) {
        const parent = value.document.getParent(value.blocks.first().key)

        isActive =
          this.hasBlock(configCodePlugin.line) && parent && parent.type === type
      }
    }

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

  updateMenu = () => {
    const { menu } = this
    const { isHoverInCodeBlock } = this.state
    const { editor } = this.props
    const { value } = editor
    const { fragment, selection, startBlock } = value

    if (!menu.current || !startBlock) return
    const isCodeBlock =
      startBlock.type === "code" || startBlock.type === "code_line"

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

    menu.current.style.opacity = 1
    menu.current.style.top = `${rect.top +
      window.pageYOffset -
      menu.current.offsetHeight}px`

    const leftPosition = `${rect.left +
      window.pageXOffset -
      menu.current.offsetWidth / 2 +
      rect.width / 2}px`

    menu.current.style.left = leftPosition
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
