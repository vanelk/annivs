import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
const createTokenLink = (token, setAuthToken) => {
  return new TokenRefreshLink({
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
}

export default createTokenLink;