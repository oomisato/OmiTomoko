 import { Html, useProgress } from '@react-three/drei';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
 import styled, { keyframes } from 'styled-components';
 import theme from "./Theme"

const fade=keyframes`
from{
   opacity:1;
top:0;
}
to{
   opacity:0;
top:-100vh;
}`

const blink=keyframes`
from {
   opacity:0.2
}
to{
   opacity:0.8
}`

const OpacityContainer=styled.div<any>`
position:absolute;
animation:${(props)=>props.$fade} 3s ease-out ;


`
const Container=styled.div<any>`
top: 50%;
left: 50%;
transform: translateY(-50%) translateX(-50%);
-webkit- transform: translateY(-50%) translateX(-50%);
width:100vw;
height:100vh;
background-color:#005566;



`
const Text=styled.div<any>`
position:absolute;
top: 50%;
left: 50%;
transform: translateY(-50%) translateX(-50%);
-webkit- transform: translateY(-50%) translateX(-50%);
animation:${blink} 1s ease-in-out infinite;
color:${theme.body};
font-family:${theme.logoFontFamily};
font-weight:900;
font-size:${theme.fontlg};
`

const Bar=styled.div<any>`
position:absolute;
left: 50%;
transform:  translateX(-50%);
-webkit- transform:  translateX(-50%);
background-color:${theme.body};
height:2px;
width:${(props)=>props.$barWidth}vw;

`
 
type ChildProps={
   setLoadComp:Function
}

function LoaderDom(props:ChildProps){
   const { active, progress, errors, item, loaded, total } = useProgress()
   const per=Math.floor(progress) as number
useEffect(()=>{
   if(per===100){

   setTimeout(()=>{
      props.setLoadComp(true)
   },2000)
}
},[useProgress,progress,per])





   return( <Html center>
    
       <OpacityContainer $fade={null}> 
      <Container>
         <Text>
      {Math.floor(progress)} % 
<Bar $barWidth={Math.floor(progress)}/>
         </Text>
      </Container>
      </OpacityContainer>

      </Html>)
}




export default LoaderDom;
