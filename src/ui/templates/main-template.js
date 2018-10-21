import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Container = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`

const Header = styled.header`
  padding: 1rem;
  background-color: tomato;
`

const Footer = styled.footer`
  padding: 2rem;
  background-color: gray;
`

export const MainTemplate = ({ header, footer, children }) => (
  <Container>
    {header && <Header>{header}</Header>}
    {children}
    {footer && <Footer>{footer}</Footer>}
  </Container>
)

MainTemplate.defaultProps = {
  header: null,
  footer: null,
}

MainTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}
