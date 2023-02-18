const mongoose = require('mongoose')

const rezarpay = mongoose.Schema({
    key :{
        type: String
    }
})

module.exports = mongoose.model('rezarpay', rezarpay)