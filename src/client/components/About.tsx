import React from "react";
import styled from "styled-components";
import theme,{size} from '../Theme'








const Container=styled.div`


font-size:16px;
color:#fff;
margin:0;
padding:0;
position:relative;
display:block;
top:50vh;
right:-15vw;
width:30vw;
@media ${theme.device.tablet} { 
  right:-4vw;
  top:70vh; 
};
@media ${theme.device.mobileL}{
  top:70vh;
};
@media ${theme.device.laptop}{
  right:-6vw;
};
@media ${theme.device.mobileS} { 
  right:0vw;
};
`
const Title=styled.p`

display:block;
font-family:${theme.logoFontFamily};
font-size:15em;
font-weight:900;
width:250px;
padding:0;
margin:0;
line-height: 1;
color:${theme.bodyDarkYellow};
text-align:left;
@media ${theme.device.laptop}{
  font-size:9em;
};
@media ${theme.device.mobileL} { 
  font-size:6em;
};

`

const P=styled.p`

width:250px;
text-align:left;
padding:0;
margin-left:25px;
word-wrap: break-word;
font-size:${theme.fontlg};
color:${theme.bodyDarkBlue};
font-weight:600;
@media ${theme.device.mobileL} { 
  font-size:${theme.fontmd};
};
@media ${theme.device.mobileS} { 
  font-size:${theme.fontsm};
  margin:10px;
};
`

const sectionWidth={width:"400px"}
  
const Skill=styled.div`

  position:absolute; 
  margin:0;
  padding:0;
  width:100vw;
  left:0;
  // -webkit-transform: skewY(-5deg);
// -moz-transform: skewY(-5deg);
// -ms-transform: skewY(-5deg);
// -o-transform: skewY(-5deg);
  transform: skewY(-5deg);
  // --leftA:100vw;
  // --leftB:calc(var(--leftA) - ${sectionWidth.width});
  // --leftC:calc(var(--leftB) /2);
  // left:var(--leftC);
  @media ${theme.device.mobileL} { 

    left:-6vw;
    top:0;
   };
   @media ${theme.device.laptop} { 


    top:555vh;
   };
  // ↓height of the skill container
  top:400vh;
`

const SkillTitle=styled.span`
display:block;
font-size:${theme.fontxl};
// letter-spacing: 0.05em;
font-family:${theme.logoFontFamily};
color:${theme.bodyBlue};
padding:0px;
margin:5% auto ;
max-width:${theme.device.mobileL};
width:100%;
font-weight:900;
text-align:center;
p{
  padding:0;
margin:0;
  // letter-spacing: 0.03em;
  font-size:${theme.fontsm};
}
span{
  padding:0;
  margin:0;
  font-size:0.5em;
  // letter-spacing: 0;
  font-weight:500;
}
`



const Introduction=styled.div`
display:flex;
flex-wrap: wrap;
width:100vw;
min-width:${size.mobileL};
margin:auto;
padding:0;

div{
  
width:calc(100vw/4);
// max-width:${size.mobileL};
// width:${size.mobileS};
margin:0;
padding:2%;
  @media ${theme.device.tablet} { 
  display:block;
  max-width:${size.tablet};
  width:400vw;
  // width:${size.mobileS};
  margin:auto;
  padding:10%;
  };
}
div:nth-child(1){
 @media ${theme.device.tablet} {background:none; };
  background-color:${theme.body}
}
div:nth-child(2){
  background-color:${theme.body}
}
div:nth-child(3){
  background-color:${theme.bodyDarkYellow}
}
div:nth-child(4){
  @media ${theme.device.tablet} {background:none; };

  background-color:${theme.bodyDarkYellow}
}
`


const Section=styled.section`
  max-width:${size.mobileL};
  margin:0 auto;
  display:grid;
  gap:0.5vh 1vw;
  grid-template-columns:repeat(2,1fr);
  padding:1%;
  padding-bottom:10px;
  @media ${theme.device.tablet} { 
    display:grid;


    gap:0.5vh 2vw;
  };
    @media ${theme.device.mobileS} { 
      display:grid;
      gap:0.3vh 3vw;
    };
dt{
  padding:0px;
  font-size:${theme.fontmd};
  font-weight: 900;
  @media ${theme.device.laptop} {
    font-size:${theme.fontsm};
  } 
`


export default function About(){

return (
<div style={{scrollSnapType:" y proximity"
}}>
  <Container>
      <Title>
      Hello
      </Title>
      <P>I build Websites and 3D.</P>
   </Container>

   <Skill>
      <Introduction>
        <div></div>
        <div>
        <SkillTitle>
          Key&ensp;Skills
        </SkillTitle>
        <Section> 
<dt>Typescript</dt><dt>React</dt> 
<dt>MERN Web App</dt><dt>Blender</dt>            
<dt>THREE.js,R3f</dt><dt>Photoshop</dt>
<dt>(JWT,bcrypt)</dt><dt>Illustrator</dt>
<dt>...</dt>
        </Section>
        </div>
   
      <div>
        <SkillTitle><p>
          Development</p>
          <span>Now I'm learning...</span>
        </SkillTitle>
        <Section> 
          <dt>More Authentication</dt>
          <dt>MERN eCommerce</dt>
          <dt>UI,UX Design</dt>
          <dt>...</dt>
        </Section>
        </div>
        <div></div>
      </Introduction>
    </Skill>
   </div>
)
}

