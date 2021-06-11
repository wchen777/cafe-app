
import React, { useEffect, useState, useContext } from 'react';
import Routes from './navigation/Routes'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import * as firebase from 'firebase';
import { setContext } from '@apollo/client/link/context';

// const httpLink = new HttpLink({
//   uri: 'http://ec2-3-14-84-22.us-east-2.compute.amazonaws.com/'
// });

let httpLink = new HttpLink({
  // desi
//   uri: 'http://192.168.1.13:8000/'
  // will
  uri: 'http://192.168.0.114:8080/'
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://ec2-3-14-84-22.us-east-2.compute.amazonaws.com/graphql',
//   options: {
//     reconnect: true
//   }
// });

const wsLink = new WebSocketLink({
  uri: 'ws://73.149.220.205:8080/graphql',
  options: {
    reconnect: true
  }
});



export default function ApolloWrapper() {
    // let authLink; 
    // firebase.auth().currentUser.getIdToken(true)
    // .then((token) => {
    //   authLink = setContext((_, { headers }) => {
    //     return {
    //       headers: {
    //         ...headers,
    //         authorization: token ?? "",
    //       }
    //     }
    //   })
    //   httpLink = authLink.concat(httpLink)
    // })
    // The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
    // Initialize Apollo Client
    const client = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache()
  });

    return (
        <ApolloProvider client={client}>
                <Routes />
        </ApolloProvider>
    );
}
