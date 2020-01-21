const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/Todo')
const {User} = require('./../server/models/User')

var id = '5e25789de7ffbab1046100d4'

if (!ObjectId.isValid(id)) {
  console.log('Id not valid')
}

// Todo.find({_id: id}).then(doc => {
//   console.log(doc, '...doc')
// })

// Todo.findOne({completed: false}).then(doc => {
//   console.log(doc, '...doc')
// })

// Todo.findById(id).then(doc => {
//   if (!doc) {
//     return console.log('Id not found')
//   }
//   console.log(doc, '...doc by id')
// }).catch(e => console.log(e))

User.findById(id).then(user => {
  if (!user) {
    return console.log('Id not found')
  }
  console.log(user, '...user by id')  
}, e => console.log(e))
