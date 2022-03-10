const {Venue} = require('../models/Venue.js');


const getAllVenueLocations = async(req,res) => { 
    try {
        const allVenueLocations=await Venue.find(
            {_id:req.params.id},
            {zoneIdentifier:1,zoneName:1}
        );
        res.status(200).json(allVenueLocations);
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
};

const deleteVenueLocation = async(req,res) => {
    try {
        const venueLocation=await Venue.findByIdAndDelete(req.params.id)
        //If venue location is not found
        if(!venueLocation){
            res.send(400)
            throw new Error('Venue Location not found')
        }
        res.status(200).json({id:req.params.id})
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

const createVenueLocation = async(req,res) => {
    try {
        const venueLocation = await Venue.updateOne(
            {
                _id:req.params.id,
            },
            {
                zoneIdentifier: req.body.zoneIdentifier,
                zoneName:req.body.zoneName
            }
        )
       res.status(200).json(venueLocation)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};


module.exports = {getAllVenueLocations,deleteVenueLocation,createVenueLocation};