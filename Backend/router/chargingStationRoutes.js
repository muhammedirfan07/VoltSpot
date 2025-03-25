const express = require("express");
const router = express.Router();
const stationController = require("../controller/chargingStationController");
const multerMiddleware=require('../middleware/multerMiddleware')
const patnerAuthMiddleware = require("../middleware/PatnerAuthMiddleware");
const UserAuthoMiddleware=require("../middleware/UserAuthoMiddleare")

// add for charging stations------------------------------------------
router.post("/add-chargingStation",patnerAuthMiddleware ,multerMiddleware.single("image"),stationController.addChargingStation);

// Get all charging stations------------------------------------------
router.get("/view-charingStation",stationController.getAllStations);

//get number of station details ----------------------------------------
router.get('/admin/sationCount',stationController.getAllStationCount)

// Get a single charging station by ID--------------------------------
router.get("/view-chargingStation/:id", stationController.getStationById);

// Get all charging stations of a partner-----------------------------
router.get("/patner/partner-stations", patnerAuthMiddleware, stationController.getPartnerStations);

// Update a charging station by ID------------------------------------
router.put("/update-chargingStation/:id",patnerAuthMiddleware ,multerMiddleware.single("image"), stationController.updateStation);

// Delete a charging station by ID------------------------------------
router.delete("/delete-chargingStation/:id",patnerAuthMiddleware, stationController.deleteStation);

// Approve and reject station by ID------------------------------------
router.put("/approveRejectStation/:id",UserAuthoMiddleware, stationController.approveAndRejectStaion);

// Filtering stations by city, state, charging type, and vehicle type---------
router.get("/filter",UserAuthoMiddleware, stationController.filterStations);

// view all approved station in users ---------------------
router.get('/user/viewSations',UserAuthoMiddleware,stationController.viewAllStation)

module.exports = router;
