const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    sSellerName: {
        type: String,
        unique:true,
        required: true
    },
    sSellerCity: {
        type: String,
        required: true
    },
    iCarId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }]
})

module.exports = mongoose.model('Seller',sellerSchema)