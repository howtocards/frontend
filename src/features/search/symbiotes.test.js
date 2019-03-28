import { reducer, actions } from "./symbiotes"

describe("actions.setSearchString", () => {
  it("should set search value", () => {
    const initial = {
      searchString: "",
    }

    const result = reducer(initial, actions.setSearchString("Some value"))

    const expected = {
      searchString: "Some value",
    }

    expect(result).toEqual(expected)
  })

  it("should clear search value", () => {
    const initial = {
      searchString: "Some value",
    }

    const result = reducer(initial, actions.setSearchString(""))

    const expected = {
      searchString: "",
    }

    expect(result).toEqual(expected)
  })
})
