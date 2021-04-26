import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  #root,body,html {
    /* width:100%; */
    height:100%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
export default GlobalStyle;
