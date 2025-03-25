require('dotenv').config()
const express =require('express')
const cors =require('cors')
require("./DB/dbConnection")
const http =require("http")
const {setupSocket,connectedPartners} = require("./Socket.io/socketConfig");
const Server =express()
const notific =http.createServer(Server)
const io = setupSocket(notific);
const userRouter=require("./router/userRouter")
const patnerRouter =require("./router/patenerRouter")
const bookingRouter =require("./router/bookingRoutes")
const stationRouter =require("./router/chargingStationRoutes")

// Pass io to your routes or controller
Server.use((req, res, next) => {
    req.io = io;
    next();
  });


Server.use(express.json())
Server.use(express.urlencoded({ extended: true }));
Server.use(cors())
Server.use(userRouter)
Server.use(patnerRouter)
Server.use(bookingRouter)
Server.use(stationRouter)
Server.use('/uploads',express.static('uploads'))

 // Initialize Socket.io
setupSocket(notific);

const PORT =process.env.PORT ||5000
Server.listen(PORT,()=>{
    console.log(` sever is Running Sucessfully ${PORT} 😊😊`);
    
})

Server.get("/",(req,res)=>{
    res.status(200).send(`<h1> the server is Running Successfully..😊😊</h1>`)
})


