import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink, ApolloLink } from '@apollo/client';
import { useAppState } from '../../context/app-context';
import createTokenLink from './token-link';
import createRequestLink from './request-link';
const createApolloClient = (initialState = {}, token, setAuthToken) => {
    const cache = new InMemoryCache().restore(initialState);
    const httpLink = createHttpLink({
        uri: "/graphql"
    });
    const tokenLink = createTokenLink(token, setAuthToken);
    const requestLink = createRequestLink(token);
    const client = new ApolloClient({
        link: ApolloLink.from([tokenLink, requestLink, httpLink]),
        cache,
    });
    return client;
};

const withApollo = (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const { appState, setAuthToken } = useAppState();
    const client =
      apolloClient ||
      createApolloClient(
        apolloState,
        appState.token,
        setAuthToken
      );
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  return WithApollo;
};

export default withApollo;