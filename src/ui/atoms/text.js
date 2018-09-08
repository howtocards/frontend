import styled from 'styled-components'


export const Text = styled.p`
  color: ${({ theme }) => theme.palette.primary.initial.background};
  font-size: ${({ size }) => size || '1.4rem'};
`
