const mongoose = require('mongoose')

const noBoarding = mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('noBoarding', noBoarding)