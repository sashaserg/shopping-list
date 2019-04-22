const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    shopSession: {
        type: String,
        unique: true
    },
    shopItems: [Object],
    generalCost: Number,
    budget: Number
});

const ShopList = mongoose.model('ShopList', Schema);

module.exports = ShopList;
