import styled from 'styled-components'


export const CommonContent = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-y: auto;
  ${({ theme }) => theme.embed.canvas}
`
