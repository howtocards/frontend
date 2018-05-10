import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'


export const Button = styled.button`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: box-shadow 120ms, background-image 120ms;
  user-select: none;

  ${({ theme }) => theme.embed.button.primary}
`

Button.Primary = styled(Button)`
  ${({ theme }) => css`
    border: none
    background-color: ${theme.palette.primary.initial.background};
    color: ${theme.palette.primary.initial.color};

    background-image: linear-gradient(to right, #00d2ff, #3a7bd5);

    &:hover {
      color: ${theme.palette.primary.hover.color};
    }

    &:focus {
      background: linear-gradient(to right, #00d2ff, #00d2ff);
    }
  `}
`
