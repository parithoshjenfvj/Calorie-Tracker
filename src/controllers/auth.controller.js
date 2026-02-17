const express=require("express");
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const userSchema=require("../models/user.model")
const emailService=require("../services/email.service")
async function registerController(req,res){
    let {email,password,name}=req.body;
    let user=await userSchema.findOne({email});
    if(user){
        return res.status(409).send("email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let createdUser=await userSchema.create({
        email,
        name,
        password:hashedPassword
    }) 
    const token=jwt.sign({userId:createdUser._id},process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookie("token",token);
    await emailService.sendRegistrationEmail(createdUser.email,createdUser.name)
    res.status(201).json({
        user:{
            _id: createdUser._id,
            email:createdUser.email,
            name:createdUser.name
        },
        token
    })
}

async function loginController(req,res){
    let {email,password}=req.body;
    let user = await userSchema.findOne({email})
    if(!user){
        return res.status(404).send("User not found")
    }
    else{
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
            res.cookie("token",token);
            //await emailService.sendLoginEmail(user.email,user.name)
            res.status(201).json({
                user:{
                    _id: user._id,
                    email:user.email,
                    name:user.name
                },
                token
            })
        }
    }
}

async function logoutController(req,res){
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false   // true in production (https)
    });   
    res.status(200).json({ message: "Logged out successfully" })
}

module.exports={
    registerController,
    loginController,
    logoutController
}