const {EventLocation} = require('../models/Event');


/**
 * ROUTE : /api/vendor/zone/id
 * SECURITY : PRIVATE
 */
 const deleteLocation = async(req,res) => {
    try {
        await EventLocation.updateOne({
            event: req.params.id,
            zoneIdentifier:req.body.zoneIdentifier,
        },
        {
            $pull:{zoneName:req.body.zoneName}
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};


/**
 * ROUTE : /api/vendor/zone/id
 * SECURITY : PRIVATE
 */
 const addLocation = async(req,res) => {
    try {
        const location = await EventLocation.updateOne(
            {
                event: req.params.id,
                zoneIdentifier:req.body.zoneIdentifier
            },
            {
                $push:{zoneName:req.body.zoneName}
            })
        res.send(location)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

/**
 * ROUTE : /api/vendor/zone/id
 * SECURITY : PRIVATE
 */
 const getLocationsByEvent = async(req,res) => {
    try {
        const locations = await EventLocation.findById(req.params.id)
        res.send(locations)
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 200
        });
    }
};

module.exports = {deleteLocation,addLocation,getLocationsByEvent};