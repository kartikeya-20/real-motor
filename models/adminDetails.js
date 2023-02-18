const mongoose = require("mongoose");

const adminDetails = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model("adminDetails", adminDetails);
