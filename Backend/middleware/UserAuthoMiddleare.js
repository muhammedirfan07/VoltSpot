const jwt = require("jsonwebtoken");

const UserAuthoMiddleware = (req, res, next) => {
    console.log("Inside the UserAuthoMiddleware.....💕💕");

    // Check if authorization header exists
    if (!req.headers["authorization"]) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const response = jwt.verify(token, process.env.JWTPASSWORD);
        
        if (response.role !== "user" && response.role !== "admin") {
            return res.status(403).json({ message: "Access denied for non-users" });
        }

        req.userId = response.userId;
        req.role = response.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid authorization" });
    }
};

module.exports = UserAuthoMiddleware;
