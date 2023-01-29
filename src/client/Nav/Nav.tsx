import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo"
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styled from "styled-components";
import gsap from "gsap";
import Burger from "./Burger";
import theme from '../Theme';
import { ScrolltoTop } from "../Scroller/Scroller";

gsap.registerPlugin(ScrollTrigger);

const Navmenu=styled.nav`
position:fixed;
z-index:600;
width:100%;
height:70px;
padding:0 20px;
display:flex;
justify-content:space-between;
border-bottom:none;
 @media ${theme.device.tablet} {
  background-color:${theme.bodyDarkBlue};
  // border-bottom:1px solid ${theme.text};

  }
`

type ChildProps={
  scrollPageTop:Function;
  scrollPageFunc:Function;
  scrollPageD:Function;
  scrollPageC:Function;
}
export default function Nav(props:ChildProps){
    const navRef=useRef(null);

    const [visible,enter]=useState(false);
    useEffect(()=>{
        enter(!visible);
        },[])


return(
<>
<Navmenu >
  
  <div ref={navRef} onClick={()=>props.scrollPageTop()}>
<Logo  visible/>
</div>



<Burger scrollPageFunc={props.scrollPageFunc}
scrollPageD={props.scrollPageD}
scrollPageC={props.scrollPageC}/>


</Navmenu>

</>
)
}

