import { getEventRange, getEventTransfer } from "slate-react"
import imageExtensions from "image-extensions"
import isUrl from "is-url"
import { insertImage } from "./insert-image"

/*
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

const isImage = (url) => {
  try {
    return Boolean(imageExtensions.find((item) => item && url.endsWith(item)))
  } catch (_error) {
    return false
  }
}

/**
 * On drop, insert the image wherever it is dropped.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

export const onDropOrPaste = (event, editor, next) => {
  const target = getEventRange(event, editor)

  if (!target && event.type === "drop") return next()

  const transfer = getEventTransfer(event)
  const { type, text } = transfer

  if (type === "text") {
    if (!isUrl(text)) return next()
    if (!isImage(text)) return next()
    editor.command(insertImage, text, target)
    return next()
  }

  return next()
}
