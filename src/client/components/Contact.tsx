import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import theme from '../Theme'
import axios, { AxiosResponse, RawAxiosRequestConfig } from "axios";
import { useUnmountEffect } from "framer-motion";
import { validateFullName,validateEmail ,validateMessage} from "./Validate";


const ContactContainer=styled.div`
position:absolute;
bottom:0;
z-index:100;
width:100vw;
height:100vh;
background-color:${theme.bodyBlue};

`
const BottomBar=styled.div`
position:absolute;
bottom:0;
z-index:600;
width:100vw;
height:50px;
padding:10px;
border-bottom:none;
p{
    text-align:right;
    font-family:${theme.logoFontFamily};
    color:${theme.body};
    font-size:0.2em;
}
background-color:${theme.bodyDarkBlue};

`
const Section=styled.section`
position:absolute;
margin: auto;
top: 0;
  right: 0;
  bottom: 0;
  left: 0;
width:80%;
height:80%;
max-width:500px;
max-height:500px;
border-radius: 10px;
 //background-color:${theme.body}
`
const InnerContainer=styled.div`
top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 20px;

`

const Title=styled.div`
font-family:${theme.logoFontFamily};
font-weight:900;
font-size:${theme.fontxl};
letter-spacing: 0.05em;
color:${theme.body}
`
const Label=styled.label`
font-family:${theme.logoFontFamily};
font-size:${theme.fontxs};
display:flex;

`

const Input=styled.input`
width:100%;
 border-width: 0px 0px 2px 0px;
//border-width:1px;
border-color:${theme.bodyDarkBlue};;
background-color: transparent;
outline: none;
margin-bottom:10px;


`
const TextArea=styled.textarea`
width:100%;
height:100px;
border-width:1px;
border-color:${theme.bodyDarkBlue};
background-color: ${theme.body};
outline: none;
margin-bottom:10px;
display:flex;
`

const fadeIn = keyframes`
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
`;

const Button=styled.button`
background-color: ${theme.bodyDarkBlue};
        border: none;
        cursor: pointer;
        outline: none;
        appearance: none;
color:white;
opacity: 0.8;
border-radius: 5px;
    transition: 0.3s ease-in-out;
    padding:30px;
font-family:${theme.logoFontFamily};
font-weight:900;
&:hover{
    animation: ${fadeIn} .5s ease-out forwards;
}

`




const Overlay=styled.div`
position:absolute;
backgroundColor:"${theme.body}";
animation:${fadeIn} .5s ease-in-out;
display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;



span{
    font-size:${theme.fontmd};
font-color:white;
font-family:${theme.logoFontFamily};
}
}}



`

const Valid=styled.p`
color:red;
font-weight:800;
font-size:0.8em;
margin:0;
padding:0;
margin-left:10px;
`


interface MailData{
    recipient_email :string;
    fullName:string;
    subject:string;
    message:string;
}

export default function Contact(){
const [recipient_email,setEmail]=useState("");
const [fullName,setName]=useState("")
const [subject,setSubject]=useState("");
const [message,setMessages]=useState("");
const [send,setSend]=useState(null!);

 const [loaded,setLoaded]=useState(false)
 const[nameError,setNameError]=useState("")

 const[emailError,setEmailError]=useState("")
 const[messageError,setMessageError]=useState("")




const API=axios.create({baseURL:"http://localhost:3000"})
const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(recipient_email && subject && message&&fullName){
        sendMail({recipient_email, subject, message,fullName});
    }

}

const sendMail=async({
    recipient_email, subject, message,fullName}:MailData
    )=>{
    try{
        const datas={recipient_email,subject,message,fullName} as RawAxiosRequestConfig<any>
        console.log("now sending")
        // let postData=JSON.stringify({recipient_email,subject,message})
        let res=await API.post('/send',datas);
        setLoaded(true)

        if(res){
            console.log(res.data.message)
            setSend(res.data.message)
            console.log(loaded)
            alert(res.data.message)
        }
    }catch(error){
        alert("Message Failed to Send")
    }
}

useEffect(()=>{
  validateFullName({fullName,setNameError});
  validateEmail({recipient_email,setEmailError});
  validateMessage({message,setMessageError});


    if(send){
        setLoaded(true)
        setName("")
        setEmail("");
        setSubject("");
        setMessages("");
        setSend(null!)
    }
    setTimeout(()=>{
        setLoaded(false)
    },6000);
},[recipient_email,subject,message,setSend,send])
//     if(recipient_email && subject && message){
//         axios.post('http://localhost:5000/send_email',{
//             recipient_email,
//             subject,
//             message
//         }).then(()=>alert('Message send Successfully!'))
//         .catch(()=>alert("Message Failed to Send"));
//         return;
//     }
//     return alert("Fill in all the fields to continue");
// }
    return(
        <>
<ContactContainer>
    <Section>
        <InnerContainer>
            <Title>Contact Us</Title>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            {/* Need details about our Bussiness plan? Let us know. */}
            </p>
            {(!loaded) ? 
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}action="#">
                <div>
                    <Label htmlFor="email">Your Email {emailError && <Valid>{emailError}</Valid>}</Label>
                    
                    <Input type="email" id="email"
                    onChange={(e)=>setEmail(e.target.value)}></Input>
                
                </div>
                <div>
                    <Label htmlFor="fullName">Your Name {nameError && <Valid>{nameError}</Valid>}</Label>
                    

                    <Input type="fullName" id="fullName"
                    onChange={(e)=>setName(e.target.value)}></Input>
                </div>
                <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input type="text" id="subject" required
                    onChange={(e)=>setSubject(e.target.value)}></Input>
                </div>
                <div>
                    <Label htmlFor="message">
                        Your message {messageError && <Valid>{messageError}</Valid>}

                    </Label>
                    <TextArea id="message" 
                    onChange={(e)=>setMessages(e.target.value)}></TextArea>
                 </div>
                <Button type="submit"
                // onClick={(e)=>submitHandler(e)}
                >Send message</Button>

            </form>
            :
            <Overlay>{send}</Overlay>
}
        </InnerContainer>

    </Section>
    <BottomBar><p>&copy;OMI TOMOKO</p></BottomBar>

</ContactContainer>
</>
    )
}

// const Overlay=({children}:{children:string})=>{
//     return(
//         <span> {children}</span>
//     )
// }