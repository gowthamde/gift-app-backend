const mongoose = require('mongoose');
const giftSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    noOfItemsSold: {
        type: Number,
        required: true
    },
    occasion: {
        type: String,
        required: true
    },
    matchFor: {
        type: String,
        required: true
    },
    image: {
        data: Buffer, contentType: String
    },
    imageName: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Gift', giftSchema);