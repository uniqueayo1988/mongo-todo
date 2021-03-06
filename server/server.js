require('./config/config')

const _ = require('lodash')
var express = require('express')
var bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// TODOS
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

app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({message: 'Id not valid'})
  }
  
  Todo.findById(id).then(doc => {
    if (!todo) {
      return res.status(400).send({message: 'Id not found'})
    }

    res.status(200).send({doc})
  }, e => {
    res.status(404).send({message: 'Error fetching user'})
  })
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({message: 'Id not valid'})
  }
  
  Todo.findByIdAndRemove(id).then(doc => {
    if (!todo) {
      return res.status(400).send({message: 'Id not found'})
    }

    res.status(200).send({doc})
  }, e => {
    res.status(404).send({message: 'Error deleting user'})
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({message: 'Id not valid'})
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }
// {new: true} is same as {returnOriginal: false}
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send({message: 'Not found'})
    }

    res.send({todo})
  }).catch(e => {
    res.status(400).send({message: 'Error'})
  })
})

// USERS
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch(e => {
    // res.status(400).send({message: 'Unable to create document'})
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.listen(port, () => {
  console.log(`Started on PORT ${port}`)
})
