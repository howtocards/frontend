import styled from 'styled-components'


export const Card = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;

  ${({ theme }) => theme.embed.card}
`
