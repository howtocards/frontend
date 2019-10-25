import styled from "styled-components"
import { WithTag, mixins } from "@lib/styled-components-layout"

export const Container = styled(WithTag)`
  ${mixins}

  max-width: 120rem;
  width: 100%;
  display: inherit;
  flex: inherit;
  flex-flow: inherit;
  flex-direction: inherit;

  @media screen and (max-width: 120rem) {
    padding: 0 1rem;
  }
`
