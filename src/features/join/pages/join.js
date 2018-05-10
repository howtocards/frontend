import React from 'react'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, Button, Link } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'


const LoginForm = () => (
  <form>
    <Col gap="1rem">
      <H2>Welcome to HowToCards</H2>
      <Input type="email" name="email" autoComplete="email" placeholder="Email" />
      <Input type="password" name="password" autoComplete="password" placeholder="Password" />
      <Button.Primary type="submit">Continue</Button.Primary>
    </Col>
  </form>
)

export const JoinPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
        <Card>
          <LoginForm />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>{'Don\'t have account? '}</span>
          <Link to="/join/registration">Register</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

