const mongoose = require('mongoose'); 
const seedrandom = require('seedrandom');

const invoiceSchema = new mongoose.Schema({
    number: Number,
    reason: String,
    status: {
        type: String,
        default: 'Active'
    },
    date_created: {
        type: Date, 
        default: Date.now()
    }, 
    date_paid: Date,
    balance_due: Number,
    date_updated: Date,
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer'
    },
    items: Array,
    due_date: Date
});

invoiceSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'customer',
        select: 'name'
    });
    next(); 
});

invoiceSchema.pre('save', function(next) {
    let rng = seedrandom()() + '';
    this.number = parseInt(rng.replace('0.', ''));
    next(); 
});

const Invoice = mongoose.model('Invoice', invoiceSchema); 
module.exports = Invoice;