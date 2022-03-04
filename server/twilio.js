const client= require('twilio')('AC37e0cb50c6ba2216cb334f503e634d4c','56318617ca8cb59b827e717c998c3bfe')
const express= require ('express');
const User = require('./models/users');
const app=express();
app.get('/',(req,res)=>{
    const user = await User.findOne({email:req.session.user })
    const sendOTP= Math.floor(100000 + Math.random() * 900000);
    // sendTextMessage(sendOTP);
    client.messages.create({
    body:sendOTP ,
    to:'+917986618543',
    from:'+18597626394'
}).then(message=>console.log(message))
.catch(error=>console.log(error))

    res.send(`<div >
    Hi there you msg has been send;
    </div>`);


})

    const port=  process.env.PORT || 12345;
app.listen(port,()=>{
    console.log('server listing at 12345');})

//  function sendTextMessage(sendOTP){
// client.messages.create({
//     body:sendOTP ,
//     to:'+917986618543',
//     from:'+18597626394'
// }).then(message=>console.log(message))
// .catch(error=>console.log(error))
// }