import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import DashboardPage from './components/pages/DashboardPage';
import NewBookPage from './components/pages/NewBookPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';

/*
* location is provided from ./index.js <Route /> component because instead
* of Rendering component <App />, we are passing it to <Route component={App} />
* in index.js
* */
const App = ({ location, isAuthenticated }) => (
  <div className='ui container'>
    { isAuthenticated && <TopNavigation /> }
    <Route location={location} exact path='/' component={HomePage} />
    <GuestRoute location={location} path='/login' component={LoginPage} />
    <GuestRoute location={location} path='/signup' component={SignupPage} />
    <GuestRoute location={location} path='/forgot_password' component={ForgotPasswordPage} />
    <GuestRoute location={location} path='/reset_password/:token' component={ResetPasswordPage} />
    <UserRoute location={location} path='/dashboard' component={DashboardPage} />
    <UserRoute location={location} path='/confirmation/:token' component={ConfirmationPage} />
    <UserRoute location={location} path='/books/new' component={NewBookPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.email
});

export default connect(mapStateToProps)(App);