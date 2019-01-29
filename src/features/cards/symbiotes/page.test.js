import { initialFetching } from "symbiote-fetching"
import { initialState, reducer, actions } from "./page"
/* eslint-disable no-magic-numbers */

describe("actions.setCardsIds", () => {
  it("should set cards ids", () => {
    const result = reducer(initialState, actions.setCardsIds([1, 2, 3]))
    const expected = {
      fetchingAll: initialFetching,
      fetchingOne: initialFetching,
      cardsIds: [1, 2, 3],
    }

    expect(result).toEqual(expected)
  })
})
