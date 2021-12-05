import { createGlobalStyle } from 'styled-components';
import verveine from './Verveine-W01-Regular.woff';
import opensans from './OpenSans-B9K8.woff';
import opensansbold from './OpenSansBold-8wJJ.woff';
import arvo from './Arvo-Regular.woff';
import arvobold from './Arvo-Bold.woff';
import arciform from './Arciform.woff';

const FontStyle = createGlobalStyle`
@font-face {
    font-family: 'verveine';
    src: url(${verveine}) format('woff');
}
@font-face {
    font-family: 'arciform';
    src: url(${arciform}) format('woff');
}
@font-face {
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
}`;

export default FontStyle;
