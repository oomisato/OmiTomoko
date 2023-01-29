import React, { MouseEvent,forwardRef, MutableRefObject, useEffect, useRef, useState,useContext, SetStateAction, useLayoutEffect } from "react";
import * as THREE from 'three';
import styled from "styled-components";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF,Html,Mask,useMask, useVideoTexture, useAspect } from '@react-three/drei';
import Scroller, {scrollConfig} from "../Scroller/Scroller"
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from "gsap";
import {useThree } from "@react-three/fiber";
import { Glitch, EffectComposer } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import theme from "../Theme";
gsap.registerPlugin(ScrollTrigger);



const Screen=styled.div`
    position:relative;
    width:300px;
    @media ${theme.device.tablet} { 
        width:100px;
        top:-0.8px;
    };
    top:-15vh;
    height:5vh;
    display:flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
    //background-color:pink;
    div{
        position:relative;
        width:50%;
        height:50%;
        background-color:green;

        span{   
            font-size:1000px;
            
            @media ${theme.device.tablet} { 
                font-size:150px;
            };
    }

`
const Title=styled.div`
color:${theme.body};
z-index:50;
font-weight:600;
    h1{
        font-family:${theme.logoFontFamily};
        font-weight:600;
        font-size:${theme.fontBig};
    @media ${theme.device.tablet} { 
        font-size:${theme.fontxxl};
        bottom:0rem;
        top:-3rem;
        left:15vh;
    };
position:absolute;
z-index:201;
top:-10rem;
line-height: 1;
}


`
const Button =styled.button`

    border: none;
    background: transparent;
    color: ${theme.text};
    transition: color 1s;
    :hover {
        color: #b0e0e6;
    }
    
    span{
        font-size : x-large;
    }
`

const Span=styled.span`
font-size: 80px;
`

type GLTFResult=GLTFLoader & {
    nodes:THREE.Mesh | any;
    
    materials :THREE.MeshStandardMaterial|any;
  
    
  };


  interface DivProps{
    // props:JSX.IntrinsicElements["div"]
    scroll:MutableRefObject<HTMLDivElement |number>;
}
  interface OverlayProps{
    
    scrollRef:MutableRefObject<number>;
}

interface GlitchProps{
    delay:THREE.Vector2;

}

export default function Videos(){
    const videotitleRef=useRef<THREE.Mesh>(null!)

    const {nodes,materials}=useGLTF('public/monitor.gltf') as unknown as GLTFResult
    const [glitch,setGlitch]=useState<boolean>(false)
        // const { unsuspend, start, crossOrigin, muted, loop } = {
    const[trackNum,setTrackNum]=useState<number>(0)
    const [play,setPlay]=useState<boolean>(false)
    const tracks=["public/pinecone.mp4","public/burn.mp4","public/burger.mp4","public/butterfly.mp4","public/butterfly3.mp4"]
    
    const groupRef=useRef<THREE.Group>(null!)
    const {camera}=useThree();
    const [visible, setVisible] = useState<boolean>(null!)
    // const controlOcclude=()=>{setVisible(!visible); return null}
    const ctrlTracksF=(e: MouseEvent)=>{
    const target=e.target as HTMLInputElement;
    glitchCtroller()
        if(target.value="forward"){
            trackNum>tracks.length-1-1 ? setTrackNum(0) : setTrackNum(trackNum+1)
        }



    }
const changevidMat=()=>{
    return <MaskedVideoMaterial  play={play} src={tracks[trackNum]} glitch={glitch} />
}
const ctrlTracksP=(e:MouseEvent)=>{
    const target=e.target as HTMLInputElement;
    glitchCtroller()
    if(target.value="previous"){
        trackNum<0+1 ? setTrackNum(tracks.length-1) : setTrackNum(trackNum-1)
               
    }

}

const glitchCtroller=()=>{
    setGlitch(true)
    setTimeout(()=>setGlitch(false),200)
}



useEffect(()=>{  
    gsap.fromTo(groupRef.current.rotation,{y:-3.1},{y:0,
        scrollTrigger:{ 
            ...scrollConfig,
            start:'20% top',
            end:'30% top',
            // scrub:1,
        }
    });

    gsap.fromTo(camera.position,{z:10},{z:5,
        scrollTrigger:{ 
            ...scrollConfig,
            start:'30% top',
            end:'35% top',
            }
    });



    gsap.to(camera.position,{z:10,y:-6,
        onComplete: () => { setPlay(false); },
        scrollTrigger:{ 
            ...scrollConfig,
            start:'50% top',
            end:'55% top',
            // scrub:1,
            }
    });

    gsap.fromTo(videotitleRef.current.position,{
        y:100,
        x:-200,
    },{
        y:1,
        x: -1.4,
        ease: "power4.out",
        scrollTrigger:{
        ...scrollConfig,
        start:'30% top',
        end:"36% top",
        }})

},[])





const stencil=useMask(1,false)
const size = useAspect(1800, 1000)

   
    return(
    <>
    
            <group  dispose={null} ref={groupRef} position={[0,0,-3]}>
                <mesh  ref={videotitleRef}  >
            <meshBasicMaterial/><Html> <Title><h1>VIDEOS</h1></Title></Html>
            </mesh>






                    <mesh castShadow receiveShadow
                    geometry={nodes.monitor.geometry}
                    
                    ><meshStandardMaterial color={`${theme.bodyDarkBlue}`} 
                    emissive={`${theme.bodyDarkBlue}`}
                    lightMapIntensity={0.8}/></mesh>

    <mesh position={[0,0,-0.05]} rotation={[-0.35/Math.PI,0,0]}>
        {play ? 
            <>
                <planeGeometry args={[1.9,1.1,2]} /> 
                <MaskedVideoMaterial play={play} src={tracks[trackNum]} glitch={glitch} /> 

                <group>
                    <mesh position={[-0.1,-1,5]}>
                        <Html   style={{
                            transition: 'all 0.2s',
                            opacity: visible ? 0 : 1,
                            transform: `scale(${visible ? 0.5 : 1})`
                            }}
                            distanceFactor={1.5}
                            position={[0, 0, 0.51]}
                            transform
                            occlude
                            onOcclude={(e:boolean)=>{setVisible(!visible); return null}}>






                                    <Button type='button' value="previous" onClick={(e)=>ctrlTracksP(e)}>
                                        <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
                                    </Button>
                        </Html>    
                    </mesh>
                    
                    <mesh position={[0.1,-1,5]}>
                        <Html   style={{
                            transition: 'all 0.2s',
                            opacity: visible ? 0 : 1,
                            transform: `scale(${visible ? 0.5 : 1})`
                            }}
                            distanceFactor={1.5}
                            position={[0, 0, 0.51]}
                            transform
                            occlude
                            onOcclude={(e:boolean)=>{setVisible(!visible); return null}}>
                                    <Button  type='button' value="forward" onClick={(e)=>ctrlTracksF(e)}>
                                        <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
                                    </Button>
                        </Html>    
                    </mesh>
                </group>
            </>

        : 
            <>
            <planeGeometry args={[1.9,1.1,2]} />
            <meshBasicMaterial/>
            <mesh position={[0,0,0]}>
                            {/* <planeGeometry args={[1,1,1]}/> */}
                            <Html style={{
                                    transition: 'all 0.2s',
                                    opacity: visible ? 0 : 1,
                                    transform: `scale(${visible ? 0.5 : 1})`
                                    }}
                                    distanceFactor={0.4}
                                    position={[0, 0, 0.51]}
                                    transform
                                    occlude
                                    onOcclude={(e:boolean)=>{setVisible(!visible); return null}}
                                    >
                                    <Button
                                    type='button'  onClick={()=>setPlay(true)}>
                                    <span className="material-symbols-outlined md-100">play_circle</span>        
                                    </Button>
                                </Html> 
                            </mesh>
                        </>
                    }

                </mesh>


          
<fog attach="fog" color="white" near={8} far={13} />

    <EffectComposer>
        <Glitch 
        delay={new THREE.Vector2( 0.05,0.05 )}
        duration={new THREE.Vector2( 0.05,0.05 )}
        // strength={the2}
        mode={GlitchMode.CONSTANT_MILD} // try CONSTANT_MILD
         active={glitch ? true : false} // toggle on/off
        ratio={0.1}
        />
    </EffectComposer>
        </group>

            </>
    )
}

useGLTF.preload('/public/monitor.gltf')




type VideoTextureProps = {
    unsuspend?: 'canplay' | 'canplaythrough' | 'loadedmetadata'
    muted?: boolean
    loop?: boolean
    start?: boolean
    crossOrigin?: string

  }
  
  interface PlayVideo{
    src:string;
    glitch:boolean
    play:boolean|undefined

  }

 function  MaskedVideoMaterial({src,glitch,play}:PlayVideo, props: Partial<VideoTextureProps>) {


    const stencil = useMask(1)
    const texture =  useVideoTexture(src,props)
    texture.wrapS=THREE.ClampToEdgeWrapping
texture.wrapT = THREE.ClampToEdgeWrapping


    const {nodes,materials}=useGLTF('/monitor.gltf') as unknown as GLTFResult

    return <>

       <meshPhysicalMaterial  {...stencil} 
 map={play ? texture :null} clearcoat={0} 
 clearcoatRoughness={1} 
 toneMapped={false} 
 side={THREE.DoubleSide}/>
 

</>
}


  
