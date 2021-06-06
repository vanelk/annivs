import React from 'react';
import propTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { useAppState } from '../../context/AppProvider';
function PrivateRoute({children, ...rest}){
    const {appState} = useAppState();
    return (
        <Route {...rest} render={({ location }) => {
          return appState.token
            ? children
            : <Redirect to={{pathname: '/', state:{ from: location}}} />
        }} />
      )
}

PrivateRoute.prototype = {
  children: propTypes.oneOf([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ])
}
export default PrivateRoute