const mongoose = require('mongoose');
const {Vendor} = require('./Vendor.js');

const venueSchema = mongoose.Schema({ 
    name: {type: String, required: true}, 
    location: {type: String, required: true}, 
    postcode: {type: String, required: true}, 
    isActive: {type: Boolean, required: true, default: false}, 
    openingTime: {type: Date, required: true}, 
    closingTime: {type: Date, required: true}, 
    address: { 
        type: String, 
        required: true 
    }, 
    city: { 
        type: String, 
        required: true, 
        default: ''
    }, 
    country: { 
        type: String, 
        required: true,
    //enum: COUNTRIES.map(country => country.name) 
    } 
},{
    timestamps: true
}); 
    
const Venue = mongoose.model('Venue',venueSchema);

const venueVendorSchema = mongoose.Schema({ 
    vendors: [{ 
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: Vendor,
    }],
    venue: { 
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: Venue, 
        index: true 
    }
});
const venueLocationSchema = mongoose.Schema({ 
    zoneIdentifier: {type: String, required: true}, 
    zoneName: [{
        subZoneName: {type: String}
    }],
    venue: { 
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Venue', 
        index: true
    }
}); 

const VenueLocation = mongoose.model('VenueLocation', venueLocationSchema);

const VenueVendor = mongoose.model('VenueVendor',venueVendorSchema);

module.exports = {Venue,VenueVendor,VenueLocation};