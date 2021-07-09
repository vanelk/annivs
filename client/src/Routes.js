import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './hoc/ProtectedRoute';
import Add from './pages/Add';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Login from './pages/Login';
import Loader from './components/Loader';
import Events from './pages/Events';
import Error from './components/Error';
import { useAppState } from './context/app-context';
import { withApollo } from './lib/graphql';
import { I18nProvider } from './lib/i18n';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import { register } from './services/service-worker'
function Routes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setAuthToken, appState: { locale } } = useAppState();
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
      <I18nProvider locale={locale}>
        <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/app">
          <Home/>
        </Route>
        <ProtectedRoute exact path="/app/events">
          <Events />
        </ProtectedRoute>
        <ProtectedRoute exact path="/app/add">
          <Add />
        </ProtectedRoute>
        <ProtectedRoute exact path="/app/settings">
          <Settings />
        </ProtectedRoute>
        <ProtectedRoute exact path="/app/p/:id">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/app/edit/:id">
          <Edit />
        </ProtectedRoute>
        <ProtectedRoute path="/app/search">
          <Search />
        </ProtectedRoute>
        <Route path="*">
          <Page404 />
        </Route>
        </Switch>
      </I18nProvider>
    </Router>)
}

register();


export default withApollo(Routes);