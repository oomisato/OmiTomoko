import "@fontsource/spartan"
import "@fontsource/spartan/variable.css"
import 'styled-components'
import {css} from "styled-components"
import "@fontsource/baskervville"


const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }
const theme={
    body:'#f0df48',
    bodyBlue:"#07B3B3",
    bodyMiddleBlue:"#40E0D0",
    bodyDarkBlue:"#006770",
    bodyDarkYellow:"#ffc64a",
    bodyfade:'#FFFF99',
    text: '#fff',
    bodyRgba: '255,255,255',
    textRgba: '32,32,32',

    fontxs :'0.75em',
    fontsm : '0.875em',
    fontmd : '1em',
    fontlg: '1.25em',
    fontxl: '2em',
    fontxxl:'3em',
    fontxxxl: '5em',
    fontBig: '8em',

    navHeight: '5rem',
    logoFontFamily:"Spartan, sans-serif",
    textFontFamily:"Baskervville",
device:{
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
},


}





export default theme  ; export {size};