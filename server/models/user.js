const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

// User Model
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // required: [true, 'Email is required']
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {   // validator: validator.isEmail
        return validator.isEmail(value)
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = 
}
 
var User = mongoose.model('User', UserSchema)

module.exports = {User}
