import React from "react"
import PropTypes from "prop-types"

import { WithAccount } from "./with-account"

export const Authenticated = ({ render }) => (
  <WithAccount
    renderExists={render}
    render={({ fetching }) => {
      switch (fetching.status) {
        case "initial":
        case "failed":
          return <div>Authenticated only</div>

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
