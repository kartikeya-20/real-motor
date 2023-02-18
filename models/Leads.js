const mongoose = require('mongoose')

const applyJobSchema = mongoose.Schema({
  xlsm: {
   type: String
  }

})

module.exports = mongoose.model('lead', applyJobSchema)