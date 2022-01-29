const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {randomUUID} = require('crypto');
const { SUBSCRIPTIO } = require('../lib/constants');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      default: 'User'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /\S+@\S+\.\S/
            return re.test(String(value).trim().toLowerCase())
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    subscription: {
        type: String,
        enum: {
            values: Object.values(SUBSCRIPTIO),
            message: 'Subscription is not allowed'
        },
        default: SUBSCRIPTIO.STARTER,
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {s: '250'}, true)
      },
    },
    idAvatarCloud:{
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: randomUUID(), 
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true, transform: function(doc, ret) { 
      delete ret._id; 
      return ret;
    }}, 
    toObject: { virtuals: true, transform: function(doc, ret) { 
      delete ret._id; 
      return ret;
    }}
  }
);


userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password, salt)
  }

  next();
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
const User = model('user', userSchema);

module.exports = User;