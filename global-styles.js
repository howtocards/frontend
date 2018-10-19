import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'


/* eslint-disable no-unused-expressions */
injectGlobal`
  ${styledNormalize}

  html,
  body {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`
/* eslint-enable */
