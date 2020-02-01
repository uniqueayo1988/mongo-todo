const mongoose = require('mongoose')

// Connection URL
const url = process.env.MONGODB_URI;

mongoose.connect(url, {useNewUrlParser: true})

module.exports = { mongoose }
