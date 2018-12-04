/**
 * From client to server
 */
export const cardRepresent = ({ id, content, title }) => ({
  $loki: id,
  content,
  title,
})

/**
 * From server to client
 */
export const cardPresent = ({ $loki, content, title, authorId, meta, canEdit }) => ({
  id: $loki,
  content,
  title,
  authorId,
  createdAt: meta.created,
  canEdit,
})


export const cardWithFlagCanEdit =
  (authorId) => (card) => ({ ...card, canEdit: authorId === card.authorId })
