// import React from 'react'
import { compose, withPropsOnChange } from "recompose"
import { connect } from "react-redux"

import { accountFetch, tokenGet } from "../effects"
import { accountFetchingSelector, accountIdSelector } from "../selectors"

const mapStateToProps = (state) => ({
  fetching: accountFetchingSelector(state),
  accountId: accountIdSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onFetch: () => dispatch(accountFetch),
  getToken: () => dispatch(tokenGet),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(
    (props, nextProps) => props.accountId !== nextProps.accountId,
    ({ accountId, getToken, onFetch }) => {
      if (getToken() && !accountId) {
        onFetch()
      }
    },
  ),
)

export const AccountLoader = enhance(({ children }) => children)
