const express = require('express'); 

const customerController = require('../controllers/customerController'); 

const router = express.Router(); 

router.route('/')
    .post(customerController.createCustomer)
    .get(customerController.getAllCustomers)
    
module.exports = router; 