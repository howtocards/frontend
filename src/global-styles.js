import { createGlobalStyle } from "styled-components"
import { bubbleTheme } from "./bubble-theme"

export const GlobalStyles = createGlobalStyle`
  ${bubbleTheme};
  html {
    font-size: 10px;
  }

  body {
    font-size: 1.4rem;
    font-family: "Alegreya Sans", "Open Sans", sans-serif;
    margin: 0;
    height: 100vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
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
