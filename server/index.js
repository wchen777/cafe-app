const { ApolloServer, gql } = require('apollo-server');
const { uri } = require('./mongoDB')
const MongoClient = require('mongodb').MongoClient;
const ContextMiddleware = require('./util/contextMiddleware');

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


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ContextMiddleware, });

const PORT = 8080;

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
