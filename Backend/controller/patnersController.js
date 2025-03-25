const patners =require("../Models/PatnerModal")
const jwt =require("jsonwebtoken")
const bcrypt =require("bcrypt")
const generateVerificationCode =require("../util/generateVerificationCode")
const {WelcomeEmail, SendVerificationCode} =require("../Emails/sendEmail");
const notifications = require("../Models/notificationModal");

//patner register -------------------------
exports.patnersRegisterController =async(req,res)=>{
    console.log(("inside the  patnersRegisterController.....🫴🫴🫳"));
     const {StationName,email,password,address}=req.body
     console.log(req.body)
     try{
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)){
                return res.status(400).json({ statuse:false, message:" invalid email formate"})
            }
            console.log(email);
            const existing= await patners.findOne({email})
            console.log("existing user:",existing)
            if(existing){
                res.status(406).json({status:false, message:" alreadry existing please login..."})   
            }else{
                // bycrpy
                const hashPassword = bcrypt.hashSync(password, 10);
                //verifation code
                const verificationCode =generateVerificationCode()
                const newPaters = new patners({
                    StationName
                    ,email
                    ,password:hashPassword,
                    verificationCode:verificationCode
                    ,address})
                await newPaters.save()
                SendVerificationCode(newPaters.email,verificationCode)
                res.status(200).json({message:" succcessfully registerd ",status:true, patner:newPaters })
            } 
     }catch(err){
        res.status(404).json(err)
     }
    
}
//////////////////////////////////////////////////////////////////////////

//partner login --------------------------
exports.patnerLoginController = async (req, res) => {
    console.log("Inside the patnerLoginController..🙌🙌🙌");
    const { email, password } = req.body;

    try {
        const existingPatner = await patners.findOne({ email });
        console.log("Found Partner:", existingPatner);

        if (!existingPatner) {
            return res.status(400).json({ status: "failed", message: "Invalid Credentials. Try again!" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, existingPatner.password);
        if (!isPasswordValid) {
            return res.status(406).json({ status: "failed", message: "Incorrect Email/Password. Try again!" });
        }

        // Check if email is verified
        if (!existingPatner.isVerified) {
            return res.status(406).json({ status: "failed", message: "Email is not Verified. Try again!" });
        }
            
         // Generate JWT token
         const tokenPayload = {
            partnerId: existingPatner._id, 
            role: "partner"
        };
        console.log("Token Payload:", tokenPayload);

        // Generate JWT token
        const token = jwt.sign(
            tokenPayload,
            process.env.JWTPASSWORD,
            { expiresIn: "7d" } // Token expires in 7 days
        );

        return res.status(200).json({
            status: "success",
            partner: existingPatner,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ status: "failed", message: "Something went wrong. Try again later." });
    }
};
//////////////////////////////////////////////////////////////////////////////

//patner registre verify email controller----------------------------------------------
exports. verifyEmailController= async(req,res)=>{
    console.log("inside the verify email contoller...📩📩📩📩");
    const {code}=req.body
    try {
        // const verificationCode = generateVerificationCode()
        const verifedPatenr =await patners.findOne({
            verificationCode:code
        })
        if(!verifedPatenr){
            return res.status(406).json({status:false,message:"expared the time..."})
        }
        verifedPatenr.isVerified=true,
        verifedPatenr.verificationCode=undefined
        await verifedPatenr.save()
        //send welcome email --------------
        await WelcomeEmail(verifedPatenr.email,verifedPatenr.StationName)
        console.log("==========================================");
        console.log("email verify succesfull");
        console.log("=========================================="); 
        return res.status(200).json({success:true,message:"Email verifed successfully ..📨📨📨"})
    } catch (error) {
      res.status(404).json(err)
    }
}
/////////////////////////////////////////////////////////////////////////////

exports.checkPtnerAuthoContoller =async(req,res)=>{
   console.log("inside the checkPtnerAuthoContoller...✔️✔️✔️")
    try{
        const checkAutho= await patners.findById(req.partnerId)
        if(!checkAutho){
            return res.status(400).json({success:false,message:"patner is no founded"})
        }else{
            res.status(200).json({success:true, partner: { ...checkAutho._doc, password: undefined }})
        }
    }catch(err){
        return res.status(400).json({success:false,message:"patner is no founded"})
    }

}

//////////////////////////////////////////////////////////////////////////////
//get all patners--------------------
exports.viewAllPatnersController =async(req,res)=>{
    console.log("inside the ViewAll Patener Controller...😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️")
    try{
        const allPatners =await patners.find({})
        res.status(200).json(allPatners)
        console.log(allPatners);
        
    }catch(err){
        res.status(404).json(err)
    }
}
/////////////////////////////////////////////////////

//get the all count of patners---------------------
exports.getAllPatnerCount =async(req,res)=>{
    console.log("inside the all user cound.......");
    try{
        const numberOfPatner = await patners.countDocuments({})
        res.status(200).json({conunt:numberOfPatner})
    }catch(err){
        res.json(err)
    }
    
}
///////////////////////////////////////////////////////////////

// get notification approved and rejected-----------------------
exports.getallNotifiaction= async (req,res)=>{
    console.log("inside the  get notifcation ..");
    try {
        const notification = await notifications.find({ partnerId: req.partnerId });
    res.status(200).json(notification); // Ensure this is an array 
       console.log("notifations :",notification);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
}
////////////////////////////////////////////////////////////////
// delect a notifications---------------------------------
exports.deleteNotification = async (req, res) => {
    console.log("Inside deleteNotification...");
    try {
      const { id } = req.params;
      const deletedNotification = await notifications.findByIdAndDelete(id);
      if (!deletedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notification", error });
    }
  };

// delect all notifations -------------
exports.deleteAllNotifications = async (req, res) => {
    console.log("Inside deleteAllNotifications...");
    try {
      const { partnerId } = req;
      await notifications.deleteMany({ partnerId });
      res.status(200).json({ message: "All notifications deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notifications", error });
    }
  };