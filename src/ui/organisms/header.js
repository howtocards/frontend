import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ToggleThemeConsumer } from 'lib/theme-context'
import { Container } from 'ui/templates'


// https://codepen.io/anon/pen/PebeaL

const HeaderBox = styled.header`
  border-bottom: 1px solid;
  display: flex;
  height: 7rem;
  justify-content: center;
  z-index: 1000;
  box-sizing: border-box;

  & > div > * + * {
    margin-left: 2rem;
  }

  ${({ theme }) => theme.embed.card}
`.extend.withConfig({ componentId: 'HeaderBox' })``

const SearchBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding: 1.3rem 0;
`.extend.withConfig({ componentId: 'SearchBox' })``

const SearchInput = styled.input`
  appearance: none;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  box-sizing: border-box;
  font-size: 1.6rem;
  outline: none;
  width: 100%;
  padding: 0 2rem;
  transition: box-shadow 120ms;

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.initial};
  }

  ${({ theme }) => theme.embed.canvas}
`

const NavItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.initial};
  }

  ${({ theme }) => theme.embed.link}
`

const NavLink = NavItem.withComponent(Link)


export const Header = () => (
  <HeaderBox>
    <Container>
      <NavLink to="/">HowToCards</NavLink>
      <SearchBox>
        <SearchInput autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
      </SearchBox>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/table">Table</NavLink>
      <NavLink to="/join">Join</NavLink>
      <ToggleThemeConsumer>
        {({ toggleDark, dark }) => (
          <NavItem onClick={toggleDark}>{dark ? '🌔' : '☀️'}</NavItem>
        )}
      </ToggleThemeConsumer>
    </Container>
  </HeaderBox>
)

