const isChrome =
  typeof window !== "undefined" &&
  /Chrome/.test(navigator.userAgent) &&
  /Google Inc/.test(navigator.vendor)

const getRangeClientRectsChrome = (range) => {
  const tempRange = range.cloneRange()
  const clientRects = []

  for (
    let ancestor = range.endContainer;
    ancestor !== null;
    ancestor = ancestor.parentNode
  ) {
    const atCommonAncestor = ancestor === range.commonAncestorContainer
    if (atCommonAncestor) {
      tempRange.setStart(range.startContainer, range.startOffset)
    } else {
      tempRange.setStart(tempRange.endContainer, 0)
    }
    const rects = [...tempRange.getClientRects()]
    clientRects.push(rects)
    if (atCommonAncestor) {
      clientRects.reverse()
      return [].concat(...clientRects)
    }
    tempRange.setEndBefore(ancestor)
  }

  throw new Error(
    "Found an unexpected detached subtree when getting range client rects.",
  )
}

const getRangeClientRects = isChrome
  ? getRangeClientRectsChrome
  : (range) => [...range.getClientRects()]

const getRangeBoundingClientRect = (range) => {
  const rects = getRangeClientRects(range)
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0

  // eslint-disable-next-line unicorn/explicit-length-check
  if (rects.length) {
    // eslint-disable-next-line prefer-destructuring
    ;({ top, right, bottom, left } = rects[0])
    for (let ii = 1; ii < rects.length; ii++) {
      const rect = rects[ii]
      if (rect.height !== 0 || rect.width !== 0) {
        top = Math.min(top, rect.top)
        right = Math.max(right, rect.right)
        bottom = Math.max(bottom, rect.bottom)
        left = Math.min(left, rect.left)
      }
    }
  }

  return {
    top,
    right,
    bottom,
    left,
    width: right - left,
    height: bottom - top,
  }
}

export const getVisibleSelectionRect = () => {
  if (typeof window === "undefined") {
    return null
  }
  const selection = window.getSelection()
  if (!selection.rangeCount) {
    return null
  }

  const range = selection.getRangeAt(0)
  const boundingRect = getRangeBoundingClientRect(range)
  const { top, right, bottom, left } = boundingRect

  if (top === 0 && right === 0 && bottom === 0 && left === 0) {
    return null
  }

  return boundingRect
}

export const getCollapsedClientRect = () => {
  const selection = document.getSelection()
  if (
    selection.rangeCount === 0 ||
    !selection.getRangeAt ||
    !selection.getRangeAt(0) ||
    !selection.getRangeAt(0).startContainer ||
    !selection.getRangeAt(0).startContainer.getBoundingClientRect
  ) {
    return null
  }

  const node = selection.getRangeAt(0).startContainer
  const rect = node.getBoundingClientRect()
  return rect
}
