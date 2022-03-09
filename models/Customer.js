const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    contactnum : {
        type: Number,
        required: true
    },
    /*registeredSince : {
        type: String,
        required: true
    },*/
    isAdmin : {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps : true
});

// https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
customerSchema.post('deleteOne', (next) => {
    CustomerMore.remove({customer : this._id}).exec();
    next();
});

const Customer = mongoose.model('Customer',customerSchema); 

const customerMoreSchema = new mongoose.Schema({
    more: String,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
        index: true
    }
});

const CustomerMore = mongoose.model('CustomerMore', customerMoreSchema);

module.exports = Customer;