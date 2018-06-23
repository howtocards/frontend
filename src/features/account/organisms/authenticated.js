import React from 'react'
import PropTypes from 'prop-types'

import { fetchStatus } from 'symbiote-fetching'
import { WithAccount } from './with-account'


export const Authenticated = ({ render, account }) => (
  <WithAccount
    renderExists={render}
    render={({ fetching }) => {
      switch (fetching.status) {
        case fetchStatus.initial:
        case fetchStatus.failed:
          return (<div>Authenticated only</div>)

        default:
          return <div>Loading...</div>
      }
    }}
  />
)

Authenticated.propTypes = {
  render: PropTypes.func,
}

Authenticated.defaultProps = {
  render: () => null,
}
