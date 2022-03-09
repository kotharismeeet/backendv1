const {Event,EventZone,EventZoneVendor} = require('../models/Event');

/**
 * ROUTE : /api/vendor/all
 * SECURITY : PUBLIC
 */
const getAll = async(req,res) => {
    try {
        let pages = req.query.page
        pages = pages-1
        const records = parseInt(req.query.recordsPerPage)
        // const key = req.query.key
        const pass = req.query.pass
        // const order = req.query.order
        const events = await Event.aggregate([
            {$match: {name :{$regex: pass, $options: "i"}}},
            {$skip: pages*records},
            {$limit: records},

        ])
        res.json([events,{"total records":events.length}])
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/id
 * SECURITY : PUBLIC
 */
 const getEvent = async(req,res) => {
    try {
        const events = await Event.find(req.params.id) 
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/id
 * SECURITY : PRIVATE
 */
 const addEvent = async(req,res) => {
    try {
        const events = await Event.create(req.body)
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/all
 * SECURITY : PRIVATE
 */
 const updateEvent = async(req,res) => {
    try {
        const events = await Event.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // const event = await req.body
        res.json(events)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/all
 * SECURITY : PUBLIC
 */
 const deleteEvent = async(req,res) => {
    try {
        await Event.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

// const {getLocation,deleteLocation,addLocation,getLocationsByEvent}
// = require('./Location.js');

// const {addVendorIn,deleteVendorIn} = require('./Operation.js');

module.exports = {getAll,getEvent,deleteEvent,updateEvent,addEvent,}
    // getLocation,deleteLocation,addLocation,getLocationsByEvent,
    // addVendorIn,deleteVendorIn};