import React, {useState } from "react";
import styled from "styled-components";
import RightNav from "./Rightnav";
import theme from '../Theme'

type Props={
    $open:boolean;
}



const StyledBurger= styled.div<Props>`
width:2rem;
height:2rem;
position:fixed;
top:15px;
right:20px;
z-index:50;
display:none;

@media ${theme.device.tablet}{

    display:flex;
    justify-content:space-around;
    flex-flow:column nowrap;
}


div{
    width:2rem;
    height:0.25rem;
    background-color:${(props)=>props.$open ? '#ccc' : "white"};
    border-radius:10px;
    transform-origin:1px;
    transition:all 0.3s linear;
    
    &:nth-child(1){
        transform:${(props)=>props.$open ? 'rotate(45deg)' :'rotate(0)'};
    }

    &:nth-child(2){
        transform:${(props)=>props.$open ? 'translateX(100%)' :'translateX(0)'};
        opacity:${(props)=>props.$open ? 0 : 1}
    }

    &:nth-child(3){
        transform:${(props)=>props.$open ? 'rotate(-45deg)' :'rotate(0)'};
    }
};
`
type ChildProps={
    scrollPageFunc:Function;
    scrollPageD:Function;
    scrollPageC:Function;
}

export default function Burger(props:ChildProps){
    const [open, setOpen]=useState<boolean>(false)

    return(
        <>
        
        <StyledBurger $open={open} onClick={()=>setOpen(!open)}>
            <div />
            <div />
            <div />
            
        </StyledBurger>
        <RightNav 
        scrollPageFunc={props.scrollPageFunc}
        scrollPageD={props.scrollPageD}
        scrollPageC={props.scrollPageC}
         $open={open}/>
        </>
    )
}