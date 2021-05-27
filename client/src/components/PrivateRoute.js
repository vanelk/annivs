import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useAppState } from '../context/AppProvider';
export default function PrivateRoute({children, ...rest}){
    const {appState} = useAppState();
    return (
        <Route {...rest} render={({ location }) => {
          return appState.token
            ? children
            : <Redirect to={{pathname: '/', state:{ from: location}}} />
        }} />
      )
}