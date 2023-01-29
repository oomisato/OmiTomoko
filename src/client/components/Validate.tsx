interface Mail{
    recipient_email:string;
    setEmailError:React.Dispatch<React.SetStateAction<string>>

}
interface Name{
    fullName:string;
    setNameError:React.Dispatch<React.SetStateAction<string>>
}
interface Message{
    message:string;
    setMessageError:React.Dispatch<React.SetStateAction<string>>
}
const validateEmail=({recipient_email,setEmailError}:Mail)=>{
    const emailRegular="/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;"
return recipient_email && !recipient_email.match(emailRegular) ? 
setEmailError("Email not valid") :
setEmailError("")
}

const validateFullName=({fullName,setNameError}:Name)=>{
return fullName && fullName.length<5 
? 
setNameError("Full name is too short") :
fullName && fullName.length>50 ?
setNameError("Try to make short and meanfully")
:setNameError("")
}

const validateMessage=({message,setMessageError}:Message)=>{
    return message && message.length<5 
    ? 
    setMessageError("message is too short") :
    message && message.length>200 ?
    setMessageError("Try to make short and meanfully")
    :setMessageError("")
    }

export {validateEmail,validateFullName,validateMessage}