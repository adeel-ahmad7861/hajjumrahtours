// const { string } = require('joi');
// const valid=require('valid');
// const mongoose=require('mongoose')

// const userSchema = mongoose.Schema(
//     {
//       firstName: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       lastName: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       companyName: {
//         type: String,
//         required: true,
//         trim: true,
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//           if (!validator.isEmail(value)) {
//             throw new Error('Invalid email');
//           }
//         },
//       },
//       password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 8,
//         validate(value) {
//           if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//             throw new Error('Password must contain at least one letter and one number');
//           }
//         },
//         private: true,
//       },
//       role: {
//         type: String,
//         enum: roles,
//         default: 'user',
//       },
//       isEmailVerified: {
//         type: Boolean,
//         default: false,
//       },
//       timezone: {
//         type: String,
//         required: true,
//       },
//       phone: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//           if (!validator.isMobilePhone(value, 'any', { strictMode: true })) {
//             throw new Error('Invalid phone number');
//           }
//         },
//       },
//       connects: {
//         type: Number,
//         default: 0, // Tracks the user's available connects
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );
//   module.exports=userSchema;
const { string } = require('joi');
const validator = require('validator');
const mongoose = require('mongoose');

// const roles = ['user', 'admin']; // Ensure you have defined roles

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    timezone: {
      type: String,
      required: true,
    },
    token:{
      type:String,
      default:'',

    },
    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'any', { strictMode: true })) {
          throw new Error('Invalid phone number');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
