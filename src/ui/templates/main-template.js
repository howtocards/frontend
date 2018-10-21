import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const MainContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`

const Header = styled.header`
  padding: 1rem;
`

const Footer = styled.footer`
  padding: 2rem;
`

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
