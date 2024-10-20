const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true, default: false},
        phone:{type: Number},
        address: {type: String},
        avatar: { type: String},
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("User", userSchema);


