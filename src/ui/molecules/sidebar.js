import React from "react"
import PropTypes from "prop-types"

import { CardSticky } from "../atoms"

export const Sidebar = ({ children }) => <CardSticky>{children}</CardSticky>

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
}
