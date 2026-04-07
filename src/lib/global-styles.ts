import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
    padding: 0;
    margin:    0;
  }

  body{
    font-family: Montserrat, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Montserrat, sans-serif;
  }

  .inset{
    inset: 0;
  }
`;
