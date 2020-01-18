// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectId } = require('mongodb')

// Creating a new objectId
var obj = new ObjectId()
console.log(obj)

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

  db.collection('Users').insertOne({
    name: 'Mikel Obi',
    age: 24,
    location: 'Nigeria'
  }, (err, res) => {
    if (err) {
      return console.log('You can not insert a document')
    }

    console.log(JSON.stringify(res.ops))

    // print createdAt timestamp from _id
    console.log(res.ops[0]._id.getTimestamp())
  })
  client.close()
})
