import styled, { css } from "styled-components"

export const Button = styled.button`
  border-radius: 4px;
  border: 1px solid var(--bw50);
  color: var(--bw85);
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.4rem;
  outline: none;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 120ms, color 120ms, border-color;
  user-select: none;

  &:hover {
    background: var(--primary);
    color: var(--primary-text);
    border-color: var(--primary);
  }

  ${({ small }) =>
    small &&
    css`
      padding: 0.5rem;
      font-size: 1rem;
      line-height: 1rem;
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
  background-color: var(--primary);
  color: var(--primary-text);
  border-color: var(--primary);

  &:disabled {
    background-color: var(--bw50);
    color: var(--bw20);
    border-color: var(--borders);
  }

  &:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
    color: var(--primary-hover-text);
  }
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
    color: var(--primary);
  }

  ${(p) =>
    p.active &&
    css`
      text-decoration: underline;
    `}
`
