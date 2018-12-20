import React from "react"
import PropTypes from "prop-types"

import { Card } from "@ui/atoms"
import { UsersCommonTemplate } from "../templates/common"

const messageFromError = (fetching) => {
  switch (fetching.error) {
    case "user_not_found":
      return "Sorry! User not found"

    default: {
      if (process.env.NODE_ENV === "development") {
        return `ERROR: ${fetching.error}`
      }
      return "Unexpected error..."
    }
  }
}

export const ErrorView = ({ fetching }) => (
  <UsersCommonTemplate>
    <Card>
      <center style={{ padding: "2rem 0" }}>
        {messageFromError(fetching)}
      </center>
    </Card>
  </UsersCommonTemplate>
)

ErrorView.propTypes = {
  fetching: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
}
