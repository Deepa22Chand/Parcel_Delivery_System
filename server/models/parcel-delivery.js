const mongoose = require ('mongoose');
const parcel_delivery= new mongoose.Schema({
   
    userid:String,
    name:String,
    phonenumber:String,
    num_of_packages:String,
    weight:String,
    Pickup_date:String,
    earlest_pickupTime:String,
    latest_pickupTime:String,
    pickup_location:String,
    address:String,
    amount:String

});
const parcelDelivery = mongoose.model('parcelDelivery', parcel_delivery);
module.exports = parcelDelivery;