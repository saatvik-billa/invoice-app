const express = require('express');

const viewsController = require('../controllers/viewsController');

const router = express.Router(); 

router.get('/', viewsController.getLoginPage)
router.get('/dashboard', viewsController.getDashboard)
router.get('/invoice-details/:num', viewsController.getInvoiceDetails)

module.exports = router; 