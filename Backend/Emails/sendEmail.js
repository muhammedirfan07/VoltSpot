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
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" lang="en">
              <head>
                <link
                  rel="preload"
                  as="image"
                  href="https://react-email-demo-7csr9hg71-resend.vercel.app/static/koala-logo.png" />
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                <meta name="x-apple-disable-message-reformatting" />
                <!--$-->
              </head>
              <body
                style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
                <div
                  style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
                  The sales intelligence platform that helps you uncover qualified leads.
                  <div>
                     ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
                  </div>
                </div>
                <table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
                  <tbody>
                    <tr style="width:100%">
                      <td>
                        <img
                          alt="Koala"
                          height="50"
                          src="https://react-email-demo-7csr9hg71-resend.vercel.app/static/koala-logo.png"
                          style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
                          width="170" />
                        <p style="font-size:16px;line-height:26px;margin:16px 0">
                          Hi
                          <!-- -->${StationName}<!-- -->,
                        </p>
                        <p style="font-sizStationNamee:16px;line-height:26px;margin:16px 0">
                          Welcome to VoltSport , the sales intelligence platform that helps you
                          uncover qualified leads and close deals faster.
                        </p>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="text-align:center">
                          <tbody>
                            <tr>
                              <td>
                                <a
                                  href="https://getkoala.com"
                                  style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px"
                                  target="_blank"
                                  ><span
                                    ><!--[if mso]><i style="mso-font-width:300%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span
                                  ><span
                                    style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                                    >Get started</span
                                  ><span
                                    ><!--[if mso]><i style="mso-font-width:300%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
                                  ></a
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-size:16px;line-height:26px;margin:16px 0">
                          Best,<br />The VoltSport team
                        </p>
                        <hr
                          style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                        <p
                          style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">
                          470 Noor Ave STE B #1148, South San Francisco, CA 94080
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--/$-->
              </body>
            </html>`
            
          });
          console.log(":::::::::Email Sent successfully::::::",response );
         
    }catch(err) {
          console.log("=============================================");
          console.log("email sending  error",err); 
          console.log("=============================================");         
    }
}



