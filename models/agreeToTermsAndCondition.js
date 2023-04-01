const mongoose = require("mongoose");

const agreeToTermsAndCondition = mongoose.Schema(
    {
        isAgreed : {
            type : Boolean
        },
        mobileNo : {
            type : String,
            unique : true
        }
    }
)

module.exports = mongoose.model('agreeToTermsAndCondition', agreeToTermsAndCondition);