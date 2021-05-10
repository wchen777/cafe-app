const { ApolloServer, gql } = require('apollo-server');
const { uri } = require('./mongoDB')
const MongoClient = require('mongodb').MongoClient;

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

 const typeDefs = require('./typedefs')

// Resolvers define the technique for fetching the types defined in the
// schema, map of functions which return data for the schema
 
const resolvers = require('./resolvers/ChatResolvers')


let db 
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async () => {
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
        return { db }
      }, });

const PORT = 80;

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
