import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {AppProvider} from './providers/AppProvider'
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <Routes/>
  </AppProvider>,
  document.getElementById('root')
);

