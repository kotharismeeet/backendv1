const {VendorItem} = require('../models/Vendor.js');

const getToppings   = async(req,res) => {
    try {                
        const itemId = req.params.id;
        const toppings = await VendorItem.findById(
            itemId,
            {toppings: 1}
        );

        if(toppings) return res.json({
            toppings,
            status: 200
        });
        else return res.sendStatus(500);
    } catch (error) {   
        console.log(error);
        res.sendStatus(500);
    }
}
 
const createToppings = async(req,res) => {
    try {
        const itemId = req.params.id;
        const jsonObject = req.body;
        // https://docs.mongodb.com/manual/reference/operator/update/push/
        const tops = await VendorItem.updateOne(
            { _id: itemId},
            {$push: {toppings: jsonObject}}
        );
        if(tops) return res.json(tops);
        else return res.json({
            status: 500
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteToppings = async(req,res) => {
    try {
        const itemId = req.params.id;
        const toppingId = req.params.id;
        //const toppingName = req.query.name;
        // https://docs.mongodb.com/manual/reference/operator/update/pull/
        const deletedtopping = await VendorItem.updateOne(
            {_id:itemId},
            {"$pull": {"toppings": toppingId}}
        );

        if(deletedtopping) return res.sendStatus(200);
        else return res.sendStatus(500);    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateToppings = async(req, res) => {
    try {
        const itemId = req.params.id;
        const toppingId = req.params.id;
        const toppingName = req.query.name;
        const newPrice = parseInt(req.query.price);

        //https://docs.mongodb.com/manual/reference/operator/update/positional/
        const updatedtopping = await VendorItem.updateOne(
            {_id: itemId, "toppings.name" : toppingName},
            {"$set": {"toppings.$.name": toppingName}},
            {"$set": { "toppings.$.price": newPrice }}           
        );
        if(updateToppings) return res.json({
            updatedtopping,
            status: 200
        });
         else return res.sendStatus(500);      
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getToppings,
    createToppings,
    deleteToppings,
    updateToppings
}