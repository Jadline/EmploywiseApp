import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        font-size: 62.5%;
    }
    
    body {
        min-height: 100vh;
        width: 100%;
        font-family: 'Nunito Sans', sans-serif;
        background-color: #F2E6E6;
        color: #000;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
`;
