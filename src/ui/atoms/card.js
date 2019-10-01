import styled from "styled-components"

export const Card = styled.div`
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: 0 0.6rem 1rem rgba(36, 37, 38, 0.08);

  ${({ theme }) => theme.embed.card}
`

export const CardSticky = styled(Card)`
  position: sticky;
  top: 2rem;
  box-shadow: 0 0.2rem 0.4rem rgba(36, 37, 38, 0.08);
`

export const CardNarrow = styled(Card)`
  padding: 0;
`
