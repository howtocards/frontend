import styled from "styled-components"

export const RichEditorStyle = styled.div`
  ${({ theme }) => theme.prismcss};
  border: 1px solid ${(p) => p.theme.palette.decoration.borders};
  border-radius: 4px;
  padding: 2rem;
  box-sizing: border-box;
`
