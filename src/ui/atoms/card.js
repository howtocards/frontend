import styled from 'styled-components'


export const Card = styled.div`
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(36,37,38,0.08);

  ${({ theme }) => theme.embed.card}
`
