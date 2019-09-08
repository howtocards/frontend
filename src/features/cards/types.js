// @flow

export type Card = {
  id: number,
  title: string,
  createdAt: string,
  meta: {
    canEdit: boolean,
    isUseful: boolean,
  },
  content: mixed,
}
