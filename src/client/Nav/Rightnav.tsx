import React from "react";
import styled from "styled-components";
import theme from '../Theme'

type ChildProps={
    scrollPageFunc:Function;
    scrollPageD:Function;
    scrollPageC:Function;
    $open:boolean;
}

type Props={
    $open:boolean;

}
const Ul=styled.ul<Props>`

    list-style:none;
    display:flex;
    flex-flow: row nowrap;
    z-index:22;

    li{
    padding:18px 20px; 
    font-size:${theme.fontxs};
    @media ${theme.device.laptop} {
        font-size:${theme.fontmd};
    
      } 
    font-family:${theme.logoFontFamily}; 
    font-weight:600;
    color:${theme.bodyDarkBlue};

}


    @media ${theme.device.tablet}{
        // display:none;
        flex-flow:column nowrap;
        background-color:${theme.bodyDarkBlue};
        position:fixed;
        transform:${(props)=>props.$open ? 'translateX(0)' : 'translateX(100%)'};
        top:0;
        right:0;
        height:100vh;
        width:300px;
        padding-top:3.5rem;
        transition: transform 0.3s ease-in-out;
        margin-top:0px; 
        li{
            color:${theme.body};
            
        }
        


    }



`



export default function RightNav(props:ChildProps){
    return (

        <div>
            <Ul $open={props.$open}>

<li onClick={()=>props.scrollPageFunc()}>VIDEOS</li>
<li onClick={()=>props.scrollPageD()}>DESIGNS</li>
<li onClick={()=>props.scrollPageC()}>CONTACT</li>


</Ul>

        </div>
    )
}