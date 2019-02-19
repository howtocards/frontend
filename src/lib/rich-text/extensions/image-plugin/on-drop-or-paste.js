import { getEventRange, getEventTransfer } from "slate-react"
// eslint-disable-next-line import/extensions
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
    return !!imageExtensions.find((item) => item && url.endsWith(item))
  } catch (error) {
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

  // const { type, text, files } = transfer
  // if (type === "files") {
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const file of files) {
  //     const reader = new FileReader()
  //     const [mime] = file.type.split("/")

  //     // eslint-disable-next-line no-continue
  //     if (mime !== "image") continue

  //     // eslint-disable-next-line no-loop-func
  //     reader.addEventListener("load", () => {
  //       editor.command(insertImage, reader.result, target)
  //     })

  //     reader.readAsDataURL(file)
  //   }
  //   return next()
  // }

  if (type === "text") {
    if (!isUrl(text)) return next()
    if (!isImage(text)) return next()
    editor.command(insertImage, text, target)
    return next()
  }

  return next()
}
