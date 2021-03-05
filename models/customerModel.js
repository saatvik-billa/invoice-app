const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String, 
    active: {
        type: Boolean,
        default: true
    },
    street_address: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    date_registered: {
        type: Date,
        default: Date.now()
    },
    email: String
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer; 