var express = require('express')
var bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
const port = process.env.PORT || 3000

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
    if (!todo) {
      return res.status(400).send({message: 'Id not valid'})
    }

    res.status(200).send({doc})
  }, e => {
    res.status(404).send({message: 'Error fetching user'})
  })
})

app.listen(port, () => {
  console.log(`Started on PORT ${port}`)
})
