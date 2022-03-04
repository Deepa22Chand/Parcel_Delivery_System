const mongoose = require ('mongoose');
const UserSchema = new mongoose.Schema({
    email:String,
    phoneNumber:String,
    password:String,
    shippingID:String
    // verified:Boolean,
    // services:{
    //     name:String,
    //     username:String,
    //     country:String,
    //     phonenumber:String,
    //     phonenumber2:String,
    //     state:String,
    //     city:String,
    //     address:String,
    //     zipcode:Number,
    //     number_of_package:Number,
    //     weight:Number,
    //     length_and_bredth:String,
    //     pickupdate:Date,
    //     earlest_pickup_time:String,
    //     preferred_pickup_time:String,
    //     preferred_pickup_location:String,


    // }
});


 const User = mongoose.model('User', UserSchema);

module.exports =  User;
