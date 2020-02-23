const SHA256 = require("crypto-js/sha256")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// example 0
var password = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash, '...hash')
//   })
// })

var hashedPassword = '$2a$10$u.9PIxCH4SIdIS18goWTdOUowDH7ry9B5p/PmOk4mZmaFU6B3PJxO'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res, '...response')
})

// // example 1
// var data = {
//   id: 10
// }

// var token = jwt.sign(data, '123abc')
// console.log(token)

// var decoded = jwt.verify(token, '123abc')
// console.log(decoded)

// // example 2
// var message = 'I am user number 3'
// var hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// // example 3
// var data = {
//   id: 4
// }

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed')
// }
