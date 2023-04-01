const mongoose = require('mongoose')

const referralAndEarn = mongoose.Schema({
    userCode: {
        type: String
    },
    referralCode: {
        type: String
    }
})

module.exports = mongoose.model('referralAndEarn', referralAndEarn)