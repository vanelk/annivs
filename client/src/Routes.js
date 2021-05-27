import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import App from './pages/App';
import Add from './pages/Add';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Settings from './pages/Settings';
import Error from './components/Error';
import Search from './pages/Search';
function Routes() {
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
    </Router>
  );
}

export default Routes;
