// mongoDb userVerifivation model

// email hanler

import nodemailer from 'nodemailer'



//nodemailer stuff
const sendEmail=async (email,subject,body)=>{

    
const transporter=nodemailer.createTransport({
    service:"gmail",
    secure:true,
    port:process.env.SMTP_PORT,
    auth:{
        user:process.env.SMTP_FROM_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }
   
})
const receiver={
    from:process.env.SMTP_FROM_EMAIL,
    to:email,
    subject:subject,
    html:body
}

transporter.sendMail(receiver,(error,emailResponse)=>{
    if(error)
    {
      return error;
    }
    else return true
    
})
}

export default sendEmail;