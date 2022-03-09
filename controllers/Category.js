const asyncHandler=require('express-async-handler');
const {VendorCategory} = require('../models/Vendor.js');

//Get Category
const getCategories=asyncHandler(async(req,res)=>{
    try{
        
        const searchCategory=req.query.searchCategory
        const sortField=req.query.sortField;
        const limit=req.query.limit;
        const order=req.query.order;    //1:Ascending   -1:Descending
        const offset=req.query.offset;
        const category=await VendorCategory.find({},{categoryName:1,categoryDescription:1}).sort([[sortField,order]]).skip((offset-1)*limit).limit(limit);

        if(category) return res.json({
            category,
            status: 200
        })
    }catch(err){
        console.log(err)
    }
});

const categoryById = asyncHandler(async(req,res)=>{
    try {
        const categoryId = req.params.id;

        const category = await VendorCategory.findById(categoryId);
        if(category) return res.json({
            category,
            status: 200
        });
        else return res.sendStatus(500);
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }

});

//Create Category 
const setCategories=asyncHandler(async(req,res)=>{
    try {
        const newCategory = await VendorCategory.create(req.body);
        if(newCategory) return res.json({
            newCategory,
            stauts: 200
        });
        else return res.sendStatus(500);
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
});

//Update Category By Id
const updateCategories=asyncHandler(async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const updatedCategory = await VendorCategory.updateOne({_id:categoryId},req.body);
        if(updatedCategory) return res.json({
            updatedCategory,
            stauts: 200
        });   
        else return res.sendStatus(500);
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
});

//Delete Category by Id
const deleteCategories=asyncHandler(async(req,res)=>{
    try {
        const categoryId = req.params.id;

        const category = await VendorCategory.deleteOne({_id:categoryId});
        if(category) return res.json({
            category,
            status: 200
        });
        else return res.sendStatus(500);
    } catch (error) {
        console.log(error);
        res.json({
            error,
            status: 500
        });
    }
});

module.exports={
  getCategories,setCategories,updateCategories,deleteCategories,categoryById
};