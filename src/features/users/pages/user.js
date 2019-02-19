import React from "react"
import PropTypes from "prop-types"
import { fetchStatus } from "symbiote-fetching"
import { compose, withPropsOnChange, branch, renderComponent } from "recompose"
import { connect } from "react-redux"
import { Col, Row } from "@lib/styled-components-layout"
import { H3, H1 } from "@ui/atoms"
import { CardsList, CardItem } from "@features/cards"

import { UsersCommonTemplate } from "../templates/common"
import * as selectors from "../selectors"
import { getUserWithCards } from "../effects"
import { LoadingView } from "../organisms/loading"
import { ErrorView } from "../organisms/error"

const mapStateToProps = (state, props) => ({
  user: selectors.currentUser(state),
  fetching: selectors.userFetching(state),
  useful: selectors.usefulCards(state),
  created: selectors.createdCards(state),
  userId: props.match.params.userId,
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (userId) => dispatch(getUserWithCards, userId),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(
    (props, next) => props.userId !== next.userId,
    (props) => props.fetch(props.userId),
  ),
  branch((props) => isLoading(props.fetching), renderComponent(LoadingView)),
  branch((props) => isFailed(props.fetching), renderComponent(ErrorView)),
)

export const UserView = ({ user, created, useful }) => (
  <UsersCommonTemplate sidebar={<UserInfo user={user} />}>
    <NamedCardsList
      title={`Cards created by ${displayName(user)}`}
      cards={created}
    />
    <NamedCardsList
      title={`Useful cards for ${displayName(user)}`}
      cards={useful}
    />
  </UsersCommonTemplate>
)

UserView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  created: PropTypes.arrayOf(PropTypes.number).isRequired,
  useful: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export const UserPage = enhance(UserView)

const isLoading = (fetching) =>
  [fetchStatus.loading, fetchStatus.initial].includes(fetching.status)

const isFailed = (fetching) => fetching.status === fetchStatus.failed

const UserInfo = ({ user }) => (
  <Col gap="1rem">
    <Row>
      <H3 narrow>{user.displayName || user.id}</H3>
    </Row>
    <CurrentUserInfo user={user} />
  </Col>
)

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
}

const CurrentUserInfo = ({ user }) =>
  user.email ? <Row>You: {user.email}</Row> : null

CurrentUserInfo.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
}

const displayName = (user) => user.displayName || "user"

const NamedCardsList = ({ cards, title }) => {
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
  return null
}
