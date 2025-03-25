const Booking = require("../Models/bookingModel");
const evstations = require("../Models/evChargingStationModel");

// -----------------------------get  avilable solat ---------------------------------------------
exports. getAvailableSlots = async (req, res) => {
  console.log("inside the avilable sloat...✔️✔️");
  
  try {
    const { stationId, startTime, duration } = req.query;

    if (!stationId || !startTime || !duration) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const endTime = new Date(new Date(startTime).getTime() + duration * 60 * 60 * 1000);

    // Get all booked slots for this station and time range
    const bookedSlots = await Booking.find({
      stationId,
      status: "confirmed",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping bookings
      ],
    }).select("slotNumber");

    const bookedSlotNumbers = bookedSlots.map((booking) => booking.slotNumber);

    // Get total slots for the station
    const station = await evstations.findById(stationId).select("availableSlots");

    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Calculate available slots
    const allSlots = Array.from({ length: station.availableSlots }, (_, i) => i + 1);
    const availableSlots = allSlots.filter(slot => !bookedSlotNumbers.includes(slot));

    res.status(200).json({ availableSlots });
    console.log("slot:",availableSlots);
    
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//////////////////////////////////////////////////////////////////////
// ----------------------------------booking sloat ----------------------------------------------------
exports. bookSlot = async (req, res) => {
  try {
    console.log("inside the booking sloat..💜💜");
    
    const { userId, stationId, slotNumber, startTime, duration } = req.body;

    if (!userId || !stationId || !slotNumber || !startTime || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const endTime = new Date(new Date(startTime).getTime() + duration * 60 * 60 * 1000);

    // Check if slot is already booked
    const existingBooking = await Booking.findOne({
      stationId,
      slotNumber,
      status: "confirmed",
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping bookings
      ],
    });
    
    console.log("existingBooking :" ,existingBooking);
    

    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked for this time" });
    }

    // Get station details for pricing
    const station = await evstations.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Calculate price
    const totalPrice = station.pricePerHour * duration;

    // Create booking
    const newBooking = new Booking({
      userId,
      stationId,
      slotNumber,
      startTime,
      duration,
      totalPrice,
      endTime,
      status: "confirmed",
    });
    console.log("newBooking",newBooking);
    

    await newBooking.save();

    res.status(200).json({ message: "Slot booked successfully", booking: newBooking });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/////////////////////////////////////////////////////////////////////////

//---------------------------- view history---------------------------------------------------------
exports.getBookingHistory = async (req, res) => {
  console.log("inside the booking history..📃📃");

  try {
    const { userId } = req.query;
    console.log("userid :", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch booking history with station details
    const bookings = await Booking.find({ userId })
      .populate("stationId", "stationName city state") // Populate station details
      .select("stationId slotNumber startTime endTime duration totalPrice status"); // Include the required fields

    if (!bookings.length) {
      return res.status(404).json({ message: "No booking history found" });
    }

    res.status(200).json({ bookings });
    console.log("history :", bookings);
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//////////////////////////////////////////////////////////////////////////////////












//  Create a new booking------------------------------------------
exports.createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking confirmed", data: savedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//////////////////////////////////////////////////////////////////////////////////////

//  Get all bookings---------------------------------------------------
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("stationId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////////

//  Filter bookings by city, state, charging type, or vehicle type------------------------------------------
exports.filterBookings = async (req, res) => {
  try {
    const { city, state, chargingType, vehicleType } = req.query;
    let filter = {};

    if (chargingType || vehicleType) {
      const stations = await EVChargingStation.find({ chargingType, vehicleType });
      filter.stationId = { $in: stations.map(station => station._id) };
    }

    if (city) filter.city = city;
    if (state) filter.state = state;

    const bookings = await Booking.find(filter).populate("stationId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//////////////////////////////////////////////////////////////////////////////////////
