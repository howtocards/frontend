// @flow
import * as React from "react"
import PropTypes from "prop-types"

import { Card } from "@howtocards/ui"
import { UsersCommonTemplate } from "../templates/common"

const messageFromError = (error) => {
  switch (error) {
    case "user_not_found":
      return "Sorry! User not found"

    default: {
      if (process.env.NODE_ENV === "development") {
        return `ERROR: ${error}`
      }
      return "Unexpected error..."
    }
  }
}

type Props = {
  error: string,
}

export const ErrorView = ({ error }: Props) => (
  <UsersCommonTemplate>
    <Card>
      <center style={{ padding: "2rem 0" }}>{messageFromError(error)}</center>
    </Card>
  </UsersCommonTemplate>
)

ErrorView.propTypes = {
  error: PropTypes.string.isRequired,
}
