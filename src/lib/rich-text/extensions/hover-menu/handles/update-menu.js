export function updateMenu() {
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
