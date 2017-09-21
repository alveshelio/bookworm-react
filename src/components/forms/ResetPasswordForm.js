import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';

import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
  state = {
    data: {
      password: '',
      passwordConfirmation: '',
      token: this.props.token
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = 'Can\'t be blank';
    if (data.password !== data.passwordConfirmation) errors.passwordDontMath = 'Passwords don\'t match';
    return errors;
  };

  render() {
    const { password, passwordConfirmation } = this.state.data;
    const { errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errors.global}</p>
        </Message>}
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>New Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Your new password'
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.passwordDontMath}>
          <label htmlFor='password'>Confirm you Password</label>
          <input
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            value={passwordConfirmation}
            placeholder='type it again'
            onChange={this.onChange}
          />
          {errors.passwordDontMath && <InlineError text={errors.passwordDontMath} />}
        </Form.Field>
        <Button primary>Reset Password</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;