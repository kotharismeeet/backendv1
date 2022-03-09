const {Venue} = require('../models/Venue.js');

/**
 * 
 */

const getAll = async(req,res) => { 
    try {
        const allVenues=await Venue.find();
        res.status(200).json(allVenues);
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
};

/**
 * 
 */

const getVenue = async(req,res) => {
    try {
        const venue=await Venue.findById(req.params.id);
        //If venue not found
        if(!venue){             
            res.send(400)
            throw new Error('Venue not found')
        }
        res.status(200).json(venue);
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

/**
 * 
 */

 const deleteVenue = async(req,res) => {
    try {
        const venue=await Venue.findById(req.params.id)
        //If venue is not found
        if(!venue){
            res.send(400)
            throw new Error('Venue not found')
        }
        await venue.remove()
        res.status(200).json({id:req.params.id})
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

/**
 * 
 */

 const updateVenue = async(req,res) => {
    try {
        const venue=await Venue.findById(req.params.id)
        //If venue not found
        if(!venue){
            res.send(400)
            throw new Error('Venue not found')
        }
        const updatedVenue=await Venue.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(200).json(updatedVenue)
        
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

/**
 * 
 */

 const createVenue = async(req,res) => {
    try {
        const venue = await Venue.create({
        name:req.body.name,
        location:req.body.location,
        postcode:req.body.postcode,
        isActive:req.body.isActive,
        openingTime:req.body.openingTime,
        closingTime:req.body.closingTime,
        address:req.body.address,
        city:req.body.city,
        country:req.body.country
        })
       res.status(200).json(venue)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        })
    }
};

const {addVendorIn,deleteVendorIn,getVendorsByVenue} = require('./VenueOperation.js');

module.exports = {getAll,getVenue,deleteVenue,updateVenue,createVenue,addVendorIn,getVendorsByVenue,deleteVendorIn};