import { createGlobalStyle } from "styled-components"
import { staticLight } from "@howtocards/ui/themes/light"
import { staticDark } from "@howtocards/ui/themes/dark"

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Alegreya Sans", "Open Sans", sans-serif;
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  :root {
    ${staticLight}
  }

  html.theme-dark {
    ${staticDark}
  }

  #root {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    height: 100vh;
    overflow: hidden;
  }

  tt,
  code,
  kbd,
  samp,
  listing {
    font-family: hasklig, Hack, "Fira Code", "Source Code Pro", monaco, menlo,
      consolas, monospace;
    font-variant-ligatures: contextual;
  }
`
