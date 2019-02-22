import React from "react"
import PropTypes from "prop-types"
import { fetchStatus } from "symbiote-fetching"
import { compose, withPropsOnChange, branch, renderComponent } from "recompose"
import { connect } from "react-redux"
import { Col, Row } from "@lib/styled-components-layout"
import { Button, Input, H1, H3 } from "@ui/atoms"

import * as commonSelectors from "@features/common"
import { UsersCommonTemplate } from "../templates/common"
import * as selectors from "../selectors"
import { updateUserInfo } from "../effects"
import { LoadingView } from "../organisms/loading"
import { ErrorView } from "../organisms/error"

const mapStateToProps = (state, props) => ({
  user: commonSelectors.accountUserSelector(state),
  fetching: commonSelectors.accountFetchingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (body) => dispatch(updateUserInfo, body),
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  branch((props) => isLoading(props.fetching), renderComponent(LoadingView)),
  branch((props) => isFailed(props.fetching), renderComponent(ErrorView)),
)

export const SettingsView = ({ user }) => (
  <UsersCommonTemplate>
    <H1>User settings</H1>
    <H3>Update user info</H3>
    <Row>
      <Input
        type="text"
        placeholder="Display name"
        value={user.displayName || ""}
        onChange={() => {}}
      />
    </Row>
    <Row>
      <Button>update</Button>
    </Row>
    <H3>Change email</H3>
    <Row>
      <Input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={() => {}}
      />
    </Row>
    <Row>
      <Button>change</Button>
    </Row>
    <H3>Set new password</H3>
    <Row>
      <Input
        type="password"
        placeholder="Current password"
        value="password"
        onChange={() => {}}
      />
    </Row>
    <Row>
      <Input
        type="password"
        placeholder="New password"
        value="password"
        onChange={() => {}}
      />
    </Row>
    <Row>
      <Input
        type="password"
        placeholder="Confirm new password"
        onChange={() => {}}
        value="password"
      />
    </Row>
    <Row>
      <Button>set</Button>
    </Row>
  </UsersCommonTemplate>
)
SettingsView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
}

export const SettingsPage = enhance(SettingsView)

const isLoading = (fetching) =>
  [fetchStatus.loading, fetchStatus.initial].includes(fetching.status)

const isFailed = (fetching) => fetching.status === fetchStatus.failed
