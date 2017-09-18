import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h1>HomePage</h1>
    {/* When we click on logout, we dispatch the thunk logout action from the auth action */}
    { isAuthenticated ? <Button onClick={() => logout() }>Logout</Button> :
      (<div><Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link></div>) }
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);