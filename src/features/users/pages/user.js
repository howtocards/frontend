// @flow
import * as React from "react"
import PropTypes from "prop-types"
import { useStore } from "effector-react"

import { Col, Row } from "@lib/styled-components-layout"
import { H3, H1, ZeroTab, Button, Link } from "@howtocards/ui"
import { CardsList, CardItem } from "@features/cards"

import { UsersCommonTemplate } from "../templates/common"
import { LoadingView } from "../organisms/loading"
import { ErrorView } from "../organisms/error"
import {
  $user,
  $cards,
  pageMounted,
  $isLoading,
  $isFailed,
  $error,
} from "../model/current"

type Props = {
  match: {
    params: {
      userId: string,
    },
  },
}

export const UserPage = ({ match }: Props) => {
  const [filterBy, setFilter] = React.useState("all")

  const userId = parseInt(match.params.userId, 10)
  const user = useStore($user)
  const { created, useful } = useStore($cards)
  const isLoading = useStore($isLoading)
  const isFailed = useStore($isFailed)
  const error = useStore($error)

  React.useEffect(() => {
    pageMounted({ userId })
  }, [userId])

  if (isLoading) return <LoadingView />
  if (isFailed)
    return <ErrorView error={error || "Cannot load. Please, try again later"} />

  const renderFiltered = (filter) => {
    switch (filter) {
      case "useful":
        return (
          <NamedCardsList
            title={`Useful cards for ${displayName(user)}`}
            cards={useful}
            renderEmpty={() => (
              <>
                <Row>
                  <H3>No useful cards for you?</H3>
                </Row>
                <Row>
                  <Button as={Link} to="/">
                    Search useful cards
                  </Button>
                </Row>
              </>
            )}
          />
        )
      case "my":
      default:
        return (
          <NamedCardsList
            title={`Cards created by ${displayName(user)}`}
            cards={created}
            renderEmpty={() => (
              <>
                <Row>
                  <H3>You don&apos;t have cards yet</H3>
                </Row>
                <Row>
                  <Button as={Link} to="/new/card">
                    Create new card
                  </Button>
                </Row>
              </>
            )}
          />
        )
    }
  }

  return (
    <UsersCommonTemplate sidebar={<UserInfo user={user} />}>
      <ZeroTab
        onClick={() => {
          setFilter("my")
        }}
      >
        My cards
      </ZeroTab>
      |
      <ZeroTab
        onClick={() => {
          setFilter("useful")
        }}
      >
        Favorite
      </ZeroTab>
      {renderFiltered(filterBy)}
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

const NamedCardsList = ({ cards, title, renderEmpty = () => null }) => {
  if (cards && cards.length !== 0) {
    return (
      <>
        <H1>{title}</H1>
        <CardsList
          ids={cards}
          renderCard={({ card, onUsefulClick }) =>
            React.createElement(CardItem, {
              card,
              key: card.id,
              onUsefulClick,
            })
          }
        />
      </>
    )
  }
  return <Col padding="2rem">{renderEmpty()}</Col>
}

NamedCardsList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  renderEmpty: PropTypes.func,
}

NamedCardsList.defaultProps = {
  renderEmpty: () => null,
}
