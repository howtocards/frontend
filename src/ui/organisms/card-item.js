import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Card, H3, Text } from 'ui/atoms'


const CardBox = styled.a`
  margin: 1.5rem 0.5rem;
  width: 290px;
  height: 270px;
  text-decoration: none;
`

const NavLink = CardBox.withComponent(Link)

export const CardItem = ({ id, title, author_id: authorId, created, content }) => (
  <NavLink to={`/cards/${id}`}>
    <Card>
      <H3>title: {title}</H3>
      <H3>author_id: {authorId}</H3>
      <Text>time: {format(new Date(created), 'HH:MM MM/DD/YYYY')}</Text>
      <Text>content: {content}</Text>
    </Card>
  </NavLink>
)
