const {EventVendor} = require('../models/Event.js');

/**
 * ROUTE : cant be decided
 * SECURITY : PUBLIC
 */
 const addVendorIn = async(req,res) => {
    try {
        // event or venue
        const eventId = req.params.eventId;
        const {vendorId} = req.body;
        const newVendor = await EventVendor.updateOne(
            {event: eventId},
            {"$push":{vendors: vendorId}}
        );
        if(newVendor) res.json({
            newVendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : cant be decided
 * SECURITY : PUBLIC
 */
 const deleteVendorIn = async(req,res) => {
    try {
        // event or venue
        const eventId = req.params.eventId;
        const {vendorId} = req.body;
        const deletedVendor = await EventVendor.updateOne(
            {event: eventId},
            {"$pull":{vendors: vendorId}}
        );
        if(deletedVendor) res.json({
            deletedVendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

const getVendorsByEvent = async(req,res)=>{
    try {
        const eventId = req.params.eventId;
        //const {vendorId} = req.body;
        const vendors = await EventVendor.find(
            {event: eventId}
        );
        if(vendors) return res.json({
            vendors,
            satus:200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

module.exports = {addVendorIn,deleteVendorIn,getVendorsByEvent};