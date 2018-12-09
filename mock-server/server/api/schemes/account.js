export const authScheme = {
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
}

export const sessionDropSchema = {
  properties: {
    token: { type: "string" },
  },
}
