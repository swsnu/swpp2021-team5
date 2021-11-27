import { createGlobalStyle } from 'styled-components';
// import twostick from './twostick.woff';
// import noovo from './Noovo ITC Std Light.woff2';
import verveine from './Verveine-W01-Regular.woff';
<<<<<<< HEAD
=======
import opensans from './OpenSans-B9K8.woff';
import opensansbold from './OpenSansBold-8wJJ.woff';
import arvo from './Arvo-Regular.woff';
import arvobold from './Arvo-Bold.woff';
>>>>>>> 6182de8d9430e3c854a009749daad57f4d8e55d4
import arciform from './Arciform.woff';

const FontStyle = createGlobalStyle`
@font-face {
    font-family: 'verveine';
    src: url(${verveine}) format('woff');
}
@font-face {
<<<<<<< HEAD
    font-family: 'arciform';
    src: url(${arciform}) format('woff');
}`;
=======
    font-family: 'opensans';
    src: url(${opensans}) format('woff');
}
@font-face {
    font-family: 'opensansbold';
    src: url(${opensansbold}) format('woff');
}
@font-face {
    font-family: 'arvo';
    src: url(${arvo}) format('woff');
}
@font-face {
    font-family: 'arvobold';
    src: url(${arvobold}) format('woff');
}
@font-face {
    font-family: 'arciform';
    src: url(${arciform}) format('woff');
}
`;
>>>>>>> 6182de8d9430e3c854a009749daad57f4d8e55d4

export default FontStyle;
