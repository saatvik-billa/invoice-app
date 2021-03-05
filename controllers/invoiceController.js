const Invoice = require('../models/invoiceModel');
const Customer = require('../models/customerModel');

exports.createInvoice = async(req, res) => {
    const cust = await Customer.find({ name: req.body.customer });
    req.body.customer = cust[0]._id;

    const doc = await Invoice.create(req.body); 

    res.status(201).json({
        status: "success",
        message: "it worked ??? thats awk... 👁👄👁",
        data: {
            doc
        }
    });
};

exports.getInvoice = async(req, res) => {
    const doc = await Invoice.find({}); 
    res.status(201).json({
        status: "success",
        message: "it worked ??? thats awk... 👁👄👁",
        data: {
            doc
        }
    });
};