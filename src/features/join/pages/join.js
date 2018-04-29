import React from 'react'
import styled from 'styled-components'

import { Col, Row } from 'styled-components-layout'
import { Container } from 'ui/templates'
import { Card, Input, H2, H3, Button } from 'ui/atoms'


export const JoinPage = () => (
  <Container justify="center" padding="2rem 0 2rem 0">
    <Col align="center" width="40rem">
      <Card>
        <Col gap="1rem">
          <H2>Welcome to HowToCards</H2>
          <H3>Find and save solution</H3>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button.Primary type="submit">Continue</Button.Primary>
        </Col>
      </Card>
    </Col>
  </Container>
)

