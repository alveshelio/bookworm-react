import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props.confirm(this.props.match.params.token)
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {
          loading && <Message icon>
            <Icon name='circle notched' loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        }
        {
          !loading && success && <Message success icon>
            <Icon name='checkmark' />
            <Message.Content>
              <Message.Header>Thank you, your email</Message.Header>
              <Link to='/dashboard'>Back to dashboard</Link>
            </Message.Content>
          </Message>
        }
        {
          !loading && !success && <Message negative icon>
            <Icon name='warning sign' />
            <Message.Header>Oops. Invalid Token</Message.Header>
          </Message>
        }
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  // message: PropTypes.
};

function mapSateToProps(state) {
  return {
    user: state,
    // message: state.user.message,
  };
}

export default connect(mapSateToProps, { confirm })(ConfirmationPage);
