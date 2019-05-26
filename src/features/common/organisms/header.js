import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { WithThemeToggler } from "@lib/theme-context"
import { Container } from "@howtocards/ui"
import { WithAccount } from "./with-account"

// https://codepen.io/anon/pen/PebeaL

export const Header = () => (
  <HeaderBox>
    <Container>
      <NavLink to="/">HowToCards</NavLink>
      <SearchBox>
        <SearchInput
          placeholder="Search..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </SearchBox>
      <Navigation />
      <ToggleThemeButton />
    </Container>
  </HeaderBox>
)

const Navigation = () => (
  <WithAccount renderExists={linksForUser} renderEmpty={linksForAnonym} />
)

const linksForUser = ({ account }) => (
  <>
    <NavLink to="/new/card">+ New</NavLink>
    <NavLink to={`/user/${account.user.id}`}>{account.user.email}</NavLink>
    <NavLink to="/logout">Logout</NavLink>
  </>
)

linksForUser.propTypes = {
  account: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
    }),
  }).isRequired,
}

const linksForAnonym = () => <NavLink to="/join">Join</NavLink>

const ToggleThemeButton = () => (
  <WithThemeToggler
    render={({ toggle, isDark }) => (
      <NavItem onClick={toggle}>{isDark ? "🌔" : "☀️"}</NavItem>
    )}
  />
)

const HeaderBox = styled.header`
  display: flex;
  height: 7rem;
  justify-content: center;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(36, 37, 38, 0.08);

  & > div > * + * {
    margin-left: 2rem;
  }

  ${({ theme }) => theme.embed.card}
`

const SearchBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  padding: 1.3rem 0;
`

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
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.palette.primary.initial.background};
  }

  ${({ theme }) => theme.embed.canvas}
`

const NavItem = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.initial.background};
  }

  ${({ theme }) => theme.embed.link}
`

const NavLink = NavItem.withComponent(Link)
