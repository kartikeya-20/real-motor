const mongoose = require("mongoose");

const memberShip = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    timeTimit: {
        type: String
    },
    price: {
        type: String
    },
    totalMonth: {
        type: String
    },
    service: [
        {
            serviceId: {
                type: mongoose.Types.ObjectId,
                ref: "RegulerServices"
            },
            serviceName: {
                type: String
            },
            qty: {
                type: String
            },
            discount: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model("membership", memberShip);
