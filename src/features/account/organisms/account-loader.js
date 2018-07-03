import React from 'react'
import { compose, withPropsOnChange, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { accountFetch, tokenGet } from '../effects'
import { accountFetchingSelector, accountIdSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: accountFetchingSelector(state),
  accountId: accountIdSelector(state),
})

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    onFetch: () => accountFetch,
    getToken: () => tokenGet,
  }),
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
