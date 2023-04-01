const mongoose = require('mongoose')

const Notification = mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "userdetails"
    }
})

module.exports = mongoose.model('notification', Notification)