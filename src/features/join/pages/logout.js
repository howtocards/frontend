import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose, withHandlers, withState } from "recompose"

import { Col, Row } from "@lib/styled-components-layout"
import { accountReset } from "@features/common"

import { Card, ButtonPrimary, Button } from "@howtocards/ui/atoms"
import { PrimitiveFooter } from "@howtocards/ui/organisms"
import { Container, CenterContentTemplate } from "@howtocards/ui/templates"

const TIMEOUT_RESET = 500
const TIMEOUT_REDIRECT = 150

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(accountReset),
})

const enhance = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withState("isLogouting", "setLogouting", false),
  withHandlers({
    onLogout: ({ history, setLogouting, onReset }) => () => {
      setLogouting(true)

      setTimeout(() => {
        onReset()
        setTimeout(() => history.push("/"), TIMEOUT_REDIRECT)
      }, TIMEOUT_RESET)
    },
    onBack: ({ history }) => () => {
      history.goBack()
    },
  }),
)

export const LogoutView = ({ onLogout, onBack, isLogouting }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="stretch" width="40rem">
        <Card>
          <Row padding="0 0 2rem 0">Stop session?</Row>
          <Row gap="1rem">
            <ButtonPrimary grow disabled={isLogouting} onClick={onLogout}>
              {isLogouting ? "Logging out…" : "Logout"}
            </ButtonPrimary>
            <Button disabled={isLogouting} onClick={onBack}>
              Back
            </Button>
          </Row>
        </Card>
      </Col>
    </Container>
  </CenterContentTemplate>
)

LogoutView.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  isLogouting: PropTypes.bool.isRequired,
}

export const LogoutPage = enhance(LogoutView)
