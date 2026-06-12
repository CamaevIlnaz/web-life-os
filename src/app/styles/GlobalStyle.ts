import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.page};
    font-family:
      Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-size: 14px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  h1,
  h2,
  p {
    margin-top: 0;
  }

  h1 {
    max-width: 780px;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.heading};
    font-size: 26px;
    line-height: 1.15;
    letter-spacing: 0;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 20px;
  }
`;
