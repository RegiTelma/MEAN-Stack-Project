import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";

export const register= async(req, res, next)=>{
    const role= await Role.find({role:'User'});
    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(req.body.password, salt);
    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashPassword,
        roles:role
    });
    await newUser.save();
    return next(CreateSuccess(200,"User Registered Successfully!"));
}

export const login= async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");

        const { roles } = user;
        if(!user){
            return res.status(404).send("User not found!");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).send("Invalid Credentials!");
        }
        const token = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status:200,
            message:"Login Successful!",
            data: user
        })
    } catch (error) {
        return res.status(500).send("Something went wrong!");
    }
}

export const registerAdmin= async(req, res, next)=>{
    const role= await Role.find({});
    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(req.body.password, salt);
    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashPassword,
        isAdmin:true,
        roles:role
    });
    await newUser.save();
    return next(CreateSuccess(200,"Admin Registered Successfully!"));
}