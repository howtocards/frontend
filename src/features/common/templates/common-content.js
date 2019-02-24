import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { MainTemplate } from "@howtocards/ui/templates"
import { Header } from "../organisms"

export const CommonContentTemplate = ({ header, children }) => (
  <MainTemplate header={header}>
    <CommonContent>{children}</CommonContent>
  </MainTemplate>
)

CommonContentTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
}

CommonContentTemplate.defaultProps = {
  header: <Header />,
}

export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  ${({ theme }) => theme.embed.canvas}
`
