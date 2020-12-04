import {split, HttpLink, ApolloClient, InMemoryCache} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import {Config} from '@common';
let client = null;

export const getClient = () => {
  return client;
};

export const initClient = ({token}) => {
  const httpLink = new HttpLink({
    uri: `http://${Config.graphql}/graphql`,
    credentials: 'include',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://${Config.graphql}/graphql`,
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
