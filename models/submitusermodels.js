
const { string } = require('joi');
const validator = require('validator');
const mongoose = require('mongoose');

const submituserSchema = mongoose.Schema(
  {
    Name: {
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
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'any', { strictMode: true })) {
          throw new Error('Invalid phone number');
        }
      },
    },
    Destination: {
      type: String,
      required: true,
      trim: true,
    },
    totalpeople: {
      type: Number,
      default: 0, // Tracks the user's available connects
    },
    leavingdate: {
      type: String,
      default: 0, // Tracks the user's available connects
    },
    Message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SubmitUser', submituserSchema);
