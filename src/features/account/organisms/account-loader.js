import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'

import { accountFetch, tokenGet } from '../effects'
import { accountFetchingSelector, accountIdSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: accountFetchingSelector(state),
  accountId: accountIdSelector(state),
})

const enhance = compose(
  connect(mapStateToProps),
  withPropsOnChange(
    (props, nextProps) => props.accountId !== nextProps.accountId,
    ({ dispatch, accountId }) => {
      if (dispatch(tokenGet()) && !accountId) {
        dispatch(accountFetch())
      }
    },
  ),
)

export const AccountLoader = enhance(({ children }) => children)
