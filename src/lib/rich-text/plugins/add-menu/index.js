// @flow

import * as React from "react"
import { getVisibleSelectionRect } from "./get-selection-range"
import { ICONS_LIST } from "./constant"

type Props = {
  value: Object,
  editorContainerNode: ?HTMLDivElement,
}

type State = {
  openPopover: boolean,
}

const getIconComponent = (type: $Keys<typeof ICONS_LIST>) =>
  ICONS_LIST[type] || "span"

const icons = [
  getIconComponent("image"),
  getIconComponent("code_block"),
  getIconComponent("block-quote"),
]

export class AddMenu extends React.Component<Props, State> {
  sidebarContainerNode = React.createRef<HTMLDivElement>()

  state = {
    openPopover: false,
  }

  componentDidMount() {
    window.addEventListener("scroll", () => this.componentDidUpdate(this.props))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () =>
      this.componentDidUpdate(this.props),
    )
  }

  componentDidUpdate(prevProps: Props) {
    const { value, editorContainerNode } = this.props
    const { openPopover } = this.state
    const { texts, focusBlock } = value
    const currentTextNode = texts.get(0)
    const currentLineText = currentTextNode.text

    if (!this.sidebarContainerNode.current) return

    if (
      (currentLineText.length !== 0 ||
        focusBlock.type !== "paragraph" ||
        value !== prevProps.value) &&
      openPopover
    ) {
      this.hidePopover()
    }

    const rect = getVisibleSelectionRect()

    if (!rect || !this.sidebarContainerNode.current || !editorContainerNode) {
      return
    }

    const containerBound = editorContainerNode.getBoundingClientRect()
    const { top: containerBoundTop } = containerBound

    this.sidebarContainerNode.current.style.left = `${-20}px`

    const top = rect.top - containerBoundTop - 3
    this.sidebarContainerNode.current.style.top = `${top}px`
    this.sidebarContainerNode.current.style.opacity = "1"
  }

  hidePopover = () => {
    this.setState({
      openPopover: false,
    })
  }

  handleVisibleChange = (visible: boolean) => {
    this.setState({
      openPopover: visible,
    })
  }

  renderButton = (Type: any, i: number) => {
    const { value, onChange } = this.props

    return (
      <div key={i}>
        <div>
          1
          {/* <Type
            change={value.change()}
            onChange={onChange}
            className="__slate-sidebar_slateToolbarItem"
            strokeClassName="qlStroke"
            strokeMitterClassName="qlStrokeMitter"
            fillClassName="qlFill"
            evenClassName="qlEven"
            colorLabelClassName="qlColorLabel"
            thinClassName="qlThin"
            activeStrokeMitterClassName="qlStrokeMitterActive"
            activeClassName="__slate-sidebar_slateToolbarItem __slate-sidebar_slateToolbarActiveItem"
            activeStrokeClassName="qlStrokeActive"
            activeFillClassName="qlFillActive"
            activeThinClassName="qlThinActive"
            activeEvenClassName="qlEvenActive"
          /> */}
        </div>
        <div>{title}</div>
      </div>
    )
  }

  render() {
    const { value } = this.props
    const { openPopover } = this.state
    const { texts, focusBlock } = value
    const currentTextNode = texts.get(0)
    const currentLineText = currentTextNode.text

    const content = icons.map((item, i) => this.renderButton(item, i))

    return (
      currentLineText.length === 0 &&
      focusBlock.type === "paragraph" && (
        <div innerRef={this.sidebarContainerNode}>
          <Icon
            type="plus-circle"
            theme="outlined"
            onClick={() => this.handleVisibleChange(!openPopover)}
            className={openPopover && "open"}
          />
          <PopupContainer isOpen={openPopover}>{content}</PopupContainer>
        </div>
      )
    )
  }
}
