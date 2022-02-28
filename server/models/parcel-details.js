const mongoose = require ('mongoose');
const parcel_details= new mongoose.Schema({
    
        username:String,
        country:String,
        phonenumber:String,
        phonenumber2:String,
        state:String,
        city:String,
        address:String,
        zipcode:Number,
        number_of_package:Number,
        weight:Number,
        length_and_bredth:String,
        pickupdate:Date,
        earlest_pickup_time:String,
        preferred_pickup_time:String,
        preferred_pickup_location:String,

});
const Parcel_details = mongoose.model('Parcel_details', parcel_details);
module.exports =  Parcel_details;