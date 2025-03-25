const { Server } = require("socket.io");
const connectedPartners = {}; // Store connected partners
const setupSocket = (notific) => {
  const io = new Server(notific, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Register Partner Connection
    socket.on("registerPartner", (partnerId) => {
      if (partnerId) {
        connectedPartners[partnerId] = socket.id;
        console.log(`Partner Registered: ${partnerId} - Socket ID: ${socket.id}`);
        io.emit("updatePartnerStatus", { partnerId, status: "Active" }); // Broadcast Active Status
      }
    });

    // Handle Partner Disconnection
    socket.on("disconnect", () => {
      let disconnectedPartner = null;
      for (let partnerId in connectedPartners) {
        if (connectedPartners[partnerId] === socket.id) {
          disconnectedPartner = partnerId;
          delete connectedPartners[partnerId];
          break;
        }
      }

      if (disconnectedPartner) {
        io.emit("updatePartnerStatus", { partnerId: disconnectedPartner, status: "Inactive" }); // Broadcast Inactive Status
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = { setupSocket, connectedPartners };