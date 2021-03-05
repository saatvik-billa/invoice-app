const express = require('express'); 

const invoiceController = require('../controllers/invoiceController')

const router = express.Router(); 

router.route('/')
    .post(invoiceController.createInvoice)
    .get(invoiceController.getInvoice)

module.exports = router; 