import { initialFetching } from "symbiote-fetching"
import { reducer, actions } from "./symbiotes"

describe("actions.setBaseUri", () => {
  it("should set base uri", () => {
    const initial = {
      baseUri: "/api",
      options: {},
      account: null,
      fetching: initialFetching,
    }

    const result = reducer(initial, actions.setBaseUri("Some value"))
    const expected = {
      baseUri: "Some value",
      options: {},
      account: null,
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.setOptions", () => {
  it("should set options", () => {
    const initial = {
      baseUri: "/uri",
      options: {},
      account: null,
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.setOptions({ foo: 1, bar: false }))
    const expected = {
      baseUri: "/uri",
      options: { foo: 1, bar: false },
      account: null,
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })

  it("should not merge options", () => {
    const initial = {
      baseUri: "/uri",
      options: { foo: 2, baz: "example" },
      account: null,
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.setOptions({ foo: 1, bar: false }))
    const expected = {
      baseUri: "/uri",
      options: { foo: 1, bar: false },
      account: null,
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.account.set", () => {
  it("should set account if empty", () => {
    const initial = {
      baseUri: "/uri",
      options: {},
      account: null,
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.account.set({ id: 123 }))
    const expected = {
      baseUri: "/uri",
      options: {},
      account: { id: 123 },
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })

  it("should replace account if exists", () => {
    const initial = {
      baseUri: "/uri",
      options: {},
      account: { id: 200, value: "wow" },
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.account.set({ id: 123 }))
    const expected = {
      baseUri: "/uri",
      options: {},
      account: { id: 123 },
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.account.unset", () => {
  it("should unset account if exists", () => {
    const initial = {
      baseUri: "/uri",
      options: {},
      account: { id: 200, value: "wow" },
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.account.unset())
    const expected = {
      baseUri: "/uri",
      options: {},
      account: null,
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })

  it("do nothing if empty", () => {
    const initial = {
      baseUri: "/uri",
      options: {},
      account: null,
      fetching: initialFetching,
    }
    const result = reducer(initial, actions.account.unset())
    const expected = {
      baseUri: "/uri",
      options: {},
      account: null,
      fetching: initialFetching,
    }

    expect(result).toEqual(expected)
  })
})
