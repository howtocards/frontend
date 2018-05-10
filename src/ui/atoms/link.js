import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'


export const Link = styled(RouterLink)`
  text-decoration: none;

  color: ${({ theme }) => theme.palette.primary.initial.background};

  &:hover {
    text-decoration: underline;
  }
`
