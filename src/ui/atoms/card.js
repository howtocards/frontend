import styled from 'styled-components'


export const Card = styled.div`
  display: flex;
  flex-flow: column;
  border: 1px solid;
  border-radius: 4px;
  padding: 1rem;

  ${({ theme }) => theme.embed.card}
`.extend.withConfig({ componentId: 'Card' })``
