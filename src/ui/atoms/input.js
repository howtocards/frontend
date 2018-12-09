import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

// TODO remove layout
import { Col } from "@lib/styled-components-layout"

const InputNative = styled.input`
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
  ${(p) => p.theme.embed.card}
  box-shadow: 0 0 0 1px ${(p) => p.theme.palette.decoration.borders};

  &:focus {
    box-shadow: 0 0 0 1px ${(p) => p.theme.palette.primary.initial.background};
    border-color: ${(p) => p.theme.palette.primary.initial.background};
  }

  &:disabled {
    background-color: rgba(80, 80, 80, .1);
  }

  ${(p) =>
    p.error &&
    css`
      box-shadow: 0 0 0 1px red;
      border-color: red;
    `}
`

const InputLabel = styled.label`
  color: currentColor;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
`

const ErrorLabel = styled.label`
  display: block;
  font-size: 0.9em;
  color: red;
  margin-top: 0.2rem;
  text-align: left;
`

/**
 * Required: `value`
 */
export const Input = ({
  autoComplete,
  disabled,
  error,
  label,
  name,
  onBlur,
  onChange,
  type,
  value,
}) => (
  <Col>
    {label && <InputLabel>{label}</InputLabel>}
    <InputNative
      autoComplete={autoComplete}
      disabled={disabled}
      error={Boolean(error)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
    />
    <ErrorLabel>{error}</ErrorLabel>
  </Col>
)

Input.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

Input.defaultProps = {
  autoComplete: undefined,
  disabled: false,
  error: undefined,
  label: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  type: "text",
}
