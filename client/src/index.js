import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/reset.css';
import './styles/global.css';

import { Provider } from './Context'

ReactDOM.render(
  <React.StrictMode>
    {/* pins provider to the highest point in the project so that the Context (& consumers) can be used in any of the providers children in the App component */}
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
