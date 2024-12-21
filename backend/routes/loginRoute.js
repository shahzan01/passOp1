import express from "express";
const router=express.Router();
import mongoose from "mongoose";
import {userModel} from '../db.js';
import inputvalidation from "../middelwares/inputValidation.js"
import {userMiddleware} from "../middelwares/user.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod";
import dotenv from "dotenv";
dotenv.config({path:".env"});
router.use(express.json())
const user_jwt_secret=process.env.user_jwt_secret



router.post("/signup", inputvalidation,  async function(req,res){
    const {email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,5);
    try{ 
        const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }


await userModel.create({
    email:email,
    password:hashedPassword
})


res.status(201).json({ message: 'User registered successfully' });

}
catch(e){
    res.status(500).json({ error: 'Internal server error' });
}

})




router.post("/login",inputvalidation,   async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
try{
const user=await userModel.findOne({
    email:email,
})
if(!user){
    return res.status(400).json({ error: 'Invalid email or password' });
}
const hashedPassword=user.password;
const match=await bcrypt.compare(password,hashedPassword);
if(!match){
    return res.status(400).json({ error: 'Invalid email or password' });
}

const token=jwt.sign({id:user._id,email:user.email},user_jwt_secret,{ expiresIn: '10h' })
res.status(200).json({ message: 'Login successful', token });


}
catch(e){
    res.status(500).json({ error: 'Internal server error' });
}})



router.get('/dashboard',userMiddleware,(req,res)=>{
    res.status(200).json({ message: `Welcome, ${req.user.email}` });
})




export  default router ;






















