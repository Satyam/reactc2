import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/App';
import store from 'Store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // const ReactRedux = require('react-redux/lib');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
