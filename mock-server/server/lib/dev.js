export const required = (fieldName = required('fieldName')) => {
  if (typeof fieldName === 'undefined') {
    throw new TypeError(`Field "${fieldName}" is required`)
  }
}
