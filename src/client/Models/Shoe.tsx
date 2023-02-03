import * as THREE from 'three';
import styled from 'styled-components';
import {useFrame, Vector3} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF,Html,useAnimations } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import theme from "../Theme"

const Ballon=styled.div`
position:absolute;
top:-180px;
right:150px;
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
@media ${theme.device.tablet} { 
  top:-280px;
right:-80px;
  &:before{
    content: "";
    position: absolute;
    right: 50%;
    top:70px;
    margin-right: -10px;
    border: 10px solid transparent;
    border-top: 30px solid ${theme.bodyDarkYellow};
};
`
type GLTFResult=GLTFLoader & {
    nodes:THREE.Mesh | any;
    
    materials :THREE.MeshStandardMaterial|any;
  animations:any;
  scene:any;
    
  };
  
  
  interface ProductProps{
    // link:string;
    // index:number;
    // name:string;
    // materialName:string;
    position: Vector3;
    // text:string;
    // props:JSX.IntrinsicElements['mesh']
  }
  
  export default function Product({position}:ProductProps){

    const group=useRef<THREE.Group>(null!)
    const {nodes,materials,animations,scene}=useGLTF('./public/SHOEnoanime.gltf')as unknown as GLTFResult
    const {actions,mixer}=useAnimations(animations,group)
 

// ********************stop animatinon for better performance*************
// useEffect(() => {

//   actions?.shoeAction?.play()
//   // scene.traverse((obj:THREE.Mesh) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
// }, [mixer])
// ***************or use animation with useFrame**************
// useFrame((state)=>{
//   const et = state.clock.elapsedTime

// group.current.position.y=Math.sin((et+1*1000)/2)*1
// group.current.rotation.x=Math.sin((et+1*2000)/3)/10
// group.current.rotation.y = Math.cos((et + 1 * 2000) / 2) / 10
// group.current.rotation.z = Math.sin((et + 1 * 2000) / 3) / 10
// })
    return(

      <group ref={group} dispose={null} position={position}>

      
<Tag>
        <Ballon >
        3D Lover
          </Ballon>
        </Tag>


      <mesh castShadow receiveShadow  
      geometry={nodes.shoe.geometry} 
      material={materials.shoe} 
      scale={[1.3,1.3,1.3]}      />
        <mesh castShadow receiveShadow  
      geometry={nodes.air.geometry} 
      scale={[1.3,1.3,1.3]}
>
<meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} color="hotpink" transmission={1} thickness={2} roughness={0} />
  </mesh>      

      </group>
      )
    }
    useGLTF.preload('./public/SHOEnoanime.gltf')



    const Tag=({children}:{children:any})=>{
        return(
          <mesh>
           
            <Html className="data" center >
              {children}
            </Html>
          </mesh>
        )
        }