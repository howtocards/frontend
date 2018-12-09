// import React from 'react'
import { connect } from "react-redux"

import {
  accountFetchingSelector,
  accountSelector,
  accountIdSelector,
} from "../selectors"

const mapStateToProps = (state) => ({
  fetching: accountFetchingSelector(state),
  account: accountSelector(state),
  accountId: accountIdSelector(state),
})

const enhance = connect(mapStateToProps)

const passProps = ({
  render,
  renderExists,
  renderEmpty,
  fetching,
  account,
  accountId,
}) => {
  if (account && renderExists) {
    return renderExists({ fetching, account, accountId })
  }
  if (renderEmpty) {
    return renderEmpty({ fetching, account, accountId })
  }

  return render ? render({ fetching, account, accountId }) : null
}

export const WithAccount = enhance(passProps)
