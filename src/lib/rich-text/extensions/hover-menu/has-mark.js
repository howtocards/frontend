export const hasMark = (type, editor) =>
  editor.value.activeMarks.some((mark) => mark.type === type)
