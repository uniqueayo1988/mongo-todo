// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectId } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017';

// DB Name
const dbName = 'TodoApp';

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log('Error in Connection')
  }

  console.log('Connected to the Database')

  const db = client.db(dbName);

// findOneAndUpdate
  db.collection('Todos').findOneAndUpdate(
    {text: 'jumps the fence'}, 
    {$set: {completed: false}}, 
    {returnOriginal: false},   // returns updated document
  (err, res) => {
    if (err) {
      return console.log('Unable to update from DB')
    }

    console.log(res, 'Found and updated one Document from DB')
  })

  db.collection('Users').updateOne(
    {name: 'Ayo Giwa'}, 
    {$inc: {age: 4}},
  (err, res) => {
    if (err) {
      return console.log('Unable to update from DB')
    }

    console.log(res, 'Updated the Users collection in the DB')
  })

  client.close()
})

// Other methods - insertMany insertOne
