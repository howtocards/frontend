import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { above } from 'styled-breakpoints'


const Container = styled.div`
  display: grid;
  grid-column-gap: 2rem;
  max-width: 900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 
    "sidebar"
    "main";

  ${above('tablet')} {
    grid-template-rows: 1fr;
    grid-template-columns: 30% auto;
    grid-template-areas: "sidebar main";
  }

`

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: gold;
`

const Main = styled.main`
  grid-area: main;
  background-color: rebeccapurple;
`

export const SidebarTemplate = ({ sidebar, children }) => (
  <Container>
    <Sidebar>{sidebar}</Sidebar>
    <Main>{children}</Main>
  </Container>
)

SidebarTemplate.propTypes = {
  sidebar: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}
