import React from "react"
import PropTypes from "prop-types"
import { fetchStatus } from "symbiote-fetching"
import { compose, withPropsOnChange, branch, renderComponent } from "recompose"
import { connect } from "react-redux"

import { UsersCommonTemplate } from "../templates/common"
import * as selectors from "../selectors"
import { getUserWithCards } from "../effects"
import { LoadingView } from "../organisms/loading"

const mapStateToProps = (state, props) => ({
  user: selectors.currentUser(state, props),
  fetching: selectors.userFetching(state, props),
  useful: selectors.usefulCards(state, props),
  created: selectors.createdCards(state, props),
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
)

const isLoading = (fetching) =>
  [fetchStatus.loading, fetchStatus.initial].includes(fetching.status)

export const UserView = (props) => (
  <UsersCommonTemplate sidebar={<div>Yep</div>}>Hello</UsersCommonTemplate>
)

export const UserPage = enhance(UserView)
