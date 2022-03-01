const mongoose = require ('mongoose');
const parcel_details= new mongoose.Schema({
        userid:String,
      
        name:String,
        
        username:String,
        country:String,
        phonenumber:String,
        phonenumber2:String,
        state:String,
        city:String,
        address:String,
        zipcode:Number,
        num_of_packages:String,
        weight:Number,
        length_breadth:String,
        Pickup_date:String,
        earlest_pickupTime:String,
        latest_pickupTime:String,
        pickup_location:String,
          amount:String,

});
const Parcel_details = mongoose.model('Parcel_details', parcel_details);
module.exports =  Parcel_details;