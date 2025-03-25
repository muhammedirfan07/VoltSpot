const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true  
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Only allow 'user' or 'admin'
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to the current date and time
    }
});

// Hash the password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const users = mongoose.model("users", UserSchema);
module.exports = users;