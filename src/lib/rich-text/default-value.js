import { Value } from "slate"

export const defaultValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
      },
    ],
  },
})
