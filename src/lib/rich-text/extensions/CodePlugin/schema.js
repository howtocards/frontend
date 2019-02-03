/**
 * Create a schema definition with rules to normalize code blocks
 */
export const schema = (opts) => {
  const baseSchema = {
    blocks: {
      [opts.block]: {
        nodes: [{ types: [opts.line] }],
      },
      [opts.line]: {
        nodes: [{ objects: ["text"], min: 1 }],
        parent: { types: [opts.block] },
      },
    },
  }

  if (!opts.allowMarks) {
    baseSchema.blocks[opts.line].marks = []
  }

  return baseSchema
}
