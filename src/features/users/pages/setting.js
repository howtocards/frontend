import React from "react"
import PropTypes from "prop-types"
import { fetchStatus } from "symbiote-fetching"
import { compose, withPropsOnChange, branch, renderComponent } from "recompose"
import { connect } from "react-redux"
import { Col, Row } from "@lib/styled-components-layout"
import { Button, Input, H1, H3 } from "@ui/atoms"

import { UsersCommonTemplate } from "../templates/common"
import * as selectors from "../selectors"
import { getUserWithCards } from "../effects"
import { LoadingView } from "../organisms/loading"
import { ErrorView } from "../organisms/error"

const mapStateToProps = (state, props) => ({
  user: selectors.currentUser(state),
  fetching: selectors.userFetching(state),
  userId: props.match.params.userId,
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (userId, { displayName }) => dispatch(getUserWithCards, userId),
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

export const SettingView = ({ user }) => (
  <UsersCommonTemplate>
    <H1>User settings</H1>
    <H3>Update user info</H3>
    <Row>
      <Input type="text" placeholder="Display name" value={user.displayName} />
    </Row>
    <Row>
      <Button>update</Button>
    </Row>
    <H3>Change email</H3>
    <Row>
      <Input type="text" placeholder="Email" value={user.email} />
    </Row>
    <Row>
      <Button>change</Button>
    </Row>
    <H3>Set new password</H3>
    <Row>
      <Input type="password" placeholder="Current password" />
    </Row>
    <Row>
      <Input type="password" placeholder="New password" />
    </Row>
    <Row>
      <Input type="password" placeholder="Confirm new password" />
    </Row>
    <Row>
      <Button>set</Button>
    </Row>
  </UsersCommonTemplate>
)

SettingView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
}

export const SettingPage = enhance(SettingView)

const isLoading = (fetching) =>
  [fetchStatus.loading, fetchStatus.initial].includes(fetching.status)

const isFailed = (fetching) => fetching.status === fetchStatus.failed
