import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root { font-family: 'DM Sans', sans-serif; color: #17211a; background: #f7f8f5; font-synthesis: none; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: #f7f8f5; }
  button, input, select { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  h1, h2, h3, p { margin-top: 0; }
  h1, h2, h3 { font-family: 'Manrope', sans-serif; }
  ::selection { background: #d8ebc9; }
`;

export default GlobalStyles;
