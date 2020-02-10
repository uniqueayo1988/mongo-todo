const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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

UserSchema.methods.toJSON = function () {
  var user = this
  var userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this   // caalling the instace
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  user.tokens = user.tokens.concat([{access, token}])

  return user.save().then(() => {
    return token
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this   // calling the Model
  var decoded

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject()
    // })
    // return Promise.reject()
    return Promise.reject('Error')
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}
 
var User = mongoose.model('User', UserSchema)

module.exports = {User}
