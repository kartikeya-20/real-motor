const mongoose = require('mongoose')

const NotificationToken = mongoose.Schema({
    token: {
        type: String
    },
})

module.exports = mongoose.model('notificationToken', NotificationToken)