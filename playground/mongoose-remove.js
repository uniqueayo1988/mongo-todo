const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/Todo')
const {User} = require('./../server/models/User')

Todo.remove({}).then((result) => {
  console.log(result)
})

Todo.findOneAndRemove({_id: '5e25789de7ffbab1046100d4'}).then(result => {
  console.log(result)
})

Todo.findByIdAndRemove('5e245ec5e6a72c8bf0a26735').then(todo => {
  console.log(todo)
})
