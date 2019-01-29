import { initialFetching, fetchStatus } from "symbiote-fetching"
import { reducer, actions } from "./current"

describe("actions.set", () => {
  it("should set model, useful, created", () => {
    const initial = {
      model: null,
      useful: [],
      created: [],
      fetching: initialFetching,
    }

    const result = reducer(
      initial,
      actions.set({
        user: { id: 1 },
        useful: [{ id: 2 }],
        created: [{ id: 3 }],
      }),
    )
    const expected = {
      model: { id: 1 },
      useful: [{ id: 2 }],
      created: [{ id: 3 }],
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })

  it("should overwrite model, useful, created if exists", () => {
    const initial = {
      model: { id: 900 },
      useful: [{ id: 200 }, { id: 300 }],
      created: [{ id: 400 }, { id: 500 }],
      fetching: initialFetching,
    }

    const result = reducer(
      initial,
      actions.set({
        user: { id: 1 },
        useful: [{ id: 2 }],
        created: [{ id: 3 }],
      }),
    )
    const expected = {
      model: { id: 1 },
      useful: [{ id: 2 }],
      created: [{ id: 3 }],
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.reset", () => {
  it("should clear model, useful, created", () => {
    const initial = {
      model: { id: 900 },
      useful: [{ id: 200 }, { id: 300 }],
      created: [{ id: 400 }, { id: 500 }],
      fetching: {
        status: fetchStatus.loading,
        error: null,
      },
    }

    const result = reducer(initial, actions.reset())
    const expected = {
      model: null,
      useful: [],
      created: [],
      fetching: {
        status: fetchStatus.loading,
        error: null,
      },
    }

    expect(result).toEqual(expected)
  })
})
