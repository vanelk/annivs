import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink, ApolloLink, Observable } from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { useAppState } from './AppProvider';
const initApolloClient = (initialState = {}, token, setAuthToken) => {
  const cache = new InMemoryCache().restore(initialState);

  const httpLink = createHttpLink({
    uri: "/graphql"
  });

  const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          // get the authentication token from local storage if it exists
          // return the headers to the context so httpLink can read them
          operation.setContext({
            headers: {
              authorization: token ? `Bearer ${token}` : "",
            }
          });
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      }
    })
  );

  const tokenLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      if (!token) return true;
      try {
        const { exp } = jwtDecode(token);
        return (Date.now() <= exp * 1000)
      } catch {
        return false;
      }
    },
    fetchAccessToken: async () => {
      // Use fetch to access the refreshUserToken mutation
      return await fetch(`/refresh_token`, {
        method: 'POST',
        credentials: "include"
      });
    },
    handleFetch: (accessToken) => {
      // save new authentication token to state
      setAuthToken(accessToken);
    },
    handleError: (error) => {
      console.error('Cannot refresh access token:', error);
    },
  });
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
      initApolloClient(
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