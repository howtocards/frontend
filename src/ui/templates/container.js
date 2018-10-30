import styled from 'styled-components'
import { mixins, WithTag } from '@lib/styled-components-layout'


export const Container = styled(WithTag)`
  ${mixins}

  max-width: 120rem;
  width: 100%;
  display: inherit;
  flex: inherit;
  flex-flow: inherit;
  flex-direction: inherit;
`
