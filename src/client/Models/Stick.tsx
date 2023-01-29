import * as THREE from 'three';
import styled from 'styled-components';
import {Vector3, applyProps} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF,Html,useAnimations } from '@react-three/drei';
import React, { useEffect, useMemo, useRef } from 'react';
import theme from "../Theme"

const Ballon=styled.div`
position:absolute;
top:-200px;
right:50px;
display: inline-block;
margin: 8px 8px;
padding: 20px;
min-width: 150px;
max-width: 100%;
color: #fff;
font-family:${theme.logoFontFamily};
font-size: ${theme.fontlg};
font-weight:500;
text-align:center;
background: ${theme.bodyDarkYellow};
border-radius: 80px;

&:before{
  content: "";
  position: absolute;
  top: 50%;
  right: -29px;
  margin-top: -10px;
  border: 10px solid transparent;
  border-left: 20px solid ${theme.bodyDarkYellow};
}

`

type GLTFResult=GLTFLoader & {
    nodes:THREE.Mesh;
    
    materials :THREE.MeshStandardMaterial|any;
  animations:any;
  scene:any;
    
  };
  
  
  interface ProductProps{
    position: Vector3;
  }



  export default function Stick({position}:ProductProps){
   
    const group=useRef<THREE.Group>(null!)
    const {nodes,materials,animations,scene}=useGLTF('./public/magicStick2.glb')as unknown as GLTFResult
    const {actions,mixer,names}=useAnimations(animations,group)


    useMemo(() => {
      Object.values(nodes).forEach((node) =>  node.isMesh && (node.receiveShadow=node.castShadow=  true) 
        )
      applyProps(materials.jewerlyR, { roughness: 0.2, clearcoat: 0.1,transmission:0.8, thickness:2, })
      applyProps(materials.jewerlyG, {  envMapIntensity: 4,roughness: 0.4, clearcoat: 0.1,transmission:1, thickness:2, })

      
    }, [nodes, materials])

useEffect(() => {

    const nameArray=Array.from(names) as string[]
    nameArray.forEach(
         num => actions[num]?.play()  )
  }, [actions,mixer])
    return(
      <group ref={group} dispose={null} position={position}>

      
<Tag >
        <Ballon id="baloon">

          Mother
          </Ballon>
        </Tag>

        <primitive object={scene}/>
      </group>
      )
    }

    useGLTF.preload('./public/magicStick2.glb')


    const Tag=({children}:{children:any})=>{
        return(
          <mesh>
           
            <Html className="data" center >
              {children}
            </Html>
          </mesh>
        )
        }