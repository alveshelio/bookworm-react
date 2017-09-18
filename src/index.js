import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/*
 * If we have saved the token in local storage, we are going to retrieve
 * it and dispatch the action to login the user passing the user object (
*/
if (localStorage.bookwormJWT) {
  const user = { token: localStorage.bookwormJWT };
  store.dispatch(userLoggedIn(user));
}

/*
 * Because We have a conflict with component blockers:
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
 * We need to instead of render <App /> component, we render Route with component
 * App, this will pass location as props and then we pass location to the other
  * Routes on App component
*/

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
