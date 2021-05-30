import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {AppProvider} from './context/AppProvider'

ReactDOM.render(
  <AppProvider>
    <Routes/>
  </AppProvider>,
  document.getElementById('root')
);

