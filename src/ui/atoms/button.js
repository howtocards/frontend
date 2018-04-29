import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'


export const Button = styled.button`
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: box-shadow 120ms;

  ${({ theme }) => theme.embed.button.primary}
`

Button.Primary = styled(Button)`
  ${({ theme }) => css`
    border: none
    background-color: ${theme.palette.primary.initial.background};
    color: ${theme.palette.primary.initial.color};

    &:hover {
      background-color: ${theme.palette.primary.hover.background};
      color: ${theme.palette.primary.hover.color};
    }

    &:focus {
      box-shadow: inset 0 0 0 1px ${theme.palette.decoration.borders}, 0 0 0 3px ${theme.palette.primary.initial.background};
    }
  `}
`
