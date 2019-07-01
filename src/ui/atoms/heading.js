/* eslint-disable no-magic-numbers */
import styled from "styled-components"
import PropTypes from "prop-types"
import { steps } from "@typographist/styled"

export const H1 = styled.h1`
  ${steps(6)};
  line-height: 4rem;
  margin-top: 6rem;
  margin-bottom: 2rem;
  user-select: none;
`
H1.propTypes = {
  narrow: PropTypes.bool,
}

export const H2 = styled.h2`
  ${steps(5)};
  line-height: 3rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
  user-select: none;
`
H2.propTypes = {
  narrow: PropTypes.bool,
}

export const H3 = styled.h3`
  ${steps(4)};
  line-height: 2rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  user-select: none;
`
H3.propTypes = {
  narrow: PropTypes.bool,
}

export const H4 = styled.h4`
  ${steps(3)};
  line-height: 2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  user-select: none;
`

H4.propTypes = {
  narrow: PropTypes.bool,
}

export const H5 = styled.h4`
  ${steps(2)};
  line-height: 2rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
  user-select: none;
`

H5.propTypes = {
  narrow: PropTypes.bool,
}

export const H6 = styled.h4`
  ${steps(1)};
  line-height: 2rem;
  margin-top: 5rem;
  margin-bottom: 1rem;
  user-select: none;
`
H6.propTypes = {
  narrow: PropTypes.bool,
}
