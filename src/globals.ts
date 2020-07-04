import { createGlobalStyle } from 'styled-components';

export const Globals = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  body,
  html {
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
    font-family: var(--primary-font);
    font-weight: 400;
    height: 100vh;
    line-height: 1.4;
    margin: 0;
    width: 100vw;
    box-sizing: border-box;
  }

  input {
    border: 0;
    background-color: transparent;
    outline: none;

    &[type="text"] {
      font-weight: 300;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  #root {
    height: 100vh;
  }
`;
