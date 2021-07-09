import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {AppProvider} from './context/app-context'
import './index.scss';
ReactDOM.render(
  <AppProvider>
      <Routes/>
  </AppProvider>,
  document.getElementById('root')
);

