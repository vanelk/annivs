import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';
import {AppProvider} from './context/AppProvider'

ReactDOM.render(
  <AppProvider>
    <MyApp/>
  </AppProvider>,
  document.getElementById('root')
);

