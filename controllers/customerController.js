const Customer = require('../models/customerModel');

exports.createCustomer = async(req, res) => {
    const doc = await Customer.create(req.body); 
        
    res.status(201).json({
        status: "success",
        message: "it worked ??? thats awk... 👁👄👁",
        data: {
            doc
        }
    });
};

exports.getAllCustomers = async(req, res) => {
    const doc = await Customer.find({});
    
    res.status(201).json({
        status: "success",
        message: "it worked ??? thats awk... 👁👄👁",
        data: {
            doc
        }
    });
};