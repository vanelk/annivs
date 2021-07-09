import { ApolloLink, Observable } from '@apollo/client';
const createRequestLink = (token) => {
  return new ApolloLink((operation, forward) =>
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
}

export default createRequestLink;