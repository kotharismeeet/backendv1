const {VendorItem} = require('../models/Vendor.js');

const getVariants   = async(req,res) => {
    try { 
        const itemId = req.params.id;
        const variants = await VendorItem.findById(
            itemId,
            {variants: 1}
        );

        if(variants) return res.json({
            variants,
            status: 200
        });
        else return res.sendStatus(500);
    } catch (error) {   
        console.log(error);
        res.sendStatus(500);
    }
}
 
const createVariants = async(req,res) => {
    try {
        const itemId = req.params.id;
        const jsonObject = req.body;
        // https://docs.mongodb.com/manual/reference/operator/update/push/
        const newVariant = await VendorItem.updateOne(
            {_id:itemId},
            {$push: {variants: jsonObject}}
        );
        if(newVariant) return res.json(newVariant);
        else return res.json({
            status: 500
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteVariants = async(req,res) => {
    try {
        const itemId = req.params.id;
        const variantId = req.params.variantId;
        //const variantName = req.query.name;
        // https://docs.mongodb.com/manual/reference/operator/update/pull/
        const deleteVariant= await VendorItem.updateOne(
            {_id: itemId},
            {"$pull": {"variants": variantId}}
        );
        console.log(deleteVariant);
        if(deleteVariant) return res.sendStatus(200);
        else return res.sendStatus(500);    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateVariants = async(req, res) => {
    try {
        const itemId = req.params.id;
        const variantName = req.query.name;
        const newPrice = parseInt(req.query.price);
        console.log(newPrice);
        //https://docs.mongodb.com/manual/reference/operator/update/positional/
        const updatedVariant = await VendorItem.updateOne(
            {_id: itemId, "variants.variantName" : variantName},
            {"$set": {"variants.$.variantName": variantName}},
            {"$set": { "variants.$.variantPrice": newPrice }}
        );
        if(updatedVariant) return res.json({
            updatedVariant,
            status: 200
        });
         else return res.sendStatus(500);      
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {getVariants, createVariants, deleteVariants, updateVariants};