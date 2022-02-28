const mongoose = require ('mongoose');
const CustomerSchema= new mongoose.Schema({
    fullname:String ,
    username:String,
    email:String,
    phonenumber:Number,
    country:String,
    state:String,
    city:String,
    zipcode:Number,
    userid:String

});
const customer_Details = mongoose.model('customer_Details', CustomerSchema);
module.exports =  customer_Details;