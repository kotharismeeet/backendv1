const {Vendor} = require('../models/Vendor.js');

const getallVendors = async (req,res) => {
    try {
        const vendor = await Vendor.find({});

        return res.json({
            vendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error,
            status: 500
        });
    }
};

const getVendor = async (req,res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await Vendor.findById({_id:vendorId});

        if(!vendor) return res.sendStatus(404);

        return res.json({
            vendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error,
            status: 500
        });
    }
};
const deleteVendor = async (req,res) => {
    try {
        const vendorId = req.params.id;
        const vendor = await Vendor.findByIdAndDelete({_id:vendorId});

        if(!vendor) return res.sendStatus(404);

        return res.json({
            vendor,
            status: 200
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error,
            status: 500
        });
    }
};
const createVendor = async(req,res) => {
    try {
        
        const {restauarant_official_name,display_name,city,registered_email,description,address,country,postal_code,contact_no,location}=req.body;
        
        if(!restauarant_official_name || !display_name || !city
            || !registered_email || !description || !address || 
            !country || !postal_code || !contact_no) return res.sendStatus(403);

        const vendorExists = await Vendor.findOne({registered_email});
        if(vendorExists) return res.sendStatus(403);

        let vendor = await Vendor.create(req.body);

        /*vendor.aggregate([
            {$project: {}}
        ])*/

        if(vendor) {
            return res.send({
                vendor,
                status: 200
            });
        }

    } catch (error) {
        console.log(error);
        return res.send({
            error,
            status: 200
        })        
    }
};
const updateVendor = async (req,res) => {
    try {
        const vendorId = req.params.id;
        
        const {restauarant_official_name,display_name,city,registered_email,description,address,country,postal_code,contact_no,location}=req.body;
        
        if(!restauarant_official_name || !display_name || !city
            || !registered_email || !description || !address || 
            !country || !postal_code || !contact_no) return res.sendStatus(403);

        const vendorExists = await Vendor.findById({_id:vendorId});
        if(!vendorExists) return res.sendStatus(403);

        let vendor = await Vendor.updateOne({registered_email:registered_email},req.body);

        /*vendor.aggregate([
            {$project: {}}
        ])*/

        if(vendor) {
            return res.send({
                
                status: 200
            });
        }

    } catch (error) {
        console.log(error);
        return res.send({
            error,
            status: 200
        })        
    }
};

const getNearbyVendor = async (req,res) => {    

    try {
        const maxDistance = parseFloat(req.query.distance);
        const lng = parseFloat(req.query.lng);
        const lat = parseFloat(req.query.lat); 
        const coordinates = [lng,lat];
        
        console.log(coordinates,maxDistance);

        
        const nearVendors = await Vendor.find({
            $near: {
                $geometry: {
                   type: "Point" ,
                   coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }).limit(3);
        
        /*let nearVendors = await Vendor.aggregate([
            
            {$geoNear: {
                "spherical": true,
                "near": coordinates,                
                "maxDistance": maxDistance,                
                "distanceField": 'distance'
            }},
            {$limit: 3}
        ]);*/

        return res.json({
            nearVendors,
            satus: 200
        })
        
    } catch (error) {
        console.log(error);
        return res.send({
            error,
            status: 500
        });
    }
};

module.exports = {getallVendors,getVendor,deleteVendor,updateVendor,createVendor,getNearbyVendor};