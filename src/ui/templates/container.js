import styled from 'styled-components'


export const Container = styled.div`
  max-width: 120rem;
  width: 100%;
  display: inherit;
  flex: inherit;
  flex-flow: inherit;
  flex-direction: inherit;

  ${(p) => p['align-items'] && `align-items: ${p['align-items']};`}
  ${(p) => p['justify-content'] && `justify-content: ${p['justify-content']};`}
  ${(p) => p['align-content'] && `align-content: ${p['align-content']};`}
  ${(p) => p.padding && `padding: ${p.padding};`}
`
