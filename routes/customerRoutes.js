const express = require('express');
const router = express.Router();
const {getCustomerById, getCustomers, deleteCustomerById,registerCustomer, updateCustomer} = require('../controllers/Customer.js');

//router.get('', getCustomerById);
router.get('/all',getCustomers);
router.delete('',deleteCustomerById);
router.post('',registerCustomer);
router.put('',updateCustomer);

router.get('/:id',getCustomerById);

module.exports = router;