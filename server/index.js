const { ApolloServer, gql } = require('apollo-server');
const { uri } = require('./mongoDB')
const MongoClient = require('mongodb').MongoClient;
const ContextMiddleware = require('./util/contextMiddleware');
const admin = require('firebase-admin');
const serviceAccount = require('./config/cafe-social-network-firebase-adminsdk-n4dp7-9b3414aacb.json');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

 const typeDefs = require('./typedefs')

// Resolvers define the technique for fetching the types defined in the
// schema, map of functions which return data for the schema
 
const resolvers = require('./resolvers/resolvers')

// graphql query syntax
// query name {
//   getMessages(to: "vision" from:"test-user"){
//     uuid
//    content
//      from
//          to
//          createdAt
//          _id
//  }
//  }

// initialize backend service account to verify auth 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cafe-social-network-default-rtdb.firebaseio.com"
  });

const mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = `${uri}`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ContextMiddleware, 
  });

const PORT = 8080;

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
