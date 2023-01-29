import React,{useEffect,useRef,useState} from "react";
import styled from "styled-components";
import { motion ,AnimatePresence} from "framer-motion"
import theme from '../Theme'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) 


const LogoContainer=styled(motion.div)`
position: relative;
top:2rem;
left:2rem;
display: flex;

color:${theme.bodyDarkBlue};
z-index:1;
@media ${theme.device.mobileS} { 
    left:0;

}
@media ${theme.device.laptop} {
    top:1.5rem;
    left:0;

  } 

`



const container={
    hidden:{opacity:0,scale:0},
    visible:{opacity:1,scale:1,
        transition:{
            delayChildren:0.5,
            staggerChildren:0.1,
            

        }
    }
    
}

const items={
    hidden:{y:-20,opasity:0},
    visible:{y:0, opasity:1,}
    
}

const Text=styled(motion.div)`
font-family:${theme.logoFontFamily};
font-size:${theme.fontsm};
margin:0.5rem;
font-weight:600;
@media ${theme.device.tablet} { 
    font-weight:500;

    font-size:${theme.fontxs};
    margin:0.3rem;
    color:white;

};
@media ${theme.device.laptop} {
    font-weight:500;
    font-size:${theme.fontsm};
    // margin-right:0.1rem;
  } 
@media ${theme.device.mobileS} {
    font-weight:500;

    font-size:0.4em;
    margin-right:0.1rem;
    
}
text-transform:uppercase;

`

interface LogoProps{
visible:boolean;
}

export default function Logo({visible}:LogoProps){
// const element=useRoutes([
//     {},{},{}
// ])

const logo=useRef(null);
const titles=['face_4',"T","O","M","K","O"," ","O","U","M","I"]

    return(
    <AnimatePresence>

            {
                visible && (
                <LogoContainer
                    variants={container}
                    initial={"hidden"}
                    animate={"visible"}
                    ref={logo}
                    
                >
                    {titles.map((title,indx)=>(
                    
                                 <Text variants={items}
                                key={indx}
                                 >{title[1] ? <span style={{position:'relative', top:'-1vh'}}className="material-symbols-outlined">
                                 face_4
                                 </span> : title}
                                </Text>



                    ))}
                </LogoContainer>
            )}
                </AnimatePresence>
    )
}

