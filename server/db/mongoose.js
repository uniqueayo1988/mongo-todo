const mongoose = require('mongoose')

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(url, {useNewUrlParser: true})

module.exports = { mongoose }
