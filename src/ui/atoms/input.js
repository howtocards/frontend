import React from 'react'
import styled from 'styled-components'


export const Input = styled.input`
  border: 1px solid;
  border-radius: 4px;
  position: relative;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  background-color: white;
  transition: box-shadow 120ms, border-color 120ms;
  ${({ theme }) => theme.embed.card}

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.initial.background};
    border-color: ${({ theme }) => theme.palette.primary.initial.background};
  }

  &::placeholder {
    color: currentColor;
    font-style: italic;
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.palette.decoration.borders};
  }
`
