export const hasMark = (type, editor) => {
  const { value } = editor

  return value.activeMarks.some((mark) => mark.type === type)
}
