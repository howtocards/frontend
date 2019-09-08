import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

export const MainTemplate = ({ header, footer, children }) => (
  <MainContainer>
    {header && <Header>{header}</Header>}
    {children}
    {footer && <Footer>{footer}</Footer>}
  </MainContainer>
)

MainTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}

MainTemplate.defaultProps = {
  header: null,
  footer: null,
}

const MainContainer = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "."
    "footer";
`

const Header = styled.header`
  grid-area: header;
  z-index: 1;
`

const Footer = styled.footer`
  grid-area: footer;
`
