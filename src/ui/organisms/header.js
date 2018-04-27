import React from 'react'
import styled from 'styled-jss'

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
      marginLeft: '1rem',
    },
  },
  ({ theme }) => theme.embed.card,
)

const SearchBox = styled('div')({
  padding: '0 2rem',
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

const Navigation = styled('nav')({
  display: 'flex',
  flexFlow: 'row nowrap',
})

export const Header = ({ children }) => (
  <HeaderBox>
    <Container wide>
      <SearchBox>
        <SearchInput autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
      </SearchBox>
      <Navigation>
        Menu
      </Navigation>
    </Container>
  </HeaderBox>
)
