
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
export const cardPresent = ({ $loki, content, title }) => ({
  id: $loki,
  content,
  title,
})
