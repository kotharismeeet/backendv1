const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Customer = require('../models/Customer');

const getCustomerById = asyncHandler( async (req,res) => {

    try {
        console.log(req.params.id);
        const _id = req.params.id;

        const customer = await Customer.findById({_id});

        if(customer) {
            res.send({
                customer: customer,
                status: 200
            })
        }
        else res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const getCustomers = asyncHandler( async(req,res) => {
    try {
        const customer = await Customer.find({});

        if(customer) {
            res.send({
                customers: customer,
                status: 200
            })
        }
        else res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// delete

const deleteCustomerById = asyncHandler(async(req,res) => {
    try {
        console.log(req.query.id);
        const _id = req.query.id;

        const customer = await Customer.findById({_id});

        if(customer) {
            const response = await Customer.deleteOne({_id});
            console.log(response);
            res.sendStatus(200);
        }
        else res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const registerCustomer = asyncHandler (async (req,res) => {

    try {
        const {name,email,password,contactnum,isAdmin} = req.body;
        // Step 1 : Check body fields are not undefined and be careful with boolean
        if(!name || !email || !password || !contactnum) {
            console.log(name,email,password,contactnum,isAdmin);
            return res.sendStatus(401);
        }

        // Step 2 : Check weather it exists or not
        const customerExists = await Customer.findOne({email});

        if(customerExists) {
            return res.sendStatus(401);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Step 3 : If dosen't exist enter in database
        const customer = await Customer.aggregate([
            {$project: {name: 1, contactnum: 1, email:0, password:0, isAdmin:0}}
        ])
        .create({
            name,
            email,
            password: hashedPassword,
            contactnum,
            isAdmin
        });

        // Step 4 : Sends response as well as call utility function 
        if(customer) {
            return res.send({
                id: customer._id,
                name: customer.name,
                status: 200
            });
        }
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//put

const updateCustomer = asyncHandler(async(req,res) => {
    try {
        const {name,email,password,contactnum,isAdmin} = req.body;
        // Step 1 : Check body fields are not undefined and be careful with boolean
        if(!name || !email || !password || !contactnum) {
            console.log(name,email,password,contactnum,isAdmin);
            return res.sendStatus(401);
        }

        // Step 2 : Check weather it exists or not
        const customerExists = await Customer.findOne({email});

        if(!customerExists) {
            return res.sendStatus(403);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Step 3 : If dosen't exist enter in database
        const customer = await Customer.updateOne({email},{
            name,
            email,
            password: hashedPassword,
            contactnum,
            isAdmin
        });

        // Step 4 : Sends response as well as call utility function 
        if(customer) {
            return res.send({
                id: customer._id,
                name: customer.name,
                status: 200
            });
        }
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}); 


module.exports = {getCustomerById,getCustomers,deleteCustomerById, registerCustomer, updateCustomer};