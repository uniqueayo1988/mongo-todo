var express = require('express')
var bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose')

// var newUser = new User({
//   email: 'c@test.com'
// })

// newUser.save().then(user => {
//   console.log('Saved user', user)
// }, (e) => {
//   console.log('Unable to save user')
// })

var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo(req.body)

  todo.save().then(doc => {
    res.status(201).send(doc)
  }, (e) => {
    res.status(400).send({message: 'Unable to create document'})
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then(doc => {
    res.status(200).send({doc})
  }, e => {
    res.status(400).send(e)
  })
})

// GET /todos/123123
app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({message: 'Id not valid'})
  }
  
  Todo.findById(id).then(doc => {
    res.status(200).send({doc})
  }, e => {
    res.status(404).send({message: 'User not found'})
  })
})

app.listen(3000, () => {
  console.log('Started on PORT 3000')
})
