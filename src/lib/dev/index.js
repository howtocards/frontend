
export const required = (name = required('name')) => {
  if (typeof name === 'undefined') {
    throw new TypeError(`Argument ${name} is required!`)
  }
}
