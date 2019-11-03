import styled from "styled-components"

type TextProps = {
  size?: string
}

export const Text = styled.div<TextProps>`
  /* color: ${({ theme }) => theme.palette.primary.initial.background}; */
  font-size: ${({ size }) => size || "1.4rem"};
`
