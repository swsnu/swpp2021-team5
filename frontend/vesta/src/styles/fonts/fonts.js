import { createGlobalStyle } from 'styled-components';
// import twostick from './twostick.woff';
// import noovo from './Noovo ITC Std Light.woff2';
import verveine from './Verveine-W01-Regular.woff';
import arciform from './Arciform.woff';

const FontStyle = createGlobalStyle`
@font-face {
    font-family: 'verveine';
    src: url(${verveine}) format('woff');
}
@font-face {
    font-family: 'arciform';
    src: url(${arciform}) format('woff');
}`;

export default FontStyle;
