const express =require("express")
const patnersController =require("../controller/patnersController")
const PatnerAuthMiddleware = require("../middleware/PatnerAuthMiddleware")

const router= new express.Router()


// patnerRegister --------------------------------------------------------------------------
router.post("/patner/patnerRegister",patnersController.patnersRegisterController)
// Vrify patners email --------------------------------------------------------------------------
router.post("/patner/verfiyemail",patnersController.verifyEmailController)
//patner login ----------------------------------------------------------------------------
router.post("/patner/patnerlogin",patnersController.patnerLoginController)
//path check authorized or not use middleware----------------------------------------------
router.get("/patner/checkPather-autho",PatnerAuthMiddleware,patnersController.checkPtnerAuthoContoller)
//get all patners details-------------------------------------------------------------------
router.get("/admin/viewAllPatener",patnersController.viewAllPatnersController)
// get number of patners---------------------------------------------------------------------
router.get("/admin/patnerCount",patnersController.getAllPatnerCount)

// notifation get 
router.get ("/notifications",PatnerAuthMiddleware,patnersController.getallNotifiaction)
// delect single notification
router.delete("/notifications/:id", PatnerAuthMiddleware, patnersController.deleteNotification);
// delect all notifations
router.delete("/notifications", PatnerAuthMiddleware, patnersController.deleteAllNotifications);








module.exports=router