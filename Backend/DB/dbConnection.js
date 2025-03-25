const mongoose=require("mongoose")

const DataBaseConnection =process.env.DATABASE

mongoose.connect(DataBaseConnection).then(res=>{
    console.log("the MongoDB Connected successfully....👍👍"); 
}).catch(error=>{
    console.log("the mongoDb Connection is Falied...👎👎");
    
})

