import React from 'react'
import styled from 'styled-jss'
import { Link } from 'react-router-dom'

import { Container } from 'ui/templates'

// https://codepen.io/anon/pen/PebeaL

const HeaderBox = styled('header')(
  {
    borderBottom: '1px solid',
    display: 'flex',
    height: '6rem',
    justifyContent: 'center',
    padding: '1rem 0',
    zIndex: 1000,
    '& > div > * + *': {
      marginLeft: '2rem',
    },
  },
  ({ theme }) => theme.embed.card,
)

const SearchBox = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'stretch',
})

const SearchInput = styled('input')(
  {
    appearance: 'none',
    border: 'none',
    borderRadius: '6px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    fontSize: '1.6rem',
    outline: 'none',
    width: '100%',
    padding: '0 2rem',
  },
  ({ theme }) => theme.embed.canvas,
)

const NavItem = styled(Link)(({ theme }) => ({
  ...theme.embed.link,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  fontSize: '1.4rem',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: '600',
  '&:hover': {
    color: '#ff0000',
  },
}))

export const Header = ({ children }) => (
  <HeaderBox>
    <Container>
      <NavItem to="/">HowToCards</NavItem>
      <SearchBox>
        <SearchInput autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
      </SearchBox>
      <NavItem to="/feed">Feed</NavItem>
      <NavItem to="/table">Table</NavItem>
    </Container>
  </HeaderBox>
)
