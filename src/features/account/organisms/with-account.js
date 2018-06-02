import React from 'react'
import { connect } from 'react-redux'

import { accountFetchingSelector, accountSelector, accountIdSelector } from '../selectors'


const mapStateToProps = (state) => ({
  fetching: accountFetchingSelector(state),
  account: accountSelector(state),
  accountId: accountIdSelector(state),
})

const enhance = connect(mapStateToProps)

const passProps = ({ children, renderExists, renderEmpty, fetching, account, accountId }) => {
  if (account && renderExists) {
    return renderExists({ fetching, account, accountId })
  }
  else if (renderEmpty) {
    return renderEmpty({ fetching, account, accountId })
  }

  return children && children({ fetching, account, accountId })
}

export const WithAccount = enhance(passProps)
