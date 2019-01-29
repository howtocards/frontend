import { reducer, actions } from "./registry"
/* eslint-disable no-magic-numbers */

describe("actions.reset", () => {
  it("should clear", () => {
    const result = reducer({ 1: {}, 2: {} }, actions.reset())
    const expected = {}

    expect(result).toEqual(expected)
  })
})

describe("actions.merge", () => {
  it("should add new cards to empty", () => {
    const result = reducer({}, actions.merge({ 1: { id: 1 } }))
    const expected = {
      1: { id: 1 },
    }

    expect(result).toEqual(expected)
  })

  it("should add new cards to exists", () => {
    const initial = { 2: { id: 2 } }

    const result = reducer(
      initial,
      actions.merge({ 1: { id: 1 }, 3: { id: 3 } }),
    )
    const expected = {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 },
    }

    expect(result).toEqual(expected)
  })

  it("should overwrite exists cards", () => {
    const initial = { 1: { id: 1, value: "FOO" } }

    const result = reducer(
      initial,
      actions.merge({ 1: { id: 1, value: "BAR" } }),
    )
    const expected = {
      1: { id: 1, value: "BAR" },
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.mergeById", () => {
  it("should merge array to object by id", () => {
    const initial = {
      1: { id: 1, value: 1 },
      2: { id: 2, value: 2 },
    }

    const result = reducer(
      initial,
      actions.mergeById([{ id: 3, value: 3 }, { id: 4, value: 4 }]),
    )
    const expected = {
      1: { id: 1, value: 1 },
      2: { id: 2, value: 2 },
      3: { id: 3, value: 3 },
      4: { id: 4, value: 4 },
    }

    expect(result).toEqual(expected)
  })

  it("should add new items from array", () => {
    const initial = {}

    const result = reducer(
      initial,
      actions.mergeById([{ id: 1, value: 1 }, { id: 2, value: 2 }]),
    )
    const expected = {
      1: { id: 1, value: 1 },
      2: { id: 2, value: 2 },
    }

    expect(result).toEqual(expected)
  })

  it("should overwrite items by id", () => {
    const initial = {
      1: {
        id: 1,
        value: "FOO",
      },
    }

    const result = reducer(
      initial,
      actions.mergeById([{ id: 1, value: "BAR" }, { id: 2, value: "ZAF" }]),
    )
    const expected = {
      1: { id: 1, value: "BAR" },
      2: { id: 2, value: "ZAF" },
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.setCard", () => {
  it("should add one card by id", () => {
    const initial = {}
    const card = { id: 1, value: "TITLE" }

    const result = reducer(initial, actions.setCard(card))
    const expected = {
      1: card,
    }

    expect(result).toEqual(expected)
  })

  it("should merge card data with exists", () => {
    const initial = { 1: { id: 1, title: "FOO" } }

    const result = reducer(initial, actions.setCard({ id: 1, content: "BAR" }))
    const expected = {
      1: {
        id: 1,
        title: "FOO",
        content: "BAR",
      },
    }

    expect(result).toEqual(expected)
  })
})

describe("actions.setUsefulMark", () => {
  it("should set useful mark to exists card", () => {
    const initial = {
      1: {
        id: 1,
        title: "FOO",
        meta: {
          isUseful: false,
          isEditable: false,
        },
      },
    }

    const result = reducer(
      initial,
      actions.setUsefulMark({ cardId: 1, isUseful: true }),
    )
    const expected = {
      1: {
        id: 1,
        title: "FOO",
        meta: {
          isUseful: true,
          isEditable: false,
        },
      },
    }

    expect(result).toEqual(expected)
  })

  it("do nothing if not found", () => {
    const initial = { 2: { id: 2 } }

    const result = reducer(
      initial,
      actions.setUsefulMark({ cardId: 1, isUseful: true }),
    )
    const expected = { 2: { id: 2 } }

    expect(result).toEqual(expected)
  })
})

describe("actions.delete", () => {
  it("should remove card if exists", () => {
    const initial = { 1: { id: 1 }, 2: { id: 2 } }

    const result = reducer(initial, actions.delete(2))
    const expected = {
      1: { id: 1 },
    }

    expect(result).toEqual(expected)
  })
})
