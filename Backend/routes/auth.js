const express  = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchUser")

//it should be hide 
const JWT_SECRET = 'ab_kiya_batau_dil_ka_dasta';

//using javascript destructuring
const { body, validationResult } = require('express-validator'); //using express-validator package for validating

const UserModal = require("../models/User"); //to get access of our mongodb server
const User = require('../models/User');


//---------------------------------------------------------------------- CREATE USER -------------------------------------------------------------------------

//Crearte a user using  POST mehtod "app/auth/createsuer" this is not a authenticate endpoint
router.post('/createuser',[
    body('email',"this email already used").isEmail(),
    body('password','use a atleast 8 digit password').isLength({ min: 8}),   //these array is given for validation at the middle as a parameter to the function
    body('name','dont use a unvalid name ').isLength({min:4,max:15})
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);   

    //if any error occur then return Bad request error

    if (!errors.isEmpty()) {
        success = false;
      return res.status(400).json({success, errors: errors.array() });   //its chaking the req is validate or not 
    }

    try{

    //Check whtether the user with email exsist already
    let user  = await UserModal.findOne({email:req.body.email})   //its chacking the requested email is already in database or note 
    if(user){
        
        return res.status(400).json({success,error:"Your email already exsist!"})
    }
    
    //generating salt
    const salt =  await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)

    //taking data from request body and storing it in mongodb
    user  = await UserModal.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email
    })
    const data = {
        user:{
            id:user.id
        }
    }

    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authToken}) //i sending it as  object 

} 
    catch(error){                           //using try catch for controlling error not showing sensitive error to user
        console.error(error.message);
        res.status(200).send("Some error occured!")
    }

   

})

//----------------------------------------------------------------- LOGIN ---------------------------------------------------------------------

// Login a user using  POST mehtod "app/auth/login" this is  a authenticate endpoint
router.post('/login',[
    body('email',"plsese type you email correctly").isEmail(),
    body('password','please enter a password').isLength({ min: 8}).exists(),   //these array is given for validation at the middle as a parameter to the function
    
],async(req,res)=>{


    //to showing resquest succesed or not in frontend
    let success = false;

    const errors = validationResult(req);   

    //if any error occur then return Bad request error

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });   //its chaking the req is validate or not 
    }

    //using destacturing of javascript 
    const {email , password} =   req.body;

    try{
    
        //cheking password and email 
    let  user = await UserModal.findOne({email}); 
    if(!user){
        return res.status(400).json({error:"Please try login with correct credentails"})
    }
    
    const passwordCompare = await bcrypt.compare(password,user.password);
    
    if(!passwordCompare){
        success = false;
        return res.status(400).json({success,error:"Please try login with correct credentails"})
    }

    //sending authtoken to successfully logged user

    const data = {
        user:{
            id:user.id
        }
    }

    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authToken});

}
catch(error){                           //using try catch for controlling error not showing sensitive error to user
    console.error(error);
    res.status(500).send("Some error occured!");

}


})


// Get a logged User Details using POST mehtod "app/auth/login" this is  a authenticate endpoint

router.post('/getuser',fetchuser,async(req,res)=>{
    
    try {
                const user  = await UserModal.findById(req.user.id).select("-password")
                res.send(user) //its for just testing 
    } catch (error) {
        console.error(error.message);
         res.status(500).send("internal sever error");
    }

})







module.exports = router