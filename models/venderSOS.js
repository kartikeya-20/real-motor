const mongoose = require("mongoose");

const venderSOS = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref:"userdetails"
    },
    venderId: {
        type: mongoose.Types.ObjectId,
        ref: "venderdetails"
    },
    dateTime: [{
        type:String
    }],
    sosId: {
        type: mongoose.Types.ObjectId,
        ref: "sos"
    }
    });

module.exports = mongoose.model("venderSOS", venderSOS);
