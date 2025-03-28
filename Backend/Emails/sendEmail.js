const transporter =require("./emailConfig")


exports. SendVerificationCode = async(email,verificationCode)=>{
    try{
        const response = await transporter.sendMail({
            from: `"EV Station" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Email Verification - EV Charging App", // Subject line
            text: `Your verification code is: ${verificationCode}`,// plain text body
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h2 style="color: #2C3E50;">Welcome to EV Charging App! ⚡</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #E74C3C; font-size:3rem;">${verificationCode}</h1>
                    <p>Use this code to verify your email and activate your account.</p>
                    <hr />
                    <p style="font-size: 12px; color: #7F8C8D;">If you didn’t request this, please ignore this email.</p>
                </div>
            `
          });
          console.log(":::::::::Email Sent successfully::::::",response );
         
    }catch(err) {
          console.log("=============================================");
          console.log("email sending  error",err); 
          console.log("=============================================");         
    }
}

exports.WelcomeEmail = async (email,StationName)=>{
    try {
    
        const response = await transporter.sendMail({
            from: `"EV Station" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Welocome to VoltSpot", // Subject line
            text: `Verify the your Email addres now`,// plain text body
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VotSpot Partner Collaboration Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            text-align: center;
        }
        
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            padding: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Welcome to the VotSpot Partner Network! ⚡</div>
        <div class="content">
            <p>Dear <strong>${StationName}</strong>,</p>
            <p>Congratulations! 🎉 We are pleased to confirm your partnership with <strong>VotSpot</strong>.</p>
            <p>Your collaboration will help make EV charging more accessible to users.</p>
            <p>To get started, log in to your partner Login:</p>
           
            <p>If you have any questions, feel free to reach out to us.</p>
        </div>
        <div class="footer">
            © 2025 VotSpot | Empowering EV Charging Networks
        </div>
    </div>
</body>
</html>

 `
            
          });
          console.log(":::::::::Email Sent successfully::::::",response );
         
    }catch(err) {
          console.log("=============================================");
          console.log("email sending  error",err); 
          console.log("=============================================");         
    }
}



