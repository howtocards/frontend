export const cardScheme = {
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
  },
}

export const createCardScheme = {
  ...cardScheme,
  required: ['title', 'content'],
  additionalProperties: false,
}
