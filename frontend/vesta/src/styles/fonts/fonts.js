import { createGlobalStyle } from 'styled-components';
// import twostick from './twostick.woff';
// import noovo from './Noovo ITC Std Light.woff2';
import verveine from './Verveine-W01-Regular.woff';

const FontStyle = createGlobalStyle`
@font-face {
    font-family: 'verveine';
    src: url(${verveine}) format('woff');
`;

export default FontStyle;
