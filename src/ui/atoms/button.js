import styled, { css } from "styled-components"

export const Button = styled.button`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: box-shadow 120ms;
  user-select: none;

  &:hover {
    background: #3a7bd5;
    color: white;
  }

  ${({ small }) =>
    small &&
    css`
      padding: 0.5rem;
      font-size: 1rem;
    `}


  ${({ theme }) => theme.embed.button.primary}
  ${({ grow }) =>
    grow &&
    css`
      flex-grow: 1;
    `}

  &:disabled {
    cursor: default;
  }
`

export const ButtonPrimary = styled(Button)`
  ${({ theme }) => css`
    border: none
    background-color: ${theme.palette.primary.initial.background};
    color: ${theme.palette.primary.initial.color};

    background-image: linear-gradient(to right, #00d2ff, #3a7bd5);

    &:hover {
      background-image: linear-gradient(to right, #00d2ff, #3a7bd5);
    }

    &:disabled {
      background-color: gray !important;
      background-image: none !important;
    }
  `}
`

export const ZeroButton = styled.button`
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`

export const ZeroTab = styled(ZeroButton)`
  &:hover {
    color: ${({ theme }) => theme.palette.primary.initial.background};
  }
`
