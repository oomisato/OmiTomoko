import React, { LegacyRef,useEffect, useRef, useState} from 'react';
import theme from '../Theme';
import styled ,{keyframes} from 'styled-components';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from "gsap";
import {scrollConfig} from "../Scroller/Scroller"
import Asd from '../images/design2.png'
import Bg from '../images/0122.png'


gsap.registerPlugin(ScrollTrigger) 



export const Wrapper=styled.div<any>`
// displey:flex;
// justify-content:flex-start;
// align-items:flex-start;
// flex-wrap: wrap;
 position:absolute;
//  ↓後で復活
   right: 100%;
//   transform: translateX(-50%);

 height:100vh;
   width:100vw;
margin:0;
 padding:0;
 background-color:${theme.body};
 z-index:50;
overflow:hidden;
`


const Title=styled.div`
position:absolute;
font-family:${theme.logoFontFamily};
font-size:${theme.fontBig};
top:20vh;
margin:10px;
left:15vw;

font-weight:600;
mix-blend-mode: hard-light;
color:${theme.bodyDarkBlue};
@media ${theme.device.mobileS}{
    font-size:${theme.fontsm};
    top:90vh;
    left:120vw;


};
@media ${theme.device.tablet} { 
    font-size:${theme.fontxxl};
    top:90vh;

};



z-index:201;
line-height: 0.5;



`
const Left=styled.div<any>`
position:relative;
top:-20vh;
padding-top:20vh;
left:5vw;
width: 250px;
height:100vh;
--heightA:20vh;
--navHeight:80px;
--navImgHeight:calc(var(--heightA)+var(--navHeight))

    @media ${theme.device.mobileS} {
        // margin-top:calc(-1 * var(--navHeight));
        position:absolute;
        margin:0;
        padding-top: var(--navHeight);
        top:-30px;
        left:0;
        height:calc(100vh- var(--navImgHeight));
        width: 100vw;
        background-color:${theme.body};

    };
    @media ${theme.device.tablet} {
        // margin-top:calc(-1 * var(--navHeight));
        position:absolute;
        margin:0;
        padding-top: var(--navHeight);
        top:-30px;
        left:0;
        height:calc(100vh- var(--navImgHeight));
        width: 100vw;
        };
z-index:200;
// justify-content:center;
// align-items:center;
background-color:${theme.body};

p{
margin:0;
    padding:2em;
    word-wrap: break-word;
    line-height: 1.5;
    font-size:${theme.fontsm};
        @media ${theme.device.tablet} { 
            font-size:${theme.fontxs};
            padding:0.5em;
            display: flex;
            flex-direction:column;
            line-clamp: 3;
            overflow:hidden;
        };
        // @media ${theme.device.mobileS} {
        //       font-size:${theme.fontxs};
          
        //     } 
    }

`

const Right=styled.div`
position:absolute;
margin:0;
padding:0;
bottom:0;
right:0;
width:100%;
height:100vh;
overflow:hidden;
--heightB:80vh;
background-color:${theme.body};
z-index:100;
@media ${theme.device.tablet} {
    height:100vh; 
    
    };
    @media ${theme.device.mobileL} {
        height:100vh; 
    }

`

const rotateBulb=keyframes`
from{
    transform:rotate(0deg);
}
to{transform:rotate(360deg)}`;


const Path=styled.path`
// transform-origin: center;
animation:${rotateBulb} 1s linear infinite;
//transform: translateX(-50%);

`

const Svg=styled.svg`
mask-image :Asd;



position: relative;
left: 50%;
-webkit-transform: translateX(-50%);
-ms-transform: translateX(-50%);
transform: translateX(-50%);

`
interface ChildProps{

    setRef:LegacyRef<HTMLDivElement> | undefined;

}
type DivProps=JSX.IntrinsicElements['div']

export default function Design(){
const wrapRef=useRef<HTMLDivElement|any>(null)
const leftRef=useRef<HTMLDivElement>(null)
const titleRef=useRef<HTMLHeadingElement>(null)
const [japanese,setCountry]=useState<boolean>(true)

useEffect(()=>{

},[setCountry,japanese])
useEffect(()=>{

// ↓後で復活
gsap.to(wrapRef.current,{xPercent:100,
            
            scrollTrigger:{
                ...scrollConfig,
                start:"+=8000",
                end:"+=800",
                scrub:2,

            }
      }
)

        


let mm = gsap.matchMedia();
mm.add({
    isDesktop:`(min-width: 769px)`,
  isTablet: `(max-width: 768px)`,
  isMobileS:`(max-width:320px)`,
}, (context) => {
    let { isDesktop, isTablet, isMobileS,reduceMotion }  = context.conditions as gsap.Conditions;
  gsap.fromTo(leftRef.current,{   
     yPercent: isTablet ? 300 : 100,
     opacity:0,
  },{
 
    yPercent: isDesktop ? 29 : 10,
    opacity:100,
    duration: 0.5, 
    ease:"power2.inOut",
scrollTrigger:{
    ...scrollConfig,
    start:'+=10000',
    end:"+=500",
    scrub:2

 }})   


 gsap.fromTo(titleRef.current,{xPercent: isDesktop ? 200 : 120,},{
    xPercent: 0,
    ease: "power4.out",
scrollTrigger:{
    ...scrollConfig,
    start:'+=9500',
    end:"+=1000",
    scrub:2,
}
}
)


}); 
gsap.to("#Bg",{
    xPercent: -100,
    scrollTrigger:{
        ...scrollConfig,
        start:'+=10500',
        end:"+=30000",
        scrub:2
    }
})

 gsap.to("#scrollImage",{
        xPercent: -200,
        scrollTrigger:{
            ...scrollConfig,
            start:'+=10500',
            end:"+=20000",
            scrub:2
        }
    })


    // ↓後で復活
    
    gsap.fromTo("#circleMask",
        {
            scale:0, 
            rotate:0,
             transformOrigin:"center center"
        }, {
            scale:10,
            rotate:360,
            ease:"Power1.easeOut",

            delay:100,
            duration:50,
            scrollTrigger:{
                         ...scrollConfig,
                         start:'+=8500',
                         end:"+=5000",
                         scrub:4,          
                     }
        }
    );



//     gsap.fromTo(wrapRef.current,{
//         xPercent:0,
//            },{xPercent:-100,
             
//              scrollTrigger:{
//                  ...scrollConfig,
//                  start:"70% top",
//                  end:"100% top",
//                  scrub:3
//              }
//        }
//     )
},[])
    return(<>

<Wrapper ref={wrapRef}  >

    <Title ref={titleRef}>
DESIGNS
    </Title>
    <Left ref={leftRef} id="left" theme="theme">
        
{japanese? <p>　大学でメディアアートを学びそこで初めて3DソフトのMayaを学びました。今はフリーソフトのBlenderに出会ったことを機に勉強を続けています。就職後はミニコミ紙でIllustrator,Photoshopデザインを６年学び、さらにウェブの管理を任されていました。
    当時はHtml、Css、jQuery、WordPressを使っておりました。現在はフリーランスとして大学の冊子の表紙やイラスト、ホームページの制作などを手がけています。ウェブの3D表現にとても興味があり、子供を出産後も毎日勉強を続けています。
</p>:<p>in reaction to restrictions on games in childhood,I'd used to play Japanese horror video games
            while I'm an art student. and  I create my own first human model in Maya. 
            I worked at a newspaper company After graduation. Mini comic paper

</p>
}
<p></p>
    </Left>

    <Right>
   
   <svg id="demo" 
//    style={{transform:"translate(calc(100vw - 50%), calc(100vh - 50%))"}}
   height="100%" 
//    width="100%"
   viewBox="0 0 900 400"
//    preserveAspectRatio="xMaxYMax slice"
    
preserveAspectRatio="none"
>
     <defs>
       <clipPath id="theMask" style={{transform:"translateY(50%)"}}>
         <path  id="circleMask" 
         cx="250.236" cy="255.232"
         r="16.169" 
        fill={`${theme.body}`}
          d="M206.522,482.872C128.129,476.943 120.734,479.551 68.692,448.589C16.65,417.627 8.296,339.168 32.671,292.395C57.045,245.623 55.793,221.311 49.205,175.198C42.617,129.085 80.82,73.02 110.91,64.34C162.042,49.591 199.811,52.556 234.067,42.674C268.322,32.793 296.113,18.445 344.862,24.374C393.61,30.303 475.712,41.937 482.543,144.928C486.801,209.124 483.668,279.641 480.592,300.853C471.841,361.201 512.373,383.898 432.004,443.845C383.235,480.222 341.641,493.944 309.362,490.65C277.082,487.356 284.914,488.801 206.522,482.872Z" />
       </clipPath>
      
     </defs> 
     <g  clipPath="url(#theMask)" >
     <image id="Bg" href={Bg} style={{ position:"absolute",  width:"200%",right: 0,zIndex:100}} />
     </g>
     <g  clipPath="url(#theMask)" 
    //   transform="translate(100,2.5) rotate(10)"
      > 
    
    
       
          <image id="scrollImage" href={Asd} y="70" height="400"
        style={{ backgroundColor:"red"}}
        />
     </g>
   </svg>
       </Right>  



        </Wrapper>


        </>
    )
}


// export default Design