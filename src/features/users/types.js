export type CurrentUser = {
  id: number,
  displayName: string,
  email: string,
}

export type ExternalUser = {
  id: number,
  displayName: string,
}

export type User = ExternalUser | CurrentUser
