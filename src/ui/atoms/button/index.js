import styled, { css } from "styled-components"

export const Button = styled.button`
  border-radius: 4px;
  border: 2px solid var(--borders);
  color: var(--bw85);
  background-color: var(--borders);
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.4rem;
  outline: none;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 120ms, color 120ms, border-color 120ms;
  user-select: none;

  &:hover {
    background-color: var(--primary);
    color: var(--primary-text);
    border-color: var(--primary);
  }

  &:disabled, &:disabled:hover, &:disabled:focus, &:disabled:active {
    background-color: var(--canvas);
    border-color: var(--canvas);
    color: var(--bw40);
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
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.4rem;
  outline: none;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 120ms, color 120ms, border-color 120ms;

  &:hover,
  &:focus {
    background-color: var(--bw20);
    border-color: var(--bw20);
  }

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
