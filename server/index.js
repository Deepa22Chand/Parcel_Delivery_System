const express= require ('express');
const bodyParser= require('body-parser')
const app = express();
const monggose = require('mongoose');
const User = require('./models/users');
const session = require('express-session');
const customer_Details = require('./models/user_details')
const parcel_details= require('./models/parcel-details');
const client= require('twilio')(Account SID,Auth Token);
const parcel_delivery=require('./models/parcel-delivery');
const { ObjectId } = require('mongodb');
const { addAbortSignal } = require('nodemailer/lib/xoauth2');

app.use(session({
    secret:'ascjhgasiudlfg342hvjbgu432g5uv5u324v',//23 The secret is used to hash the session.session is then protected against session hijacking 
    saveUnintialized:false,
    resave:false                        //each request your session-cookie will be reset each time.
}))

monggose.Promise=global.Promise;

//------------------------------------------------connection-----------------------------------------------------------

monggose.connect('mongodb://localhost:27017/parcel_delivery',{ useNewUrlParser: true })
.then(()=>{
     console.log("database setup");
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json());

//----------------------------------------------------------Login-----------------------------------------------------------

app.post('/api/login', async(req,res)=>{
   
    
    const {email,password}= req.body;
    // console.log(email,password);
    const resp = await User.findOne({email,password});
     
    // const user= new User(
    //     {
    //         email:"deepa01@gmail.com",
    //         password:"1234567"
    //     }
    // )
    // user.save();
    // console.log(resp);
    if(!resp){
        // console.log("incorrect details");
        
        res.json({
            success:false,
            message:"Incorrect details",
        });
        return
        
    }else{
        console.log("logging u in");
         res.json({
            success:true
        });
        req.session.user=email;
        req.session.save();
         
        
    }
    res.end();
});
//----------------------------------------------------------Register--------------------------------------------------------
app.post('/api/register',async (req,res)=>{
    console.log("Register")
    const {email,phoneNumber,password}= req.body;
    console.log(email,phoneNumber,password);

    // check existing users
    const existingUser = await User.findOne({email});
    console.log(existingUser);

    if(existingUser){
        res.json({
            success:false,
            message:"Email already in use"
        })
          }
    else{
          
        console.log("data uploading");   
        const user= new User(
            { 
                email,
                phoneNumber,
                password    
            });
        const result= await user.save();
        console.log(result)// show the object we  have enter in database 
        const userid=monggose.Types.ObjectId(result.id).valueOf();
                // return result
        res.json({
            success: true,
            message:"Welcome to Parcel delivery System",
            id:userid
            
            
        });
        return
        }
        
            // res.end();
});
//------------------------------------------------------Phone Number verification ------------------------------------------------------

app.get('/api/verification',async(req,res)=>{
   const user = await User.findOne({email:req.session.user })
   const email=req.session.user
   console.log(email);
   const existingUser = await User.findOne({email});
//    console.log(existingUser)
//     console.log(existingUser._id)
    const User_phoneNumber= existingUser.phoneNumber;
    console.log(User_phoneNumber)
    // console.log(existingUser.password)

    const sendOTP= Math.floor(100000 + Math.random() * 900000);
    // sendTextMessage(sendOTP);
    client.messages.create({
    body:sendOTP ,
    to:`+91` + User_phoneNumber,
    from:'+18597626394'
    }).then(message=>console.log(message))
    .catch(error=>console.log(error))
   
    res.json({
    status:true,
    otp:sendOTP,
    phoneNumber:User_phoneNumber
        
       
        
    });
        
       
        
  


})

//--------------------------------------------------return data(email,id)-----------------------------------------------------
app.get('/api/data',async(req,res)=>{
    const user = await User.findOne({email:req.session.user })
    const email=req.session.user
    const usersid= user._id;
    const shippingID=user.shippingID;
   console.log(email,usersid,shippingID);
   
//    const existingUser = await parcel_delivery.find({"_id": ObjectId(shippingID)});
//        console.log("user",existingUser);


// //--------------------------------------------------------
//     console.log("my id",id);
    // console.log(req.sessionID)
   if(!user){
       res.json({
           status:false,
           message:'User was deleted'
       })
       return 
   }else{
       const existingUser = await parcel_delivery.find({"_id": ObjectId(shippingID)});
       console.log(existingUser);
        
        if(shippingID!= undefined){
        console.log("shippimg details")
        res.json({
        status:true,
        email: req.session.user,
        ID:usersid,
        phoneNumber:user.phoneNumber,
        Number:existingUser[0].num_of_packages,
        Weight:existingUser[0].weight,
        date:existingUser[0].Pickup_date,
        Total_amount:existingUser[0].amount,
        Address:existingUser[0].address ,
        latest_pickupTime:existingUser[0].latest_pickupTime,
        earlest_pickupTime:existingUser[0].earlest_pickupTime,
        pickup_location:existingUser[0].pickup_location
        
        
        
    });}
else{
    console.log("no shippimg details")
    res.json({
        status:true,
        email: req.session.user,
        ID:usersid,
        phoneNumber:user.phoneNumber});

}
  
};})


//------------------------------------------------------isLoggedIn---------------------------------------------------------
app.get('/api/isloggedin',(req,res)=>{
     res.json({
        status: !!req.session.user
    });
})

//-------------------------------------------------------logout------------------------------------------------------------
app.get('/api/logout',(req,res )=>{
    console.log("logout")
    req.session.destroy()
    res.json({
        success:true
    })
});
//--------------------------------------------------------Customer_Details--------------------------------------------------

app.post('/api/customer_details',async (req,res)=>{
    console.log("customer details")
   
    const {name,username,email,phonenumber,country,state,city,zipcode,userid}= req.body;
   

    //check existing users
    // const existingUser = await customer_Details.findOne({userid});
    // console.log(existingUser);

    // if(existingUser){
    //     res.json({
    //         success:true,
    //         message:"already entered details"
    //     })
    //       }
    // else{
          
        console.log("data uploading");   
        const Customer_Details= new customer_Details(
            { 
               name,username,email,phonenumber,country,state,city,zipcode,userid
            });
        const result= await Customer_Details .save();
        console.log (result );
        
            // console.log(result);
        res.json({
            success: true,
            message:"Successfully uploaded customer details",
            
            
        });
        // return
        // }
            // res.end();
});
app.get('/api/enteredDetails',(req,res)=>{
     res.json({
        status: !!req.session.customer_Details
    });

})

//--------------------------------------------------------------Parcel Details--------------------------------------------------
app.post('/api/parcel_details',async (req,res)=>{
    console.log("parcel details")
   
    const {name,username,country,phonenumber,phonenumber2,state,city,zipcode,userid,address,num_of_packages,weight,length_breadth, Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,amount}= req.body;
   

    //check existing users
    
    console.log(name,username,country,phonenumber,phonenumber2,state,city,zipcode,userid,address,num_of_packages,weight,length_breadth, Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,amount);

  
          
        console.log("data uploading");   
        const Parcel_details= new parcel_details(
            { 
              name,username,country,phonenumber,phonenumber2,state,city,zipcode,userid,address,num_of_packages,weight,length_breadth, Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,amount
            });
        const result= await Parcel_details.save();
        // console.log (result );
        
            // console.log(result);
        res.json({
            success: true,
            message:"Successfully uploaded parcel details",
            
            
        });
        
        
            // res.end();
});

//-----------------------------------------------------------parcel delivery------------------------------------------------
app.post('/api/parcel_delivery',async (req,res)=>{
    console.log("parcel delivery")
   
    const {userid,name,phoneNumber,num_of_packages,weight,Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,address,amount}= req.body;
   

    //check existing users
    
    // console.log(userid,name,phoneNumber,num_of_packages,weight,Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,address,amount);

  
          
        // console.log("data uploading");   
        const ParcelDelivery= new parcel_delivery(
            { 
             userid,name,phoneNumber,num_of_packages,weight,Pickup_date,earlest_pickupTime,latest_pickupTime,pickup_location,address,amount
            });
        const result= await ParcelDelivery.save();
        console.log (result._id );
        
            // console.log(result);
    const user = await User.findOne({email:req.session.user })
    user.shippingID=result._id
    const data =await user.save();
    console.log(data);
        res.json({
            success: true,
            message:"Successfully uploaded parcel delivery details",
            userid:result._id,
        
        });
        
        
            // res.end();
});

//-------------------------------------------------------------Shipping Details-------------------------------------------------------

app.get('/api/shipment',async(req,res)=>{
   const Parcel_delivery = await parcel_delivery.findOne({email:req.session.user })
   const email=req.session.user
   console.log(email);
   const existingUser = await User.findOne({email});
   console.log(existingUser)
    console.log(existingUser._id)
    const User_phoneNumber= existingUser.phoneNumber;
    console.log(User_phoneNumber)
    // console.log(existingUser.password)

})
//------------------------------------------------------------Feedback-------------------------------------------------------------
app.post('/api/feedback', async(req,res)=>{
   
    
    const {email,name,msg}= req.body;
    const user = await User.findOne({email:req.session.user })
    
    const usersid= user._id;
    const shippingID=user.shippingID;
//    console.log(email,usersid,shippingID);
   if(shippingID==undefined){
       res.json({
           status:false,
           message:'no shipping order'
       })
       return 
   }else{
       
        
        user.msg=msg;
        await user.save();
         res.json({
           status:true,
           message:'feedback '
       })
    }
       
   
});
//------------------------------------------------------------server------------------------------------------------------------

const port=  process.env.PORT || 1234;
app.listen(port,()=>{
    console.log('server listing at 1234');})
