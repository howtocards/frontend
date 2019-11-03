import * as React from "react"
import styled, { css } from "styled-components"

// TODO remove layout
import { Col } from "@lib/styled-components-layout"

type InputProps = {
  autoComplete?: string
  disabled?: boolean
  error?: string
  label?: string
  name?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  value: string
}

/**
 * Required: `value`
 */
export const Input = ({
  autoComplete,
  disabled = false,
  error,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
}: InputProps) => (
  <Col>
    {label && <InputLabel>{label}</InputLabel>}
    <InputNative
      autoComplete={autoComplete}
      disabled={disabled}
      error={Boolean(error)}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    <ErrorLabel>{error}</ErrorLabel>
  </Col>
)

type InputNativeProps = {
  error?: boolean
}

const InputNative = styled.input<InputNativeProps>`
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
  color: var(--card-text);
  background-color: var(--card);
  border-color: var(--borders);
  box-shadow: 0 0 0 1px var(--borders);

  &:focus {
    box-shadow: 0 0 0 1px var(--primary);
    border-color: var(--primary);
  }

  &:disabled {
    background-color: var(--borders);
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
