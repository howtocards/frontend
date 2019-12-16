// @flow

export type Card = {
  id: number,
  title: string,
  createdAt: string,
  permissions: {
    canEdit: boolean,
    isUseful: boolean,
  },
  content: mixed,
}
