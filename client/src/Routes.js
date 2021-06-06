import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './pages/App';
import Add from './pages/Add';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Login from './pages/Login';
import Loader from './components/Loader/index';
import Error from './components/Error/index';
import PrivateRoute from './components/PrivateRoute/index';
import { useAppState } from './context/AppProvider';
import withApollo from './context/ApolloProvider';
function Routes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setAuthToken } = useAppState();
  useEffect(() => {
    setLoading(true);
    fetch("/refresh_token", { method: 'POST' }).then(res => res.json())
      .then(({ accessToken }) => {
        setAuthToken(accessToken);
        setLoading(false);
      }).catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (loading) return (<Loader />);
  if (error) return (<Error error={error} action="reload" />);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute exact path="/app">
          <App />
        </PrivateRoute>
        <PrivateRoute exact path="/app/add">
          <Add />
        </PrivateRoute>
        <PrivateRoute exact path="/app/settings">
          <Settings />
        </PrivateRoute>
        <PrivateRoute exact path="/app/p/:id">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/app/edit/:id">
          <Edit />
        </PrivateRoute>
        <PrivateRoute path="/app/search">
          <Search />
        </PrivateRoute>
        <Route path="*">
          <Error error="Page not found" action="home" />
        </Route>
      </Switch>
    </Router>)
}

export default withApollo(Routes);