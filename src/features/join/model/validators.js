const emailRegexp = /.{2,}@(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/gim
export const emailValidator = (value) => {
  if (value < 1) return "Please, enter email"
  if (!emailRegexp.test(value)) return "Please, enter correct email"
  return null
}

const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/
export const passwordValidator = (value) => {
  if (!passwordRegexp.test(value))
    return "Your password should include at least uppercase, lowercase, number and special symbol"

  return null
}
