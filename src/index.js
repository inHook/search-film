import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import {Application} from './App';
import {store} from "./store/store";

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
            <Application />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);