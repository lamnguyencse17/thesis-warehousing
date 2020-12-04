import {split, HttpLink, ApolloClient, InMemoryCache} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://172.16.5.122:3000/graphql',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri: `ws://172.16.5.122:3000/graphql`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
});

wsLink.subscriptionClient.on('connecting', () => {
  console.log('connecting');
});

wsLink.subscriptionClient.on('connected', () => {
  console.log('connected');
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    console.log(
      'result',
      definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription',
    );
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
