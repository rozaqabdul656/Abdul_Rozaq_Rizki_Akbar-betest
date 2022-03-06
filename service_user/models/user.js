const mongoose = require("mongoose");

const user = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    identityNumber: {
        type: Number,
        required: true,
    },
    });

module.exports = mongoose.model("user", user);