const express= require ('express');
const bodyParser= require('body-parser')
const app = express();
const monggose = require('mongoose');
const User = require('./models/users');
const session = require('express-session');

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
app.post('/api/register',async (req,res)=>{
    const {email,password}= req.body;
    console.log(email,password);

    //check existing users
    const existingUser = await User.findOne({email});
    // console.log(existingUser);

    if(existingUser){
        res.json({
            success:false,
            message:"Email already in use"
        })
        return
    }
    else{
          
        console.log("data uploading");   
        const user= new User(
            { 
                email,
                password
            });
        const result= await user.save();
            // console.log(result);
        res.json({
            success: true,
            message:"Welcome to Parcel delivery System"
        });
        return
        }
            // res.end();
});
app.get('/api/data',async(req,res)=>{
    const user = await User.findOne({email:req.session.user})
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
        quote: user.quote
    });
return
 }
});
app.get('/api/isloggedin',(req,res)=>{
     res.json({
        status: !!req.session.user
    });
})
app.get('/api/quote',async(req,res )=>{
    console.log(req.session.user,req.body.value);
    const user = await User.findOne({email:req.session.user});
    if(!user){
        res.json({
            success:false,
            message:'Invalid user'
        })
        return;
    }
    await User.updateOne({email:req.session.User},{$set:{quote:req.body.value}})
    res.json({
        success:true,
    })
})
app.get('/api/logout',(req,res )=>{
    req.session.destroy()
    res.json({
        success:true
    })
});



const port=  process.env.PORT || 1234;
app.listen(port,()=>{
    console.log('server listing at 1234');})