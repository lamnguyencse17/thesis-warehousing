import {split, HttpLink, ApolloClient, InMemoryCache} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';

let client = null;

export const getClient = () => {
  return client;
};

export const initClient = ({token}) => {
  const httpLink = new HttpLink({
    uri: 'http://172.16.5.81:3000/graphql',
    credentials: 'include',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://172.16.5.81:3000/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        token,
      },
    },
  });

  wsLink.subscriptionClient.on('connecting', () => {
    console.log('connecting');
  });

  wsLink.subscriptionClient.on('connected', () => {
    console.log('connected');
  });

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

  client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};
