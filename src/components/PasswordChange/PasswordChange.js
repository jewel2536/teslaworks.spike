import React, { Component } from 'react';
import './PasswordChange.css';

import { auth } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <div class="card">
        <div class="card-header">
          Change Password
        </div>
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <input
              class="form-control mx-sm-3"
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="New Password"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control mx-sm-3"
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
          <button disabled={isInvalid} class="btn btn-primary" type="submit">
            Change My Password
          </button>

          { error && <p>{error.message}</p> }

        </form>
      </div>
    );
  }
}

export default PasswordChangeForm;
