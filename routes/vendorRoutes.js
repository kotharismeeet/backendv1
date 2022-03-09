const router = require('express').Router();
const {getallVendors,getVendor,deleteVendor,updateVendor,createVendor,getNearbyVendor} = require('../controllers/Vendor.js');

router.get('/all',getallVendors);
router.get('/near',getNearbyVendor);
router.route('/:id').get(getVendor).delete(deleteVendor).put(updateVendor);
router.route('').post(createVendor);

module.exports = router;