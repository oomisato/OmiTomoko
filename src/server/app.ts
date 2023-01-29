import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
//↓サーバーを作る場所
import cors from "cors";
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
import http, { request } from "http";
const path = require('path');


const app=express();
const port = process.env.PORT || 3000;
// const server:http.Server=new http.Server(app)


app.use(express.json({limit:"32mb"}));
app.use(express.urlencoded({extended:true,limit:"32mb"}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
})
app.use(cors());

// app.use(express.static(__dirname + '/dist'));

app.use(express.static(path.join(__dirname, '../client/public')));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
}); 

type Mailer={
    recipient_email:string,
    fullName:string,
     subject:string, 
     message:string
}


const myOAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
  )

  myOAuth2Client.setCredentials({
    refresh_token:process.env.REFRESH_TOKEN
    });

    
  const myAccessToken = myOAuth2Client.getAccessToken()

const Email=(options)=> {
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth: {
                type: "OAuth2",
                user: process.env.MAIL_ACCOUNT,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken:myAccessToken
              },
            });
        
        
      
          
          transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
                return;
          }

    });
};
//toHost
const sendEmail=({recipient_email, subject, message,fullName}:Mailer)=>{
    const options = {
        from:fullName,
        to:process.env.MAIL_ACCOUNT,
        subject: subject,
        text: message,
        html:`
        <div style="width:300px; height:auto;border:solid 1px">
        <h1>${fullName}様より</h1>
        <h2>mail:${recipient_email}</h2>
        <h2>title:${subject}</h2>
        <p>${message}</p>
        </div>
        `
      };
      Email(options)
}


app.post("/send",async(req: express.Request, res: express.Response)=>{
try{
    const {recipient_email,subject,message,fullName}=req.body
    sendEmail({recipient_email,subject,message,fullName})
    //***************client side message**************
res.json({message:"Your message sent successfully!"});
}catch(error){
    res.status(500).json({message:"Error!"});
}
});


app.listen(port,()=>{
    console.log(`server is listening at port${port}!`)
})




