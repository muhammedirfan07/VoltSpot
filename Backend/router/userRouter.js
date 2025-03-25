const express = require("express")
const UserController =require("../controller/userController")
const ratingController =require("../controller/ratingController")
const paymentController =require("../controller/paymentController")
const chartAndGraphController =require("../controller/chartAndGraphController")
const UserAuthoMiddleware=require("../middleware/UserAuthoMiddleare")
const router = new express.Router()

//register user and admin-------------
router.post("/Register",UserController.UserRegisterController)
// login user & admin -----------------------
router.post("/login",UserController.UserLoginController)
// get all user details - in admin dashboard----------
router.get("/admin/allUsers",UserController.getAllUearsDetails)
//get all number of users  - in admin dashboard---------
router.get("/admin/UserCount",UserController.getAllUserCount)
//get user details  - in admin dashboard---------
router.get("/user/userDetails/:id",UserAuthoMiddleware,UserController.singleUserDetails)

// add rayting and views
router.post("/addreview",UserAuthoMiddleware,ratingController.addRatingAndReviews)
// add rayting and views
router.get("/viewreview",UserAuthoMiddleware,ratingController.getallReviws)

// user payment-----------
router.post("/user/payment",paymentController.makePayment)

// admin page chart and graph 
router.get("/admin/chart",chartAndGraphController.getChartData)

module.exports=router