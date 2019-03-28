import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { compose } from "recompose"
import debounce from "debounce"
import { actions } from "./symbiotes"
import { getSearchResults } from "./effects"

const { setSearchString } = actions

const mapStateToProps = (state) => ({
  searchString: state.search.searchString,
  params: new URLSearchParams(state.router.location.search.replace(/^\?/, "")),
  pathname: state.router.location.pathname,
})

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (searchString = "") =>
    dispatch(setSearchString(searchString)),
  queryPush: (params, searchString) => () => {
    if (searchString) {
      params.set("q", searchString)
    } else {
      params.delete("q")
    }

    return dispatch(getSearchResults, params)
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    queryPush: dispatchProps.queryPush(
      stateProps.params,
      stateProps.searchString,
    ),
  }
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  withRouter,
)

const UPDATE_INTERVAL = 500

export class SearchBarView extends React.Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    searchString: PropTypes.string.isRequired,
    params: PropTypes.instanceOf(URLSearchParams).isRequired,
    onSearchChange: PropTypes.func.isRequired,
    queryPush: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { params, onSearchChange } = this.props
    const q = params.get("q")

    if (q) {
      onSearchChange(q)
    }
  }

  componentDidUpdate(prevProps) {
    const { searchString, params, onSearchChange } = this.props

    const { searchString: prevSearchString, params: prevParams } = prevProps

    const q = params.get("q") || ""
    const qPrev = prevParams.get("q") || ""

    if (q !== qPrev) {
      onSearchChange(q)
      return
    }
    if (searchString !== prevSearchString) {
      this.queryStringUpdate()
    }
  }

  queryStringUpdate = debounce(() => {
    const { queryPush } = this.props

    queryPush()
  }, UPDATE_INTERVAL)

  render() {
    const { searchString, onSearchChange, pathname } = this.props

    return (
      <SearchInput
        placeholder="Search..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        autoFocus={pathname === "/search"}
        spellCheck="false"
        value={searchString}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    )
  }
}

export const SearchBar = enhance(SearchBarView)

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
