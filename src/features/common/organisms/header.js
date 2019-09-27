// @flow
/* eslint-disable react/prop-types */
import * as React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { useTheme } from "@lib/theme-context"
import * as Menu from "@lib/context-menu"
import { Container } from "@howtocards/ui"
import { SearchBar } from "@features/search"
import { WithAccount } from "./with-account"

// https://codepen.io/anon/pen/PebeaL

export const Header = () => (
  <HeaderBox>
    <Container>
      <NavLink to="/">HowToCards</NavLink>
      <SearchBox>
        <SearchBar />
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
    <Menu.Context
      as={NavItem}
      trigger={<span>{account.displayName || "Profile"}</span>}
      menu={({ close }) => (
        <>
          <Menu.Item as={Link} to={`/user/${account.id}`} onClick={close}>
            Profile: {account.email}
          </Menu.Item>
          <Menu.Item as={Link} to="/settings" onClick={close}>
            Settings
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item as={Link} to="/logout">
            Logout
          </Menu.Item>
        </>
      )}
    />
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

const themeEmoji = (theme) => {
  switch (theme) {
    case "dark":
      return "🌚"

    case "light":
      return "🌝"

    case "auto":
    default:
      return "🌗"
  }
}

const ToggleThemeButton = () => {
  const { theme, toggle } = useTheme()

  return <NavItem onClick={toggle}>{themeEmoji(theme)}</NavItem>
}

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
