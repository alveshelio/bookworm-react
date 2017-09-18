import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

/*
* location is provided from ./index.js <Route /> component because instead
* of Rendering component <App />, we are passing it to <Route component={App} />
* in index.js
* */
const App = ({ location }) => (
  <div className='ui container'>
    <Route location={location} exact path='/' component={HomePage} />
    <GuestRoute location={location} path='/login' component={LoginPage} />
    <UserRoute location={location} path='/dashboard' component={DashboardPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;