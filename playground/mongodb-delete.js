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

// deleteMany
  db.collection('Todos').deleteMany({text: 'Something to do'}, (err, res) => {
    if (err) {
      return console.log('Unable to delete from DB')
    }

    console.log(res, 'Deleted from DB')
  })

// deleteOne
  db.collection('Todos').deleteOne({text: 'jump the fence'}, (err, res) => {
    if (err) {
      return console.log('Unable to delete from DB')
    }

    console.log(res, 'Deleted one Document from DB')
  })

// findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}, (err, res) => {
    if (err) {
      return console.log('Unable to delete from DB')
    }

    console.log(res, 'Found and deleted one Document from DB')
  })

  client.close()
})
