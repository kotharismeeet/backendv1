const router = require('express').Router();
const {getAll,getEvent,deleteEvent,updateEvent,addEvent,} = require('../controllers/Event.js');
const {addVendorIn,deleteVendorIn,getVendorsByEvent} = require('../controllers/EventOperation.js');
const {getLocation,deleteLocation,addLocation,getLocationsByEvent,} = require('../controllers/Location.js')
// event Routes - 5
/**
 * api/event
 */
router.get('/all',getAll);
router.route('/:id').get(getEvent).delete(deleteEvent).put(updateEvent);
router.post('',addEvent);

// Event Zone Routes - 6
/**
 *  api/event/location
 */
//router.get('/location/all',getAllLocation);
router.route('/location/:id').get(getLocationsByEvent).delete(deleteLocation).post(addLocation);;

/*
 imp get zone of events
*/
// router.get('/zones/:id',getLocationsByEvent);

// Event Zone Vendor Routes - 3
/**
 * api/event/zone/vendor/id
 */

router.route('/vendorinevent/:eventId').post(addVendorIn).delete(deleteVendorIn).get(getVendorsByEvent);
module.exports = router;