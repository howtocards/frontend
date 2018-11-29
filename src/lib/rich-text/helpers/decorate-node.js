
export const decorateNode = (node, editor, next) => {
  const others = next() || []

  if (node.type !== 'code') return others
  const texts = node.getTexts().toArray()
  const string = texts.map((t) => t.text).join('\n')

  console.log(string)
  return others
}
