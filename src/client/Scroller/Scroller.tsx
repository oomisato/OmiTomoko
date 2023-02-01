import styled from "styled-components";
import React, { useRef,useEffect,useState,forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import ScrollArrow from "./ScrollArrow";
import About from "../components/About";
import Contact from "../components/Contact";
import theme from "../Theme";

gsap.registerPlugin(ScrollTrigger)



export const scrollConfig={
    scroller:'.scrollContainer',
    trigger:'.scrollHeight',
    end:'100%',
    scrub:true
}


interface ScrollHProps{
$height:number;
scrollRangeH:number;
multiplier:number;
className: string;
//  ref: any
}

interface contextProps{
    percentage:number
}
type DivProps=JSX.IntrinsicElements['div'];
// percentage:number
    // scrollRangeH:number;
    // progressBar:boolean;
    // progressBarColor:string

interface AnotherProps{
    // scrollRangeH:number;
    // progressBar:boolean;
    // progressBarColor:string;
    // ref:React.Ref<unknown> | undefined
    ref:React.MutableRefObject<HTMLDivElement>
    // React.Ref<HTMLDivElement> | undefined
}
type Anotherref=React.Ref<unknown> | undefined

//↓no.1!!!
// const Scroller=forwardRef<HTMLDivElement,DivProps>((props,ref)=>{
    
// const scrollRangeH=15
// const progressBar=true
// const progressBarColor='linear-gradient(45deg,#e66465, #9198e5)'

//     const scrollContainerRef=useRef()
// const scrollHeightRef=useRef()
// const [percentage, setProgress] = useState<number>(0)

// const scrollCounts=scrollRangeH
// const multiplier=1000
// const setRef=useRef<HTMLDivElement>(null)

// useEffect(()=>{
//     new ScrollTrigger({
//         scroller:scrollContainerRef.current,
//         trigger:scrollContainerRef.current,
//         start:'top top',
//         end:()=>`+=${scrollRangeH*multiplier-window.innerHeight}px`,
//         scrub:true,
//         // markers:true,

//         onUpdate:(self)=>{ setProgress(self.progress * 100)
//         }
//     })
//     console.log(percentage)
// },[scrollRangeH])


//     return(<>


// <ScrollContainer className="scrollContainer" ref={scrollContainerRef}>
//     <ScrollTracker style={{display: progressBar ? "block" : "none"}} $color={progressBarColor}>
//         <ScrollProgress style={{ width: `${percentage}%` }} $color={progressBarColor} />
        
//     </ScrollTracker>
//     <ScrollHeight className="scrollHeight" ref={scrollHeightRef} $height={scrollRangeH * multiplier}>
//         <ScrolltoDesign ref={ref} scrollRangeH={scrollRangeH} multiplier={multiplier}/>
//         <ScrolltoVid scrollRangeH={scrollRangeH} multiplier={multiplier}/>
//     </ScrollHeight>
// </ScrollContainer>


// </>

//     )
// })





interface scrollProps{
    scroll:React.MutableRefObject<number>;
}


interface Handler{
    scrolltoVid():void
    scrolltoDesign():void
    scrolltoTop():void
    // scrollTop:number | undefined
    scrollTop():React.SetStateAction<number | undefined>
design():React.RefObject<Element>;
    // percentage:number

  }


//↓no.2?

const Scroller=forwardRef<Handler,scrollProps>(({scroll}:scrollProps,ref)=>{
    const vidRef=useRef(null!) as React.MutableRefObject<HTMLDivElement>;
    const designRef=useRef(null) as React.RefObject<Element>;
    const topRef=useRef() as React.MutableRefObject<HTMLDivElement>;
    const contactRef=useRef() as React.MutableRefObject<HTMLDivElement>;


    const scrollRangeH=15
    const progressBar=true
    const progressBarColor='linear-gradient(45deg,#e66465, #9198e5)'
    
        const scrollContainerRef=useRef()
    const scrollHeightRef=useRef<HTMLDivElement>()
    const [percentage, setProgress] = useState<number>(0)
    
    const scrollCounts=scrollRangeH
    const multiplier=1000

    const scrollintoContact=()=>{
        contactRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    const scrollintoDesign=()=>{
        designRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    const scrollintoTop=()=>{
        topRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    const scrollintoVideo=()=>{
        vidRef.current?.scrollIntoView({behavior: 'smooth'})
    }



    useImperativeHandle(ref,()=>{
        return {
            scrolltoVid(){
             vidRef?.current?.scrollIntoView({behavior: 'smooth'});
      
         },
         scrolltoDesign(){
            designRef?.current?.scrollIntoView({behavior: 'smooth'});
         },
         scrolltoTop(){
            topRef?.current?.scrollIntoView({behavior: 'smooth'});
         },
         scrolltoContact(){
            contactRef?.current?.scrollIntoView({behavior: 'smooth'});
         },
        //  消すか？
         scrollTop(){
                return percentage
         },
            // vidRef.current?.scrollTop,
         design(){
            return designRef}
        };
    })

    useEffect(()=>{
        new ScrollTrigger({
            scroller:scrollContainerRef.current,
            trigger:scrollContainerRef.current,
            start:'top top',
            end:()=>`+=${scrollRangeH*multiplier-window.innerHeight}px`,
            scrub:true,
            // markers:true,
    
            onUpdate:(self)=>{ setProgress(self.progress * 100)
            }
        })
        
    },[scrollRangeH])
    
    
        return(<>    
    <ScrollContainer className="scrollContainer" ref={scrollContainerRef} 
        onScroll={(e: { target: HTMLDivElement; })=>{
                    scroll.current=e.target.scrollTop /(e.target.scrollHeight - window.innerHeight)
                }}>
        <ScrollTracker style={{display: progressBar ? "block" : "none"}} $color={progressBarColor}>
            <ScrollProgress style={{ width: `${percentage}%` }} $color={progressBarColor} />
        </ScrollTracker>
        <ScrollHeight className="scrollHeight" ref={scrollHeightRef} $height={scrollRangeH * multiplier}>
        <ScrolltoContact ref={contactRef} scrollRangeH={scrollRangeH} multiplier={multiplier}><Contact/></ScrolltoContact>
            <ScrolltoTop ref={topRef} scrollRangeH={scrollRangeH} multiplier={multiplier}><About /></ScrolltoTop>
            <ScrolltoVid  ref={vidRef}  scrollRangeH={scrollRangeH} multiplier={multiplier}><VideoTitle/></ScrolltoVid>
            <ScrolltoDesign ref={designRef} scrollRangeH={scrollRangeH} multiplier={multiplier}></ScrolltoDesign>
            

            <ScrollArrow scrollintoContact={scrollintoContact} scrollintoDesign={scrollintoDesign} scrollintoTop={scrollintoTop} scrollintoVideo={scrollintoVideo} designRef={designRef} vidRef={vidRef} contactRef={contactRef} />
        </ScrollHeight>

    </ScrollContainer>
    
    
    </>
)
})







export const ScrollContainer=styled.div<any>`

position:fixed;
    height:100vh;
    //大事な部分両側に10pxの空きができるという事
    width: calc(100% + 20px);
z-index:100;
    overflow-x: hidden;
    overflow-y: auto;
  top: 0;
  left: 0;

`



//スクロールバーの外枠

export const ScrollTracker = styled.div<any>`

  position: fixed;
  left: 50%;
  //中央寄せにしたよ
  transform: translateX(-50%);
  bottom: 20px;
      //大事な部分//componentで指定されているdisplay:blockは幅は親要素scrolllContainerの100％
  width: calc(80% - 50px);
  height: 15px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.$color};
  opacity: 0.8;
  pointer-events: none;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
`

//↓　縦方向。このheightの高さがgsapの直接的なパーセンテージになる
export const ScrollHeight=styled.div<any>`

position:relative;
top:0;
height:${(props)=>props.$height}px;
// width:30px;
// ↓最期に消す
// background: linear-gradient(#e66465, #9198e5);
`

export const ScrolltoTop=styled.div<any>`
position:relative;


height:${(props)=>(props.scrollRangeH)*props.multiplier}px;
width:100vw;

`

export const Div=styled.section<any>`
height:200vh;
padding: 10px;
`
export const ScrolltoVid=styled.div<any>`
position:absolute;
height:${(props)=>(props.scrollRangeH - 6)*props.multiplier}px;
width:90vw;
bottom:0;
`

export const ScrolltoDesign=styled.div<any>`
position:absolute;
height:${(props)=>(props.scrollRangeH - 9)*props.multiplier}px;
width:50px;
bottom:0;
`

export const ScrolltoContact=styled.div<any>`
position:absolute;
height:100vh;
width:80px;
bottom:0;
`

//↓内包しているscrollcontainerrefをトリガーにしてgsapのonupdateによって直接componentsでスクロール毎にwidthが更新されてる(ピンク色の動く部分)
export const ScrollProgress=styled.div<any>`
position: relative;
top: 0;
left: 0;
height: 100%;
background: ${(props) => props.$color};
`


const Title=styled.p`
display:block;
font-family:${theme.logoFontFamily};
font-size:10em;
font-weight:900;
width:100vh;
padding:0;
margin:0;
line-height: 1;
color:${theme.bodyDarkYellow};
text-align:right;
@media ${theme.device.laptop}{
  font-size:3em;
};
@media ${theme.device.mobileL} { 
  font-size:2em;
};

`

const VideoTitle=()=>{
   return <Title>VIDEOS</Title>
}



export default Scroller