/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor
 * @param {String} src
 * @param {Range} target
 */

export const insertImage = (editor, src, target) => {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: "image",
    data: { src },
  })
}
