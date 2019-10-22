// @flow
import * as React from "react"
import styled from "styled-components"
import { useLocation } from "@lib/router-hooks"
import { useDebouncedValue } from "@lib/debounce-hooks"
import { history } from "@lib/routing"
import { useStore } from "effector-react"
import { $searchHistory, searchHistoryChanged } from "../model/search-history"
import { searchTriggered } from "../model/main"

const UPDATE_INTERVAL = 500

export const SearchBar = () => {
  const searchHistory = useStore($searchHistory)
  const inputRef = React.useRef(null)

  const { pathname, search } = useLocation()
  const autoFocus = pathname === "/search"

  const queryParams = new URLSearchParams(search.replace(/^\?/, ""))
  const searchQuery = queryParams.get("q")

  const [searchString, setSearchString] = React.useState(
    () => searchQuery || "",
  )

  const debouncedSearchString = useDebouncedValue(searchString, UPDATE_INTERVAL)

  React.useEffect(() => {
    if (debouncedSearchString) {
      if (!searchHistory.includes(debouncedSearchString)) {
        queryParams.set("q", debouncedSearchString)
        searchHistoryChanged(debouncedSearchString)

        // $off
        history.push(`/search?${queryParams}`)

        searchTriggered(debouncedSearchString)
      }
    }

    if (!debouncedSearchString && searchHistory.length > 0) {
      history.push("/")
    }
  }, [debouncedSearchString])

  return (
    <SearchInput
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      autoFocus={autoFocus}
      onChange={(event) => setSearchString(event.target.value)}
      placeholder="Search..."
      ref={inputRef}
      spellCheck="false"
      value={searchString}
    />
  )
}

const SearchInput = styled.input`
  appearance: none;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  box-sizing: border-box;
  font-size: 1.6rem;
  outline: none;
  width: 100%;
  padding: 0 2rem;
  transition: box-shadow 120ms;

  &:focus {
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.palette.primary.initial.background};
  }

  ${({ theme }) => theme.embed.canvas}
`
