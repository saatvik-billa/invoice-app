const Invoice = require('../models/invoiceModel');

exports.getLoginPage = (req, res, next) => {
    res.status(200).render('login', {
        title: 'Landing Page'
    });
};

exports.getDashboard = async (req, res, next) => {
    const invoices = await Invoice.find({})    
    res.status(200).render('dashboard', {
        invoices
    });
};

exports.getInvoiceDetails = async (req, res, next) => {
    const invoice = await Invoice.find({ number: parseInt(req.params.num) });
    res.status(200).render('invoice-details', {
        invoice: invoice[0]
    })
};