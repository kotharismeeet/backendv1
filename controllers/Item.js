const {VendorItem} = require('../models/Vendor.js');
const asynchandler = require('express-async-handler');

// /api/vendor
const getAllItems = asynchandler( async(req,res) => {
    try {
        // text operator
        const onlyAvailable = req.query.inStock;
        const bool = onlyAvailable === 'true'?true:false;
        
        // logical operators
        const searchText = req.query.searchText.toString();
        const ltePrice = req.query.maxPrice;
        const gtePrice = req.query.minPrice || 0;
        
        // field sorting
        const key= req.query.key;
        const order= parseInt(req.query.type);
        // pagination 
        //if we want by just number of rows $slice operators can be used we have to skip also
        const numberOfRows = parseInt(req.query.numberOfRows);
        const pageNo = parseInt(req.query.pageNo);

        console.log(searchText);
        
        const items = await VendorItem.find({
            inStock: bool,
            $lte: {price:ltePrice},
            $gte : {price:gtePrice},
            $match: {"$item": {$regex: searchText}}
        }).sort({[key]:order}).skip((pageNo-1)*numberOfRows).limit(numberOfRows);   
        

        return res.send({
            items,
            status: 200
        });  
    } catch (error) {
        console.log(error);
        res.send({
            error,
            status: 500
        })
    } 
});

const getItemById = asynchandler( async (req,res) => {
    try {
        const _id = req.params.itemId;
        console.log(_id);
        const item = await VendorItem.findById({_id});
        return res.send({
            item,
            status: 200
        });  
    } catch (error) {
        console.log(error);
        res.send({
            error,
            status: 500
        })
    }
}); 

// api/vendor/category/:categoryId
const getItemsByCategory = asynchandler( async(req,res) => {
    try {
        const categoryId = req.params.categoryId;
        //console.log(categoryId);
        const items = await VendorItem.find({category: categoryId});
        return res.send({
            items,
            status: 200
        });  
    } catch (error) {
        console.log(error);
        res.send({
            error,
            status: 500
        })
    } 
});

// api/vendor/:vendorId
const getItemsByVendor = asynchandler( async(req,res) => {
    try {
        //console.log('Im hitted!');
        const vendorId = req.params.vendorId;

        let items = await VendorItem.aggregate([            
            {$match: {vendor: vendorId}},
            {$lookup: {
                from: "vendorcategories",
                localField: "category",
                foreignField: "_id",
                as: 'categoryDetails'
            }},
            {$group:{
                "_id":"$category",
                "count":{"$sum":1},
                "items":{"$push":"$item"},
                "parentName":{"$push":"$categoryDetails"}
            }},                                         
        ]);
        // parentName[0][0].categoryName
        
        return res.send({
            items,
            status: 200
        });  
    } catch (error) {
        console.log(error);
        res.send({
            error,
            status: 500
        })
    } 
});

const deleteItem = asynchandler( async(req,res) => {
    try {
        const _id = req.params.itemId;

        const item = await VendorItem.findById({itemId});
        if(!item) return res.sendStatus(400);
        await VendorItem.deleteOne({_id});
        return res.send({
            status: 200
        });  
    } catch (error) {
        console.log(error);
        res.send({
            error,
            status: 500
        })
    }
})

const addItem = asynchandler( async(req,res) => {
    try {
        const obj = req.body;

        const item = await VendorItem.create(obj);
        return res.json({
            item,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            startu: 500
        })
    }
});

const updateItem = asynchandler( async(req,res) => {
    try {
        const _id = req.params.itemId;
        const obj = req.body;

        let item = await VendorItem.findById({_id});
        if(!item) return res.sendStatus(400);

        item = await VendorItem.updateOne({_id},obj);
        return res.json({
            item,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
            startu: 500
        })
    }
});

module.exports = {addItem, updateItem, deleteItem, getAllItems,getItemById,getItemsByCategory,getItemsByVendor};