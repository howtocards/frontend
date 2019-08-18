import React from "react"
import PropTypes from "prop-types"

import { WithAccount } from "./with-account"

const noop = () => null;

export const Authenticated = ({ render = noop }) => (
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
