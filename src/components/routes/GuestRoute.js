import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// We create a Higher Order Component (HOC) to handle private routes
const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={
      props => !isAuthenticated ? <Component {...props} /> : <Redirect to='/dashboard' />
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps)(GuestRoute);

