
export class EmptyResult extends Error {
  constructor() {
    super('Returned empty result')
  }
}
