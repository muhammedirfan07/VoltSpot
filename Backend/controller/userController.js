const users=require("../Models/UserModal")
const jwt= require("jsonwebtoken")
const bcrypt =require("bcrypt");

//register================================================================================================================================================
exports.UserRegisterController = async (req, res) => {
    console.log("Inside UserRegisterController...😍😍");
    const { fullName, email, password, confirmPassword, role } = req.body;

    try {
        // Validate input fields
        if (!fullName || !email || !password || !confirmPassword) {
            return res.status(401).json({ error: "All fields are required" });
        }
         // Validate email format using RegEx
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!emailRegex.test(email)) {
             return res.status(400).json({ error: "Invalid email format" });
         }

        // Ensure passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const existUser = await users.findOne({ email });
        if (existUser) {
            return res.status(406).json({ error: "Account already exists, please log in 💕💕" });
        }

        // Set user role (default: 'user')
        const newUser = new users({ fullName, email, password, role: role || "user" });

        // Save the user
        await newUser.save();
        res.status(200).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
//=====================================================================================================================================================

// login =============================================================================================================================================
exports.UserLoginController = async (req, res) => {
    console.log("Inside UserLoginController...😎😎");

    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email });

        if (!existUser) {
            return res.status(406).json({ message: "Incorrect Email/Password. Try again!" });
        }

        // Check if the user is an admin
        if (existUser.role === "admin") {
            // Admin login without bcrypt password hashing
            if (password !== existUser.password) {
                return res.status(400).json({ message: "Incorrect Email/Password. Try again!" });
            }
        } else {
            // User login (with bcrypt password hashing)
            let passwordMatching = await bcrypt.compare(password, existUser.password);
            if (!passwordMatching) {
                return res.status(400).json({ message: "Incorrect Email/Password. Try again!" });
            }
        }

        // Generate token
        const token = jwt.sign(
            { userId: existUser._id, role: existUser.role },
            process.env.JWTPASSWORD,
            { expiresIn: "7d" }
        );

        console.log(`Token: ${token}`);
        res.status(200).json({ user: existUser, token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
// ======================================================================================================================================================

//get all user details====================================================================================================================================
exports.getAllUearsDetails= async(req,res)=>{
    console.log("inside  getAllUears....")
    try{
        const allUsers =await users.find({ role:"user"})

        res.status(200).json(allUsers)
    }catch(error){
        res.status(200).json(error)
    }
}
//=======================================================================================================================================================

// get number of user count==============================================================================================================================
exports.getAllUserCount =async(req,res)=>{
    console.log("inside the all user cound.......");
    try{
        const numberOfUsers = await users.countDocuments({role:"user"})
        res.status(200).json({conunt:numberOfUsers})
    }catch(err){
        res.json(err)
    }
    
}

// get single user details  uses authontiction and id
exports.singleUserDetails =async(req,res)=>{
    console.log("inside the user details controller ..👤👤👤");
   
    try {
        const  userId=req.userId
        console.log("userid :",userId);
        
        const userDetails = await users.findById(userId)
            res.status(200).json(userDetails)
            console.log( "user Details :",userDetails); 
    } catch (error) {
        res.status(406).json(error)
    }
    
}

