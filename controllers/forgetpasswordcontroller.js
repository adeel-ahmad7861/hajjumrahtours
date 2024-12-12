// const user_data = require('../models/user.models');
// const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');
// const config = require('../config/config');

// // Function to send reset password email
// const sendresetPasswordMail = async (name, email, token) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             requireTLS: true,
//             auth: {
//                 user: config.emailUser,
//                 pass: config.emailPassword,
//             },
//         });

//         const mailoptions = {
//             from: config.emailUser,
//             to: email,
//             subject: 'Email For Reset Password',
//             html: `<p>Hi ${name},</p>
//                    <p>Please click <a href="http://127.0.0.1:3000/api/reset-password?token=${token}">here</a> to reset your password.</p>`,
//         };

//         await transporter.sendMail(mailoptions);
//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error.message);
//         throw new Error('Failed to send reset password email.');
//     }
// };

// // Forget Password Controller
// const foreget_password = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const userdata = await user_data.findOne({ email });

//         if (!userdata) {
//             return res.status(404).send({ success: false, msg: 'This email does not exist.' });
//         }

//         const randomString = randomstring.generate();
//         await user_data.updateOne({ email }, { $set: { token: randomString } });

//         // Send Reset Password Email
//         await sendresetPasswordMail(userdata.name, userdata.email, randomString);

//         res.status(200).send({ success: true, msg: 'Please check your inbox to reset your password.' });
//     } catch (error) {
//         console.error('Error in forget_password:', error.message);
//         res.status(500).send({ success: false, msg: 'An error occurred. Please try again later.' });
//     }
// };

// const reset_password=async(req,res)=>{
//     try{
//         const token=req.body.token;
//         const tokenData=await user_data.findOne({token:token});
//         if(tokenData){
//             const password=req.body.password;
//             const newpassword= await securePassword(password);
//             const userdata=await user_data.findbyidandupdate({_id:tokenData._id},{$set:{password:newpassword,token:''}},{new:true});
//             res.status(200).send({success:true,msg:"User password has been reset",data:userdata});
//         }
//         else{
//             res.status(200).send({success:true,msg:"This link has been expired."})
//         }
//     }catch(error){
//         console.error('Error in forget_password:', error.message);
//         res.status(500).send({ success: false, msg: 'An error occurred. Please try again later.' });
//     }
// }

// module.exports = {foreget_password,reset_password};




const user_data = require('../models/user.models');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const config = require('../config/config');
const bcrypt = require('bcryptjs'); // Use bcrypt for password hashing

// Function to send reset password email
const sendresetPasswordMail = async (name, email, token) => {
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
            from: config.emailUser, // Ensure this is the correct property for email user
            to: email,
            subject: 'Email For Reset Password',
            html: `<p>Hi ${name},</p>
                   <p>Please click <a href="https://10d5-154-204-64-6.ngrok-free.app/resetpassword?token=${token}">here</a> to reset your password.</p>`,
        };

        await transporter.sendMail(mailoptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send reset password email.');
    }
};

// Forget Password Controller
const foreget_password = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const userdata = await user_data.findOne({ email });

        if (!userdata) {
            return res.status(404).send({ success: false, msg: 'This email does not exist.' });
        }

        const randomString = randomstring.generate();
        await user_data.updateOne({ email }, { $set: { token: randomString } });

        // Send Reset Password Email
        await sendresetPasswordMail(userdata.name, userdata.email, randomString);

        res.status(200).send({ success: true, msg: 'Please check your inbox to reset your password.' });
    } catch (error) {
        console.error('Error in forget_password:', error.message);
        res.status(500).send({ success: false, msg: 'An error occurred. Please try again later.' });
    }
};

// Reset Password Controller
const reset_password = async (req, res) => {
    try {
        const token = req.query.token;

        if (!token) {
            return res.status(400).send({ success: false, msg: 'Token is required' });
        }

        // console.log('Token received:', token);
        const tokenData = await user_data.findOne({ token });

        if (!tokenData) {
            return res.status(400).send({ success: false, msg: 'This link has expired or is invalid.' });
        }

        const { password } = req.body;
        if (!password) {
            return res.status(400).send({ success: false, msg: 'Password is required' });
        }

        console.log('User data for token:', tokenData);

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Update user record
        const updatedUser = await user_data.findByIdAndUpdate(
            tokenData._id,
            { $set: { password: hashedPassword, token: '' } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).send({ success: false, msg: 'Failed to update the password.' });
        }

        console.log('Updated user:', updatedUser);
        res.status(200).send({ success: true, msg: 'User password has been reset', data: updatedUser });
    } catch (error) {
        console.error('Error in reset_password:', error.message);
        res.status(500).send({ success: false, msg: 'An error occurred. Please try again later.' });
    }
};

module.exports = { foreget_password, reset_password };
