import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'

import { Col, Row } from 'styled-components-layout'
import { Card, Button } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'

import { accountReset } from 'features/account'


const RESET_TIMEOUT = 500

const enhance = compose(
  connect(),
  withState('isLogouting', 'setLogouting', false),
  withHandlers({
    logout: ({ dispatch, history, setLogouting }) => () => {
      setLogouting(true)

      setTimeout(() => {
        dispatch(accountReset())
        setTimeout(() => history.push('/'), 150)
      }, RESET_TIMEOUT)
    },
    back: ({ history }) => () => {
      history.goBack()
    },
  }),
)

export const LogoutView = ({ logout, back, isLogouting }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
        <Card>
          <Row padding="0 0 2rem 0">
            Stop session?
          </Row>
          <Row gap="1rem">
            <Button.Primary
              grow
              disabled={isLogouting}
              onClick={logout}
            >
              {isLogouting ? 'Logging out…' : 'Logout'}
            </Button.Primary>
            <Button disabled={isLogouting} onClick={back}>Back</Button>
          </Row>
        </Card>
      </Col>
    </Container>
  </CenterContentTemplate>
)

export const LogoutPage = enhance(LogoutView)
