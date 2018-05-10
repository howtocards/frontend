import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Col, Row } from 'styled-components-layout'
import { Container, CenterContentTemplate } from 'ui/templates'
import { Card, Input, H2, H3, Button } from 'ui/atoms'


const FooterBlock = styled.footer`
  display: flex;
  flex-flow: row;
  border-top: 1px solid ${({ theme }) => theme.palette.decoration.borders};
  padding: 2rem 0;
  width: 100%;
  justify-content: center;
`

const PrimitiveFooter = () => (
  <FooterBlock>
    To &nbsp;<Link to="/">home</Link>
  </FooterBlock>
)


export const JoinPage = () => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
        <Card>
          <Col gap="1rem">
            <H2>Welcome to HowToCards</H2>
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Button.Primary type="submit">Continue</Button.Primary>
          </Col>
        </Card>
      </Col>
    </Container>
  </CenterContentTemplate>
)

