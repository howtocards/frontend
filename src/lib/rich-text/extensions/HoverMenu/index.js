import React from "react"
import ReactDOM from "react-dom"
import { DEFAULT_NODE, ICONS_LIST } from "./constant"
import { StyledMenu, Button } from "./styles"

const getIconComponent = (type) => ICONS_LIST[type] || "span"

export class HoverMenu extends React.Component {
  onClickBlock = (event, type) => {
    event.preventDefault()

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
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item")
      const isType = value.blocks.some(
        (block) =>
          !!document.getClosest(block.key, (parent) => parent.type === type),
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

  renderBlockButton = (type) => {
    let isActive = this.hasBlock(type)

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { editor } = this.props
      const {
        value: { document, blocks },
      } = editor

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)

        isActive = this.hasBlock("list-item") && parent && parent.type === type
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

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById("root")

    return ReactDOM.createPortal(
      <StyledMenu className={className} ref={innerRef}>
        {this.renderMarkButton("bold")}
        {this.renderMarkButton("italic")}
        {this.renderMarkButton("underlined")}
        {this.renderBlockButton("code")}
        {this.renderBlockButton("block-quote")}
        {this.renderBlockButton("numbered-list")}
        {this.renderBlockButton("bulleted-list")}
      </StyledMenu>,
      root,
    )
  }
}
