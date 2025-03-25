
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    service:process.env.SERVICE,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  

  // const sendEMail = async()=>{
  //   try {
        
  //   } catch (error) {
  //     console.error("Error Sending Email:", error);
        
  //   }
  // }

  // sendEMail()

  transporter.verify((error,success)=>{
    if(error){
      console.log(error);
      
    }else{
      console.log("ready to message😍😍😍");
      console.log(success);
      
      
    }
  })
  module.exports=transporter