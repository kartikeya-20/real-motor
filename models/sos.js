const mongoose = require("mongoose");

const sos = mongoose.Schema({
    
    sosTitle : {
        type: String
    },
    icon: {
        type: String
    },
    basePrice: {
        type: String
    },
    advancePrice: {
        type: String
    },
    incusion: [{
        type: String
    }]
});

module.exports = mongoose.model("sos", sos);
