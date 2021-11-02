import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${normalize}
html,
body{
    overflow: hidden;
    width: 100%;
}
*{
    border: none;
    outline: none;
    list-style: none;
}
button{
    cursor: pointer;
}
img{
    width: 100vw;
}
`;

export default GlobalStyle;