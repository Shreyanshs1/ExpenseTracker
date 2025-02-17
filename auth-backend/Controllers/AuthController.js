//In this Module we write code for SignUp and Login Functionality 
//Creating New user
//Loging in new user
// We will hash the user's password before entering it into the database

const UserModel = require("../Model/UserModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// const mongoose = require('mongoose')

const signup = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"User Already exist",success:false});
        }
        const userModel = new UserModel({name,email,password});
        userModel.password=await bcrypt.hash(password,10);
        await userModel.save();
        res.status(200).json({
            message:"SignUp Successful",
            success:true
        })
    }catch(error){
        res.status(500)
        .json({
            message:"Internal Server Error",
            success:"false",
            error:error
        })
    }
}

const login = async (req,res)=>{
        let mssg="Validation Failed, Incorrect Username or Password"
    try{
        const {email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(403)
            .json({message:mssg,success:false});
        }
        let isPassEqual = await bcrypt.compare(password,user.password)
        // return res.send(isPassEqual)
        if(!isPassEqual){
            return res.status(403)
            .json({
                message:mssg,
            })
        }
        let jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )
        
        return res.status(200)
        .json({
            message:"Login Successfully",
            success:true,
            jwtToken,
            email,
            name:user.name
        })
    }
    catch(err){
        res.status(500)
        .json({
            message:"Internal server error",
            err
        })
    }
}


module.exports = {signup,login};