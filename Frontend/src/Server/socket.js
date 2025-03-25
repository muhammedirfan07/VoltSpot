import { io } from "socket.io-client";
import SERVER_URL from "./serverURL"; // Ensure correct import

const socket = io(SERVER_URL, {
  transports: ["websocket", "polling"], // Ensure polling is allowed
  withCredentials: true, // Allow CORS credentials
  autoConnect: false, // Prevent auto connection
});

export default socket;