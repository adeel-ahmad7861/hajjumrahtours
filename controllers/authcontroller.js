// // auth.controller.js
// const user_data = require('../models/user.models');
// const nodemailer=require('nodemailer');
// //for  send mail

// const sendverifymail=async(name,email,user_id)=>{
//     try{
//         const transporter= nodemailer.createTransport({
//             host:'smtp.gmail.com',
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:'adeel.math123@gmail.com',
//                 pass:'mehar123@',
//             }
//         });
//         const mailoptions={
//             from:'adeel.math123@gmail.com',
//             to:email,
//             subject:'for verification mail',
//             html:'<P>Hi '+name+'<plese click here to <a href="http://127.0.0.1:3000/verify?id='+user_id+'">verify</a>your mail"/p>'
//         }
//         transporter.sendMail(mailoptions,function(error,info){
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log("email has been send:-", info.response);
//             }
//         })
//     }
//     catch(error)
//     {console.log(error.message);}
// }

// //for verify mail
// const verifymail=async(req, res)=>{
//     try{
//         const updatedinfo = await user_data.updateOne({_id:req.query.id},{$set:{isEmailVerified:1}});
//         console.log(updatedinfo);
//         res.sender("email-verified");
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// //for register
// const registerUser = async (req, res) => {
//     try {
//         const newUser = new user_data(req.body);
//         const result = await newUser.save();
//         if(result){
//             res.status(201).json(result,"verify your email");
//             sendverifymail(req.body.name,req.body.email,user_data.id);
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// };

// const updateUser = async (req, res) => {
//     try {
//         const result = await user_data.findByIdAndUpdate(req.body.id, req.body);
//         if (!result) return res.status(404).json({ message: 'User not found' });
//         res.status(200).json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// };

// const deleteUser = async (req, res) => {
//     try {
//         const result = await user_data.findByIdAndDelete(req.body.id);
//         if (!result) return res.status(404).json({ message: 'User not found' });
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// };

// module.exports = { registerUser, updateUser, deleteUser,verifymail };


// auth.controller.js
const user_data = require('../models/user.models');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const config = require('../config/config');

dotenv.config();

// Function to send verification email
const sendverifymail = async (name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const mailoptions = {
            from: config.emailUser,
            to: email,
            subject: 'Email Verification',
            html: `<p>Hi ${name},</p>
                   <p>Please click <a href="https://10d5-154-204-64-6.ngrok-free.app/verify?id=${user_id}">here</a> to verify your email.</p>`,
        };

        const info = await transporter.sendMail(mailoptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

// Function to verify email
const verifymail = async (req, res) => {
    try {
        const updatedinfo = await user_data.updateOne(
            { _id: req.query.id },
            { $set: { isEmailVerified: true } }
        );
        if (updatedinfo.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or already verified.' });
        }
        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).json({ message: 'Error verifying email.' });
    }
};

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const existingUser = await user_data.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const newUser = new user_data(req.body);
        const result = await newUser.save();

        await sendverifymail(req.body.name, req.body.email, result._id).catch((err) => {
            console.error('Error sending verification email:', err);
        });

        res.status(201).json({ message: 'User registered. Please verify your email.', user: result });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Function to update user
const updateUser = async (req, res) => {
    try {
        const result = await user_data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Function to delete user
const deleteUser = async (req, res) => {
    try {
        const result = await user_data.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = { registerUser, updateUser, deleteUser, verifymail };
