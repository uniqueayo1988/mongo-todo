const mongoose = require('mongoose')

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(url, {useNewUrlParser: true})

// Todo Model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

var newTodo = new Todo({
  text: 'Wash plates'
})

newTodo.save().then(doc => {
  console.log('Saved todo', doc)
}, (e) => {
  console.log('Unable to save todo')
})

// User Model
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

var newUser = new User({
  email: 'a@test.com'
})

newUser.save().then(user => {
  console.log('Saved user', user)
}, (e) => {
  console.log('Unable to save user')
})
