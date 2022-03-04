const mongoose = require ('mongoose');
const delivery_history= new mongoose.Schema({
   
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
const deliveryHistory = mongoose.model('deliveryHistory', delivery_history);
module.exports = deliveryHistory;