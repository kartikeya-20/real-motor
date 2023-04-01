const mongoose = require("mongoose");

const venderSchema = mongoose.Schema({
    workshopName: {
        type: String,
        default: ""
   },
    ownerName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    workshopAddress:{
        type: String,
        default: ""
    },
    lat: {
        type: String,
        default: ""
    },
    long: {
        type: String,
        default: ""
    },
    gstImage: {
        type: String,
        default: ""
    },
    panCartImage: {
        type: String,
        default: ""
    },
    gumastadharaImage:{
        type: String,
        default: ""
    },
    venderStatus:{
        type: Number,
        default: 1
    },
    panCartNumber:{
        type: String,
        default: ""
    },
    gstNumber: {
        type: String,
        default: ""
    },
    fcm: {
        type: String,
        default: ""
    }
    // 1 not verified
    // 2 verified
    // 3 rejected
    // 4 documnet Verified waiting
});

module.exports = mongoose.model("venderDetails", venderSchema);
