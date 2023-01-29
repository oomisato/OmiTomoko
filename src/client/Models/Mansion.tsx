import * as THREE from 'three';
import styled from 'styled-components';
import {useFrame,useThree,Vector3,useLoader, ThreeElements} from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF,useScroll,Html,useAnimations } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { MeshPhysicalMaterial } from 'three';
import theme from "../Theme"

const Ballon=styled.div`
position:absolute;
right:150px;
display:block;
margin: 8px 8px;
padding: 20px;
min-width: 200px;
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
  top:150px;
right:-80px;
  &:before{
    content: "";
    position: absolute;
    right: 50%;
    top:-20px;
    margin-right: -10px;
    border: 10px solid transparent;
    border-bottom: 30px solid ${theme.bodyDarkYellow};
};
`

const Overlay=styled.div`
position:absolute;
top:75px;
right:0px;
display:block;
margin: auto ;
min-width: 200px;
color: ${theme.body};
font-family:${theme.logoFontFamily};
font-size: ${theme.fontxs};
 font-weight:600;
text-align:center;
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
  
  export default function Mansion({position}:ProductProps){
    const textureNum=(type:string)=>`./public/textures/mansion/mansion_${type}.png`
    // const [colorMap,normalMap,roughnessMap,aoMap]=useLoader(TextureLoader,[
    //   textureNum('color'),
    //   textureNum('normal'),
    //   textureNum('roughness'),
    //   textureNum('AO'),
      
    // ])
    const group=useRef<THREE.Group>(null!)
    const {nodes,materials,animations,scene}=useGLTF('./public/mansion2.glb')as unknown as GLTFResult
    const {actions,mixer}=useAnimations(animations,group)
//   useFrame((state)=>{
//     const et = state.clock.elapsedTime

// group.current.position.y=Math.sin((et+1*1000)/2)*1
// group.current.rotation.x=Math.sin((et+1*2000)/3)/10
// group.current.rotation.y = Math.cos((et + 1 * 2000) / 2) / 10
// group.current.rotation.z = Math.sin((et + 1 * 2000) / 3) / 10
// })
// const meshRef=useRef<THREE.Mesh>()
const [thunder, setLight]=useState<boolean>(false);
// const [zoom, setZoom] = useState(false);
// const [focus, setFocus] = useState(true);
// const zoomToView = (meshRef: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | undefined>) => {
//     setZoom(!zoom);
//     setFocus(meshRef.current.position);
//   };
//   const vec = new THREE.Vector3();
//   useFrame((state) => {
//     const step = 0.05;

//     /*
//     Need to find some way to lerp the lookAt
//     */

//     zoom ? vec.set(focus.x, focus.y, focus.z + 0.2) : vec.set(0, 0, 5);
//     //
//     state.camera.position.lerp(vec, step);
//     state.camera.lookAt(0, 0, 0);
//     // Update to new position/lookAt
//     state.camera.updateProjectionMatrix();
//   });
useEffect(() => {

    
    let timeoutId = setTimeout(() => {
        setLight(false)

      },300)

  return () => {
    clearTimeout(timeoutId)
   }
  actions?.shoeAction?.play()
  // scene.traverse((obj:THREE.Mesh) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
}, [thunder,setLight])
    return(

      <group ref={group} dispose={null} position={position}>

      
<Tag>
        <Ballon >Horror Lover
          <div onClick={()=>{
            setLight(true);
            // zoomToView(meshRef)
            }}
            >
            <span style={{fontSize:"100px"}}className="material-symbols-outlined">thunderstorm</span>
            <Overlay>click</Overlay>
          </div>
          </Ballon>
        </Tag>
      {/* <mesh castShadow receiveShadow  
      geometry={nodes.mansion.geometry} >
        <meshStandardMaterial 
         map={colorMap}
         normalMap={normalMap}
         roughnessMap={roughnessMap}
         aoMap={aoMap}
         />
      </mesh> */}

      <mesh 
    //   ref={meshRef}
      geometry={nodes.mansion.geometry} 
      material={ thunder ? materials.mansion : materials.lighting }
      
      />


      </group>
      )
    }
    useGLTF.preload('./public/mansion.glb')



    const Tag=({children}:{children:any})=>{
        return(
          <mesh>
           
            <Html className="data" center >
              {children}
            </Html>
          </mesh>
        )
        }