const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const UserAuthoMiddleware = require("../middleware/UserAuthoMiddleare");

// check the avilale sloast --------------------------------
router.get("/user/slots",UserAuthoMiddleware,bookingController.getAvailableSlots)
// Routes for bookings---------------------------------------------
router.post("/user/booking",UserAuthoMiddleware,bookingController.bookSlot)
// Get all bookings---------------------------------------------
router.get("/veiw-allBooking",UserAuthoMiddleware, bookingController.getBookingHistory);
// Routes for bookings---------------------------------------------
router.post("/bookingSation", bookingController.createBooking);

// Filtering bookings by city, state, charging type, or vehicle type---------------------------------------------
router.get("/filterBooking", bookingController.filterBookings);

module.exports = router;
