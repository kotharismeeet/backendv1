const { default: mongoose } = require('mongoose');
const {Event} = require('../models/Event.js');

/**
 * ROUTE : cant be decided
 * SECURITY : PUBLIC
 */
 const addVendorIn = async(req,res) => {
    try {
        // event or venue
        const eventId = req.params.eventId;
        const {vendorId} = req.body;
        const newVendor = await Event.updateOne(
            {_id: eventId},
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
        const deletedVendor = await Event.updateOne(
            {_id: eventId},
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
        let eventId = mongoose.Types.ObjectId(req.params.eventId);
        //const {vendorId} = req.body;
        const vendors = await Event.aggregate([
            {$match : {_id: eventId}},
            {$project: {vendors: 1}},
            {$project:{_id:0}}
        ]);
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