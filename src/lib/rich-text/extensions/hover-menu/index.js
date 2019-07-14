import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
// import { insertImage } from "../image-plugin/insert-image"
import { hasMark } from "./has-mark"
import { hasBlock } from "./has-block"
import { DEFAULT_NODE, ICONS_LIST } from "./constant"
import { StyledMenu, Button } from "./styles"
// import { handleQuote, handleCode, handleList } from "./handles"
import { hasParent } from "./has-parent"

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

  updateMenu() {
    const { menu } = this
    const { editor } = this.props
    const { value } = editor
    const { fragment, selection, startBlock } = value

    if (!menu.current || !startBlock) return

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

  // renderImageButton(type) {
  //   const IconComponent = getIconComponent(type)

  //   return (
  //     <Button onMouseDown={(event) => this.onClickImage(event)}>
  //       <IconComponent fill="#aaa" width="20px" height="20px" />
  //     </Button>
  //   )
  // }

  // onClickImage = (event) => {
  //   const { editor } = this.props

  //   event.preventDefault()
  //   // eslint-disable-next-line no-alert
  //   const src = window.prompt("Enter the URL of the image:")

  //   if (!src) return
  //   editor.command(insertImage, src)
  // }

  // renderBlockButton = (type) => {
  //   const { editor, configCodePlugin } = this.props
  //   const { value } = editor
  //   let isActive = hasBlock(type, editor)

  //   const checkisActiveBlock = (blocks, list) => {
  //     if (blocks.includes(type)) {
  //       if (value.blocks.size > 0) {
  //         const parent = value.document.getParent(value.blocks.first().key)

  //         isActive = hasBlock(list, editor) && parent && parent.type === type
  //       }
  //     }
  //   }

  //   checkisActiveBlock(["numbered-list", "bulleted-list"], "list-item")
  //   checkisActiveBlock([configCodePlugin.block], configCodePlugin.line)
  //   checkisActiveBlock(["block-quote"], DEFAULT_NODE)

  //   // const allBlockTypes = [
  //   //   {
  //   //     parentBlockType: ["numbered-list", "bulleted-list"],
  //   //     child: "list-item",
  //   //   },
  //   //   {
  //   //     parentBlockType: [configCodePlugin.block],
  //   //     child: configCodePlugin.line,
  //   //   },
  //   //   {
  //   //     parentBlockType: ["block-quote"],
  //   //     child: DEFAULT_NODE,
  //   //   },
  //   // ]

  //   const IconComponent = getIconComponent(type)

  //   return (
  //     <Button
  //       active={isActive}
  //       onMouseDown={(event) => this.onClickBlock(event, type)}
  //     >
  //       <IconComponent
  //         fill={isActive ? "white" : "#aaa"}
  //         width="20px"
  //         height="20px"
  //       />
  //     </Button>
  //   )
  // }

  // onClickBlock = (event, type) => {
  //   event.preventDefault()
  //   const { editor, configCodePlugin } = this.props
  //   const args = { type, editor, configCodePlugin }

  //   handleList(args)
  //   handleQuote(args)
  //   handleCode(args)
  // }

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
    const { editor, configCodePlugin } = this.props

    event.preventDefault()

    const hasCodeLine = hasBlock(configCodePlugin.line, editor)
    const hasParentCodeBlock = hasParent(editor.value, type)

    if (hasCodeLine || hasParentCodeBlock) return

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
    const root = document.querySelector("#root")

    return ReactDOM.createPortal(
      <StyledMenu className={className} ref={this.menu}>
        <>
          {this.renderMarkButton("bold")}
          {this.renderMarkButton("italic")}
          {this.renderMarkButton("underlined")}
          {this.renderMarkButton("code")}

          {/* {this.renderImageButton("image")}
          {this.renderBlockButton(configCodePlugin.block)}
          {this.renderBlockButton("block-quote")}
          {this.renderBlockButton("numbered-list")}
          {this.renderBlockButton("bulleted-list")} */}
        </>
      </StyledMenu>,
      root,
    )
  }
}
