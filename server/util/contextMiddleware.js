const MongoClient = require('mongodb').MongoClient;
const { uri } = require('../mongoDB')
const firebase = require('firebase')

module.exports = async (context) => {
  let db;
  if (!db) {
    try {
      const dbClient = new MongoClient(
          uri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )

      if (!dbClient.isConnected()) await dbClient.connect()

      db = dbClient.db('cafe-app') // database name
    } catch (e) {
      console.log('ERROR while connecting with graphql context (db)', e)
    }
  }
  console.log(context.req.headers)
  const token = context.req.headers.authorization;
  return { db, token }
}


