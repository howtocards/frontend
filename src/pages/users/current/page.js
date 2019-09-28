// @flow
import * as React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"
import styled from "styled-components"

import { Col, Row } from "@lib/styled-components-layout"
import { Button, H1, H3, Link, ZeroTab } from "@howtocards/ui"
import { SkeletonList } from "@features/cards"

import { ErrorView, UsersCommonTemplate } from "@features/users"
import {
  $cards,
  $error,
  $isFailed,
  $isLoading,
  $user,
  pageMounted,
} from "./model"

type Props = {
  match: {
    params: {
      userId: string,
    },
  },
}

export const UserPage = ({ match }: Props) => {
  const [tab, setTab] = React.useState<"created" | "useful">("useful")
  const userId = parseInt(match.params.userId, 10)

  const user = useStore($user)
  const { created, useful } = useStore($cards)
  const isLoading = useStore($isLoading)
  const isFailed = useStore($isFailed)
  const error = useStore($error)

  React.useEffect(() => {
    pageMounted({ userId })
  }, [userId])

  if (isFailed)
    return <ErrorView error={error || "Cannot load. Please, try again later"} />

  return (
    <UsersCommonTemplate sidebar={<UserInfo user={user} />}>
      <ZeroTab active={tab === "useful"} onClick={() => setTab("useful")}>
        Useful
      </ZeroTab>
      |
      <ZeroTab active={tab === "created"} onClick={() => setTab("created")}>
        My cards
      </ZeroTab>
      <NamedCardsList
        show={tab === "useful"}
        title={`Useful cards for ${displayName(user)}`}
        cards={useful}
        isLoading={isLoading}
        renderEmpty={() => (
          <Col>
            <Row>
              <H3>No useful cards?</H3>
            </Row>
            <Row>
              <Button as={Link} to="/">
                Search useful cards
              </Button>
            </Row>
          </Col>
        )}
      />
      <NamedCardsList
        show={tab === "created"}
        title={`Cards created by ${displayName(user)}`}
        cards={created}
        isLoading={isLoading}
        renderEmpty={() => (
          <>
            <Row>
              <H3>No created cards yet</H3>
            </Row>
            <Row>
              <Button as={Link} to="/new/card">
                Create new card
              </Button>
            </Row>
          </>
        )}
      />
    </UsersCommonTemplate>
  )
}

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const UserInfo = ({ user }) =>
  user ? (
    <Col gap="1rem">
      <Row>
        <H3 narrow>{user.displayName || user.id}</H3>
      </Row>
      <CurrentUserInfo user={user} />
    </Col>
  ) : null

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
}

UserInfo.defaultProps = {
  user: null,
}

const CurrentUserInfo = ({ user }) =>
  user.email ? <Row>You: {user.email}</Row> : null

CurrentUserInfo.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
}

const displayName = (user) => (user && user.displayName) || "user"

const NamedCardsList = ({
  show,
  isLoading,
  cards,
  title,
  renderEmpty = () => null,
}) => {
  return (
    <ListWrapper show={show}>
      <H1>{title}</H1>
      <SkeletonList
        ids={cards}
        isLoading={isLoading}
        renderEmpty={renderEmpty}
      />
    </ListWrapper>
  )
}

NamedCardsList.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  renderEmpty: PropTypes.func,
}

NamedCardsList.defaultProps = {
  renderEmpty: () => null,
}

const ListWrapper = styled.div`
  display: ${(p) => (p.show ? "flex" : "none")};
  flex-direction: column;
`
