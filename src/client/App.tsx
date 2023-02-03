import React,{Suspense, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import styled, { ThemeProvider } from 'styled-components';
import {Canvas, useThree} from '@react-three/fiber';
import {Loader} from "@react-three/drei";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from "gsap";
import Scroller, {scrollConfig} from "./Scroller/Scroller"
import Nav from './Nav/Nav'
import Shoe from "./Models/Shoe";
import Stick from "./Models/Stick"
import Design from "./components/Design";
import Videos from "./components/Videos";
import LoaderDom from "./LoaderDom";
import Mansion from "./Models/Mansion";
import theme,{size} from './Theme'



gsap.registerPlugin(ScrollTrigger);

 


function Scene (){
    const group=useRef<THREE.Mesh>(null!);
    const[groupRotationX,setRingRotation]=useState(0)
    const [ringHPos]=useState({height:0})
    const radius=3.5
    const innerRadius=2.1
    const midOfR=(radius-innerRadius)/2 + innerRadius+0.5
    const z=0.5
    const rotateNum=-50
    const { viewport, size } = useThree()
    var i =1;

  useEffect(()=>{
    console.log(size.width)

      var tl= gsap.timeline()
      tl.to(group.current,{
        
        scrollTrigger:{
          ...scrollConfig,     
          onUpdate:(trigger)=>{
            const rotation=trigger.progress*rotateNum;
            setRingRotation(rotation)            
          },
          scrub:1
        }
      })



      gsap.to(ringHPos,{
        height:20,
        scrollTrigger:{
          ...scrollConfig,
          start:'20% top',
          end:'60% top',
        }
      })
    },[viewport,size])

    return(

      <>
        <group dispose={null} rotation={[-Math.PI/2.8,0,0]} position={[3,ringHPos.height,0]} >
          <mesh ref={group} castShadow receiveShadow rotation={[0,0,-groupRotationX]}>
            <ringGeometry args={[innerRadius,radius, 40 ]} />
            <meshStandardMaterial color={`${theme.bodyBlue}`} />
          </mesh>
            <group rotation={[0,0,groupRotationX]}>
            {/* './images/shoe3.glb' */}
            
         
              <Stick 
              position={
                [Math.cos(90*(Math.PI/180))*midOfR,
                Math.sin(90*(Math.PI/180))*midOfR,
                z]}/>
               {size.width>=1440 &&
               <Mansion
                position={
                [Math.cos(180*(Math.PI/180))*(midOfR-0.3),
                Math.sin(180*(Math.PI/180))*(midOfR-0.3),
                z+0.2]} 
                />
              } 
                   <Shoe
                position={
                  [Math.cos(340*(Math.PI/180))*midOfR,
                  Math.sin(340*(Math.PI/180))*midOfR,
                  z]} 
              />

            </group>  
        </group>
      </>
    )
}



interface Handler{
  scrolltoVid():void
  scrolltoDesign():void
  scrolltoTop():void
  scrolltoContact():void
  scrollTop():React.SetStateAction<number | undefined>
  design():React.RefObject<HTMLDivElement>;
}




export default function App(){
const setRef=useRef({} as Handler) 
const scroll=useRef<number>(0)
const [modelLoaded, setLoaded]=useState<boolean>(false);
const overlay=useRef<HTMLDivElement>(null);
const scrollPageTop=()=>{
  setRef.current?.scrolltoTop()
  }
const scrollPageD=()=>{
  setRef.current?.scrolltoDesign()
  }
  const scrollPageFunc = () => {
    setRef.current?.scrolltoVid()
  
  };
  const scrollPageC = () => {
    setRef.current?.scrolltoContact()
  };

function setLoadComp(){
  setLoaded(true)
}

  return(
  <>
    <ThemeProvider theme={theme}>

{/* {loaded ? null : <LoaderDom />} */}
      <Scroller 
      // progressBar={true} progressBarColor="linear-gradient(45deg,#e66465, #9198e5)" scrollRangeH={15}
       ref={setRef} scroll={scroll} />
      {modelLoaded ?
      <>
        <Nav  scrollPageTop={scrollPageTop} scrollPageFunc={scrollPageFunc} scrollPageD={scrollPageD}　scrollPageC={scrollPageC}/>      
        <Design />
      </>
      :null
 }
     
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 30}}>
      {/* <Suspense fallback={<LoaderDom ref={loadRef}/>}> */}

      <Suspense fallback={<LoaderDom setLoadComp={setLoadComp}/>}> 
        <ambientLight intensity={1} />
        <spotLight color="#fff" position={[0,1,6]} intensity={2} castShadow/>
        <fog attach="fog" args={[`${theme.bodyBlue}`, 10, 13]} />
        <color attach="background" args={[`${theme.bodyBlue}`]} />

        <Scene />
       <Videos />
</Suspense>
      </Canvas>


  </ThemeProvider>

  </>
  )
}

