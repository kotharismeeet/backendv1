const router = require('express').Router();
const {getAll,getVenue,deleteVenue,updateVenue,createVenue,addVendorIn,deleteVendorIn,getVendorsByVenue}
= require('../controllers/Venue');
const{getAllVenueLocations,deleteVenueLocation,createVenueLocation}=require('../controllers/VenueLocation')

/**
 * 5 Routes for Venue
 * api/venue/
 */
router.get('/all',getAll);
router.route('/:id').get(getVenue).delete(deleteVenue).put(updateVenue);
router.post('',createVenue);

/**
 * api/venue/vendor/id
 */
 router.route('vendor/:venueId').post(addVendorIn).get(getVendorsByVenue).delete(deleteVendorIn);

/**
 * api/venue/location
 */
 router.route('/location/:id').post(createVenueLocation).get(getAllVenueLocations).delete(deleteVenueLocation);

module.exports = router;