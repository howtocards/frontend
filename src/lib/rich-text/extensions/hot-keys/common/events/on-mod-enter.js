import { Block, Text } from "slate"

export const onModEnter = ({ event, change, editor }) => {
  const { value } = change

  const { selection } = value

  if (!selection.isCollapsed) {
    return editor()
  }

  event.preventDefault()

  const exitBlock = Block.create({
    type: "paragraph",
    nodes: [Text.create()],
  })

  change.insertBlockAtRange(selection, exitBlock, {
    normalize: false,
  })
  // Exit the block
  change.unwrapNodeByKey(exitBlock.key)

  return change.moveToStartOfNode(exitBlock)
}
