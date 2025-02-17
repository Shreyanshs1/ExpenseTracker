const router = require('express').Router();
const {signupValidation, loginValidation} = require('../Middleware/AuthValidation')
const {signup, login}=require('../Controllers/AuthController')

//This module will implement Route Functionality for Login nd Signup 

router.post('/login',loginValidation,login);

router.post('/signup',signupValidation,signup)

module.exports=router;