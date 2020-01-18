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

  db.collection('Users').find().toArray((err, res) => {
    if (err) {
      return console.log('Unable to fetch users')
    }

    console.log(res)
  })

  db.collection('Users').find().count((err, count) => {
    if (err) {
      return console.log('Unable to fetch users')
    }

    console.log(`The db count is ${count}`)
  })

  // // find by id
  // // db.collection('Users').find({id: new ObjectId('23ddsd33ndf3')}).toArray().then(doc => {
  // db.collection('Users').find({age: 25}).toArray().then(doc => {
  //   console.log(doc)
  // }, err => {
  //   console.log('Unable to fetch users', err)
  // })
  client.close()
})
