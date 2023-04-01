const mongoose = require('mongoose')

const userDetails = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    phoneNo: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    address: {
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
    randomNo: {
        type: String,
        default: ""
    },
    wallet: {
        type: String,
        default: "0"
    },
    image: {
        type: String,
        default: ""
    },
    emailToken: {
        type: String,
        default:""
    },
    fcm: {
        type: String,
        default: ""
    },
    refferalPoint:{
        type: String,
        default: "0"
    },
    memberShipStatus: {
        type: Number,
        default: 0
        // 0 No MemberShip
        // 1 memberShip
    },
    gender: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('userDetails', userDetails)