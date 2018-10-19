
export const required = (name = required('name')) => {
  if (typeof name === 'undefined') {
    throw new TypeError(`Argument ${name} is required!`)
  }
}

export const devLog = process.env.NODE_ENV === 'development'
  ? (name, ...args) => {
    // eslint-disable-next-line no-console
    console.info(name, ...args)
  }
  : () => {}
