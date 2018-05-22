
export class EmptyResultError extends Error {
  constructor() {
    super('Returned empty result')
  }
}

