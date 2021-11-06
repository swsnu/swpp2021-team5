import { createGlobalStyle } from 'styled-components';
import twostick from './twostick.woff';
// import noovo from './Noovo ITC Std Light.woff2';

export default createGlobalStyle`
@font-face {
    font-family: 'twostick';
    src: local('twostick');
    url(${twostick}) format('woff');
    font-weight: 300;
    font-style: normal;
`;
