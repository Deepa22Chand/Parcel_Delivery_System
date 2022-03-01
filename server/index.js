const express= require ('express');
const bodyParser= require('body-parser')
const app = express();
const monggose = require('mongoose');
const User = require('./models/users');
const session = require('express-session');
const customer_Details = require('./models/user_details')
const parcel_details= require('./models/parcel-details');
app.use(session({
    secret:'ascjhgasiudlfg342hvjbgu432g5uv5u324v',
    saveUnintialized:false,
    resave:false
}))

monggose.Promise=global.Promise;
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
        console.log("incorrect details");
        
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
    const {email,password}= req.body;
    console.log(email,password);

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

//--------------------------------------------------return data(email,id)-----------------------------------------------------
app.get('/api/data',async(req,res)=>{
    const user = await User.findOne({email:req.session.user })
    
    // console.log(req.sessionID)
   if(!user){
       res.json({
           status:false,
           message:'User was deleted'
       })
       return 
   }else{
    res.json({
        status:true,
        email: req.session.user,
        ID:user._id
        
       
        
    });
return
 }
});

//------------------------------------------------------isLoggedIn---------------------------------------------------------
app.get('/api/isloggedin',(req,res)=>{
     res.json({
        status: !!req.session.user
    });
})

//-------------------------------------------------------logout------------------------------------------------------------
app.get('/api/logout',(req,res )=>{
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
    const existingUser = await customer_Details.findOne({userid});
    // console.log(existingUser);

    if(existingUser){
        res.json({
            success:true,
            message:"already entered details"
        })
          }
    else{
          
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
        return
        }
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
        console.log (result );
        
            // console.log(result);
        res.json({
            success: true,
            message:"Successfully uploaded parcel details",
            
            
        });
        
        
            // res.end();
});
//------------------------------------------------------------server------------------------------------------------------------

const port=  process.env.PORT || 1234;
app.listen(port,()=>{
    console.log('server listing at 1234');})