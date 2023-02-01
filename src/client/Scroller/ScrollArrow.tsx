import React, {FC, useEffect, useRef, useState } from "react";
import styled , {keyframes} from "styled-components";
import { motion ,AnimatePresence, useUnmountEffect,Variants, useInView} from "framer-motion"
import theme from '../Theme'
import gsap from "gsap";
import Scroller, {scrollConfig} from "./Scroller"
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) 


const Bottom=styled(motion.div)`
position:fixed;
bottom:0;
right:0vh;

width:50px;
height:30vh;
z-index:200;
@media ${theme.device.tablet} { 
  right:-2vh;
  bottom:10px;
    };
`

const Text=styled.div`
display:flex;
flex-wrap: wrap;
flex-direction: column;
height:250px;
font-family:${theme.logoFontFamily};
font-size:${theme.fontsm};
margin:0.2rem;
font-weight:900;
@media ${theme.device.tablet} { 
    font-size:${theme.fontxs};
    margin:0.3rem;
      };
text-transform:uppercase;
justify-content: center;

`
const blink=keyframes`
100% {
  opacity: 1;
}
` 
const Div=styled.div`
position:absolute;
top:16px;
left:-5px;
width:35px;
height:35px;
border-radius: 50%;
border: 0.3px solid;
color:${theme.bodyDarkBlue};
p{
  text-transform: lowercase;
  display:inline-block;
  padding:8px 8.5px ;
  margin:0;  
  font-weight:600;
}
@media ${theme.device.tablet} { 
  top:34px;
  left:0px;
  width:30px;
  height:30px;
  p{
    padding:6.5px 7px ;
    margin:0;  
  }
    };
}
`
const Span=styled(motion.div)`
padding:0;
width:60px;
display:block;
// :nth-child(1){
//   -webkit-animation:${blink} 0.5s ease 0.5s 1 forwards;
//   animation:${blink} 0.5s ease 0.5s 1 forwards;
// };
// :nth-child(2){
//   -webkit-animation:${blink} 0.5s ease 1s 1 forwards;
//   animation:${blink} 0.5s ease 1s 1 forwards;
// };
// :nth-child(3) {
//   -webkit-animation: ${blink} 0.5s ease 1.5s 1 forwards;
//   animation: ${blink} 0.5s ease 1.5s 1 forwards;
// }
div{
 color:${theme.bodyDarkBlue};
}
`
const Span2=styled(motion.div)`
display:block;
width:270px;
height:60px;
color:${theme.bodyDarkBlue};
transform:  translateX(-38%) translateY(-190%) rotate(-90deg);
@media ${theme.device.tablet} { 
  transform:  translateX(-37%) translateY(-190%) rotate(-90deg);
}



`

const container = {
    hidden: { opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delayChildren:1,
        staggerChildren: 0.5,



      }
    }
  }
    
  const item :Variants= {
    hidden:{y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition:{
        repeat: Infinity, 
        repeatDelay:1,
      }
    }
  }
  
  interface ArrowType{
    contactRef:any,
    vidRef:any,
    designRef:any,
    scrollintoContact:Function;
    scrollintoTop:Function;
    scrollintoVideo:Function;
    scrollintoDesign:Function;
  }


function ScrollArrow({contactRef,vidRef,designRef,scrollintoContact,scrollintoDesign,scrollintoVideo,scrollintoTop}:ArrowType){

    const isInViewContact=useInView(contactRef) 
const isInViewVideo=useInView(vidRef)
const isInViewDesign=useInView(designRef)

const clickToMove=()=>{
  if(isInViewContact){scrollintoTop()
  }else if(isInViewDesign){scrollintoContact()
  }else if(isInViewVideo){scrollintoDesign() 
  }else {scrollintoVideo()}}

    return(
        <AnimatePresence>
            <Bottom  
            variants={container}
            initial="hidden"
            animate="visible"      
            >
                <Text onClick={()=>clickToMove() }>
                
                  {isInViewContact  ? 
                  <Span2 >CLICK&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;SCROLL&ensp;TO&ensp;TOP</Span2> 
                  :
                  <Span2 >CLICK&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;SCROLL&ensp;TO&ensp;EXPLORE</Span2>
                  }
                  <Div><p>or</p></Div>
                  
                  <Span 
                  variants={item}
                  >
                      <div style={{transform:isInViewContact? "rotate(0deg)": "rotate(180deg)",transition:" all 0.5s ease-out"}}
                        className="material-symbols-outlined">expand_less</div>
                  </Span>
                  <Span 
                  variants={item}
                  >
                      <div  style={{transform:isInViewContact? "rotate(0deg)": "rotate(180deg)",transition:" all 0.5s ease-out"}}
                        className="material-symbols-outlined">expand_less</div>
                  </Span>
                  <Span 
                  variants={item}
                  >
                      <div  style={{transform:isInViewContact? "rotate(0deg)": "rotate(180deg)",transition:" all 0.5s ease-out"}}
                        className="material-symbols-outlined">expand_less</div>
                  </Span>

               
                </Text>
            </Bottom>
            {/* <Bottom2 ref={design}/> */}
        </AnimatePresence>
    )

}



export default  ScrollArrow;