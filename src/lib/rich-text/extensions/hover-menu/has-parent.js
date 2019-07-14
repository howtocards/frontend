export const hasParent = (value, type) =>
  value.blocks.some((block) =>
    Boolean(
      value.document.getClosest(block.key, (parent) => parent.type === type),
    ),
  )
